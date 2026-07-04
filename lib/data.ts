import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Page, Team } from "@/src/payload-types";

/** One Payload instance per request. */
export const getPayloadClient = cache(async () => getPayload({ config }));

export type ImageRef = { src: string; alt: string };

/** Map a populated Media relationship to the `{ src, alt }` shape components expect. */
export const toImage = (
	m: Media | number | null | undefined,
	fallbackAlt = "",
): ImageRef | null => {
	if (!m || typeof m !== "object" || !m.url) return null;
	return { src: m.url, alt: m.alt ?? fallbackAlt };
};

/** Published team members for the /team listing (photo + title + summary). */
export const getActiveMembers = cache(async (): Promise<Team[]> => {
	const payload = await getPayloadClient();
	const res = await payload.find({
		collection: "team",
		where: { _status: { equals: "published" } },
		sort: "name",
		depth: 1,
		pagination: false,
	});
	return res.docs;
});

/**
 * A single member profile by slug (depth 2 populates inline bio images).
 * When `draft` is true (preview), returns the latest version regardless of status.
 */
export const getMemberBySlug = async (
	slug: string,
	draft = false,
): Promise<Team | null> => {
	const payload = await getPayloadClient();
	const res = await payload.find({
		collection: "team",
		where: draft
			? { slug: { equals: slug } }
			: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
		draft,
		depth: 2,
		limit: 1,
	});
	return res.docs[0] ?? null;
};

/** All published slugs — for generateStaticParams. */
export const getAllMemberSlugs = cache(async (): Promise<string[]> => {
	const payload = await getPayloadClient();
	const res = await payload.find({
		collection: "team",
		where: { _status: { equals: "published" } },
		depth: 0,
		pagination: false,
	});
	return res.docs.map((d) => d.slug);
});

/**
 * A page by slug (depth 2 populates block images).
 * When `draft` is true (preview), returns the latest version regardless of status.
 */
export const getPageBySlug = async (
	slug: string,
	draft = false,
): Promise<Page | null> => {
	const payload = await getPayloadClient();
	const res = await payload.find({
		collection: "pages",
		where: draft
			? { slug: { equals: slug } }
			: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
		draft,
		depth: 2,
		limit: 1,
	});
	return res.docs[0] ?? null;
};

/** All published page slugs — for generateStaticParams. */
export const getAllPageSlugs = cache(async (): Promise<string[]> => {
	const payload = await getPayloadClient();
	const res = await payload.find({
		collection: "pages",
		where: { _status: { equals: "published" } },
		depth: 0,
		pagination: false,
	});
	return res.docs.map((d) => d.slug);
});

export const getHeader = cache(async () => {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "header" });
});

export const getFooter = cache(async () => {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "footer" });
});

export const getSiteSettings = cache(async () => {
	const payload = await getPayloadClient();
	return payload.findGlobal({ slug: "site-settings", depth: 1 });
});
