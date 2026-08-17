import path from "path";
import { randomBytes } from "crypto";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Team } from "../payload-types";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Seed passwords must never be committed. This repo is public, so a hardcoded
 * password becomes a live credential the moment the CMS is deployed. Set the
 * env var to choose one; otherwise a random password is generated and printed
 * once, so local dev still works without any setup.
 */
const seedPassword = (
	envVar: string,
	label: string,
	logger: { info: (msg: string) => void },
) => {
	const fromEnv = process.env[envVar];
	if (fromEnv) return fromEnv;
	const generated = randomBytes(18).toString("base64url");
	logger.info(`Generated ${label} password (set ${envVar} to choose): ${generated}`);
	return generated;
};
const img = (name: string) =>
	path.resolve(dirname, "../../public/assets/images", name);

// ---- lexical helpers (build the `bio` rich content programmatically) ----
const textNode = (text: string) => ({
	type: "text",
	text,
	detail: 0,
	format: 0,
	mode: "normal",
	style: "",
	version: 1,
});

const paragraph = (text: string) => ({
	type: "paragraph",
	version: 1,
	direction: "ltr" as const,
	format: "" as const,
	indent: 0,
	textFormat: 0,
	children: [textNode(text)],
});

const uploadNode = (mediaId: number | string) => ({
	type: "upload",
	version: 3,
	relationTo: "media",
	value: mediaId,
	fields: null,
	format: "" as const,
});

// Cast to the collection's rich-text type — this is the raw Lexical editor state.
const buildBio = (nodes: unknown[]): NonNullable<Team["bio"]> =>
	({
		root: {
			type: "root",
			version: 1,
			direction: "ltr" as const,
			format: "" as const,
			indent: 0,
			children: nodes,
		},
	}) as unknown as NonNullable<Team["bio"]>;

const seed = async () => {
	const payload = await getPayload({ config });

	// idempotent: skip if already seeded
	const existing = await payload.find({
		collection: "team",
		where: { slug: { equals: "mannie" } },
		limit: 1,
	});
	if (existing.docs.length > 0) {
		payload.logger.info("Seed skipped — 'mannie' already exists.");
		return;
	}

	// 1) admin user
	const admins = await payload.find({
		collection: "users",
		where: { role: { equals: "admin" } },
		limit: 1,
	});
	if (admins.docs.length === 0) {
		await payload.create({
			collection: "users",
			data: {
				email: "admin@selfledspace.com",
				password: seedPassword("SEED_ADMIN_PASSWORD", "admin", payload.logger),
				role: "admin",
			},
		});
		payload.logger.info("Created admin user: admin@selfledspace.com");
	}

	// 2) media uploads
	const media = async (file: string, alt: string) =>
		(
			await payload.create({
				collection: "media",
				data: { alt },
				filePath: img(file),
			})
		).id;

	const banner = await media("Mannie-background.jpg", "Sunset over a calm lake and rolling hills");
	const photo = await media("mannie.jpg", "Mannie (Amanda) D Switzer");
	const office1 = await media("mannieOffice1.jpg", "Warm, plant-filled therapy office with a sofa and seating");
	const office2 = await media("mannieOffice2.jpg", "Bright therapy office with armchairs and a desk by the windows");
	const approachImage = await media("services.jpg", "Sunlit forest");

	// 3) bio: intro paragraph -> gallery images -> body paragraphs (Mannie's original layout)
	const bio = buildBio([
		paragraph(
			"I am honored to practice on the territory of the Tsalagi and Tsahoya people. I am a grateful guest on their territory. In order to create a safe place for healing and growth, authenticity and acknowledgement of what is here now is essential. Whether you are looking to start therapy for the first time or you are trying it again, our time together is centered around your experience and ways you hope to move through the world.",
		),
		uploadNode(office1),
		uploadNode(office2),
		paragraph(
			"Therapy should be client centered. With this in mind, I use a strengths based framework, leaning heavily into Internal Family Systems (Level two trained) and including ACT, mindfulness, and EMDR (level one trained). I hope to empower you with compassionate curiosity for yourself as you work toward your goals.",
		),
		paragraph(
			"Whether you are going through something big or small, all things add up. This can make us feel overloaded and unable to process in our day to day lives. Let's work together to get through this moment and build healthy patterns for managing life's challenges.",
		),
	]);

	// 4) team profile
	const team = await payload.create({
		collection: "team",
		data: {
			slug: "mannie",
			_status: "published",
			name: "Mannie (Amanda) D Switzer",
			title: "Clinical Social Work/Therapist, LCSW",
			summary:
				"Mannie (Amanda) D Switzer, LCSW, offers client-centered therapy grounded in Internal Family Systems, ACT, mindfulness, and EMDR.",
			banner,
			photo,
			bio,
			qualifications: [
				{ label: "Education", content: ["Attended UT Knoxville College of Social Work, MSSW, Graduated 2019"] },
				{ label: "Experience", content: ["6 years in practice"] },
				{ label: "Credentials", content: ["License: MN Board of Social Work", "33375 / 2024"] },
			],
			approachImage,
			approaches: [
				{ title: "Internal Family Systems (IFS)", text: "Internal Family Systems (IFS) is an approach to psychotherapy that identifies and addresses multiple sub-personalities or families within each person's mental system." },
				{ title: "Acceptance and Commitment (ACT)", text: "Acceptance and commitment therapy (ACT) is an action-oriented approach that stems from traditional behavior therapy and cognitive behavioral therapy." },
				{ title: "Attachment-based", text: "Attachment-based therapy is a form of therapy that applies to interventions or approaches based on attachment theory, which explains how the relationship a parent has with its child influences development." },
				{ title: "EMDR", text: "EMDR (Eye Movement Desensitization and Reprocessing) is an information processing therapy that helps clients cope with trauma, addictions, and phobias." },
			],
			specialties: ["Trauma and PTSD", "Relationship Issues", "Substance Use"],
			expertise: [
				"Anxiety", "Bisexual", "Body Image", "Codependency", "Depression",
				"Domestic Violence", "Grief", "Lesbian", "LGBTQ+", "Life Transitions",
				"Obsessive-Compulsive (OCD)", "Open Relationships Non-Monogamy", "Parenting",
				"Self Esteem", "Sexual Abuse", "Stress", "Suicidal Ideation", "Women's Issues",
			],
		},
	});
	payload.logger.info(`Created team profile: ${team.slug}`);

	// 5) member login linked to the profile
	await payload.create({
		collection: "users",
		data: {
			email: "mannie@selfledspace.com",
			password: seedPassword("SEED_MEMBER_PASSWORD", "member", payload.logger),
			role: "member",
			member: team.id,
		},
	});
	payload.logger.info("Created member user: mannie@selfledspace.com → mannie");
	payload.logger.info("Seed complete.");
};

await seed();
