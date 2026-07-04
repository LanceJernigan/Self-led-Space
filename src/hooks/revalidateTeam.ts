import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath } from "next/cache";
import type { Team } from "../payload-types";

/**
 * On-demand ISR: when a profile is saved, invalidate ONLY the affected paths —
 * the member's own page and the /team listing. The next request regenerates that
 * page once, then it is cached again. Guarded so it no-ops outside a request
 * scope (e.g. the seed script / CLI).
 */
const revalidate = (paths: string[], logger?: { warn: (m: string) => void }) => {
	for (const path of paths) {
		try {
			revalidatePath(path);
		} catch {
			logger?.warn(`revalidatePath skipped (no request scope): ${path}`);
		}
	}
};

export const revalidateTeamAfterChange: CollectionAfterChangeHook<Team> = ({
	doc,
	previousDoc,
	req,
}) => {
	const paths = [`/team/${doc.slug}`, "/team"];
	// If the slug changed, also clear the old URL.
	if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
		paths.push(`/team/${previousDoc.slug}`);
	}
	revalidate(paths, req.payload.logger);
	return doc;
};

export const revalidateTeamAfterDelete: CollectionAfterDeleteHook<Team> = ({
	doc,
	req,
}) => {
	revalidate([`/team/${doc.slug}`, "/team"], req.payload.logger);
	return doc;
};
