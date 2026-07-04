import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@payload-config";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const img = (name: string) =>
	path.resolve(dirname, "../../public/assets/images", name);

// ---- lexical rich-text helper ----
const paragraph = (text: string) => ({
	type: "paragraph",
	version: 1,
	direction: "ltr" as const,
	format: "" as const,
	indent: 0,
	textFormat: 0,
	children: [
		{ type: "text", text, detail: 0, format: 0, mode: "normal", style: "", version: 1 },
	],
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rt = (...paras: string[]): any => ({
	root: {
		type: "root",
		version: 1,
		direction: "ltr" as const,
		format: "" as const,
		indent: 0,
		children: paras.map(paragraph),
	},
});

const seedPages = async () => {
	const payload = await getPayload({ config });

	const existing = await payload.find({
		collection: "pages",
		where: { slug: { equals: "home" } },
		limit: 1,
	});
	if (existing.docs.length > 0) {
		payload.logger.info("Pages seed skipped — 'home' already exists.");
		return;
	}

	// upload each unique image once, reuse across blocks
	const media = async (file: string, alt: string) =>
		(await payload.create({ collection: "media", data: { alt }, filePath: img(file) })).id;

	const heroImg = await media("homepage-hero.jpg", "Calm mountain range");
	const aboutImg = await media("about.jpg", "Calm mountain range");
	const servicesImg = await media("services.jpg", "Forest background");
	const ourTeamImg = await media("ourTeam.jpg", "Calm mountain range");
	const whoWeAreImg = await media("whoWeAre.jpg", "Sunlight shining through clouds");
	const missionImg = await media("mission.jpg", "Sunlight shining through clouds");

	// ---- reusable blocks ----
	const approachCards = [
		{ title: "Internal Family Systems (IFS)", text: "An evidence-based therapy that helps you understand and heal the different parts of you, fostering self-compassion and inner balance." },
		{ title: "Acceptance and Commitment (ACT)", text: "Helps you accept what is out of your personal control, and commit to action that improves and enriches your life." },
		{ title: "Attachment-based", text: "Focuses on the deep bonds formed in early relationships, helping you understand how they impact current patterns for healthier connections." },
	];

	const servicesCardsBlock = {
		blockType: "cardsFeature" as const,
		name: "services",
		subheading: "Approach",
		heading: "Our Approach to Care",
		description: rt("We offer therapy that meets you where you are — whether you're navigating anxiety, relationship challenges, or simply seeking a deeper sense of calm and connection."),
		image: servicesImg,
		cards: approachCards,
		link: { label: "Learn More", href: "/services" },
	};

	const ourTeamFeaturette = {
		blockType: "featurette" as const,
		name: "ourTeam",
		subheading: "Our Team",
		heading: "Here to Support Your Growth",
		content: rt("Our team of dedicated therapists brings warmth, experience, and genuine care to every session. Each therapist offers a unique approach, but we’re united by a shared belief — that healing happens through connection, empathy, and understanding."),
		image: ourTeamImg,
		link: { label: "Meet Our Team", href: "/team" },
		reverse: true,
	};

	const aboutFeaturette = {
		blockType: "featurette" as const,
		name: "about",
		subheading: "About",
		heading: "Guided by compassion, grounded in care",
		content: rt("We believe therapy should feel natural and supportive — a space to breathe, reflect, and grow. Our collective of therapists is here to walk alongside you, wherever you are in your journey."),
		image: aboutImg,
		link: { label: "Read More", href: "/about" },
		reverse: true,
	};

	const contactBlock = {
		blockType: "contact" as const,
		subheading: "Contact",
		heading: "Start the Conversation",
	};

	const pages = [
		{
			title: "Home",
			slug: "home",
			_status: "published",
			seo: {
				metaTitle: "Home",
				metaDescription: "Welcome to Self-led Space. We offer compassionate, personalized therapy to help you breathe, reflect, and grow.",
			},
			layout: [
				{
					blockType: "hero" as const,
					heading: "Grow at your own pace.",
					intro: "A safe, nurturing space for healing and self-discovery. Together, we’ll create the balance and peace you’ve been seeking.",
					backgroundImage: heroImg,
					quotes: [
						{ text: "One who conquers the sea today is ready to conquer the ocean tomorrow.", author: "Matshona Dhliwayo" },
						{ text: "Small steps taken with intention can carry us to places we once thought unreachable.", author: "Brené Brown" },
						{ text: "Out of difficulties grow miracles of courage, clarity, and compassion.", author: "Anaïs Nin" },
					],
				},
				aboutFeaturette,
				servicesCardsBlock,
				ourTeamFeaturette,
				contactBlock,
			],
		},
		{
			title: "About Us",
			slug: "about",
			_status: "published",
			seo: {
				metaTitle: "About Us",
				metaDescription: "Learn about our network of therapists who share a simple belief: everyone deserves a supportive space to heal, reflect, and grow. Discover our mission and approach.",
			},
			layout: [
				{
					blockType: "heroSecondary" as const,
					subheading: "About",
					heading: "Guided by compassion, grounded in care",
					content: rt("We believe therapy should feel natural and supportive — a space to breathe, reflect, and grow. Our collective of therapists is here to walk alongside you, wherever you are in your journey."),
					image: aboutImg,
					name: "about",
				},
				{
					blockType: "featurette" as const,
					heading: "Who We Are",
					content: rt(
						"We are a network of therapists who share a simple belief: everyone deserves a supportive space to heal, reflect, and grow.",
						"Each therapist in our community brings their own expertise and personality, yet we’re united by a commitment to genuine care. We aim to create a therapeutic environment that feels steady, grounding, and human. No judgment. No pressure. Just a space where your story matters.",
					),
					image: whoWeAreImg,
				},
				{
					blockType: "featurette" as const,
					heading: "Our Mission",
					content: rt(
						"Our mission is to make compassionate, high-quality mental health care accessible, approachable, and deeply personalized.",
						"We help individuals and families build resilience, gain clarity, and move toward lives that feel more connected and meaningful.",
					),
					image: missionImg,
					reverse: true,
				},
				servicesCardsBlock,
				ourTeamFeaturette,
				contactBlock,
			],
		},
		{
			title: "Our Services",
			slug: "services",
			_status: "published",
			seo: {
				metaTitle: "Our Services",
				metaDescription: "Explore our range of therapeutic services designed to support individuals, couples, and families through every stage of life.",
			},
			layout: [
				{
					blockType: "heroSecondary" as const,
					subheading: "Services",
					heading: "Our Approach to Care",
					content: rt("We offer therapy that meets you where you are — whether you're navigating anxiety, relationship challenges, or simply seeking a deeper sense of calm and connection."),
					image: servicesImg,
					name: "services",
				},
				{
					blockType: "featurette" as const,
					heading: "What We Offer",
					content: rt("Our network provides a range of therapeutic services designed to support individuals, couples, and families through every stage of life. Each therapist brings unique training and specialties, yet we all share one goal: helping you feel supported and understood."),
					image: whoWeAreImg,
				},
				{
					blockType: "cardsFeature" as const,
					heading: "Treatment Approaches",
					description: rt("We use evidence-based methods and warm, collaborative guidance to help you reach your goals."),
					image: servicesImg,
					cards: approachCards,
				},
				ourTeamFeaturette,
				contactBlock,
			],
		},
		{
			title: "Our Team",
			slug: "team",
			_status: "published",
			seo: {
				metaTitle: "Our Team",
				metaDescription: "Meet our dedicated team of therapists who bring warmth, experience, and genuine care to every session. Learn more about our specialized clinicians.",
			},
			layout: [
				{
					blockType: "heroSecondary" as const,
					subheading: "Our Team",
					heading: "Here to Support Your Growth",
					content: rt(
						"Our team of dedicated therapists brings warmth, experience, and genuine care to every session.",
						"Each therapist offers a unique approach, but we’re united by a shared belief — that healing happens through connection, empathy, and understanding.",
					),
					image: ourTeamImg,
					name: "ourTeam",
				},
				{ blockType: "teamList" as const, startReversed: false },
				servicesCardsBlock,
				aboutFeaturette,
				contactBlock,
			],
		},
		{
			title: "Contact Us",
			slug: "contact",
			_status: "published",
			seo: {
				metaTitle: "Contact Us",
				metaDescription: "Get in touch with us to schedule a session. We're here to help you find the support you need on your healing journey.",
			},
			layout: [contactBlock, servicesCardsBlock, ourTeamFeaturette],
		},
	];

	for (const page of pages) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await payload.create({ collection: "pages", data: page as any });
		payload.logger.info(`Created page: ${page.slug}`);
	}

	// globals
	await payload.updateGlobal({
		slug: "header",
		data: {
			links: [
				{ label: "Home", href: "/" },
				{ label: "About", href: "/about" },
				{ label: "Services", href: "/services" },
				{ label: "Our Team", href: "/team" },
				{ label: "Contact", href: "/contact" },
			],
		},
	});
	await payload.updateGlobal({ slug: "footer", data: { organizationName: "Self-led Space" } });
	payload.logger.info("Pages + globals seed complete.");
};

await seedPages();
