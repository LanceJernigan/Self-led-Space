import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from "payload";

/** Map a page slug to its public path ("home" -> "/"). */
export const pagePath = (slug: string) => (slug === "home" ? "/" : `/${slug}`);

const revalidate = async (
	path: string,
	logger?: { warn: (m: string) => void },
) => {
	try {
		const { revalidatePath } = await import("next/cache");
		revalidatePath(path);
	} catch {
		logger?.warn(`revalidatePath skipped (no request scope): ${path}`);
	}
};

export const revalidatePageAfterChange: CollectionAfterChangeHook = async ({
	doc,
	previousDoc,
	req,
}) => {
	await revalidate(pagePath(doc.slug), req.payload.logger);
	if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
		await revalidate(pagePath(previousDoc.slug), req.payload.logger);
	}
	return doc;
};

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = async ({
	doc,
	req,
}) => {
	await revalidate(pagePath(doc.slug), req.payload.logger);
	return doc;
};
