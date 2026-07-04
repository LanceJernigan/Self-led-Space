import type { CollectionConfig } from "payload";
import { isAdmin } from "../access/isAdmin";
import { adminOnlyNav } from "../access/adminOnlyNav";
import { pageBlocks } from "../blocks";
import { previewUrl } from "../preview";
import {
	revalidatePageAfterChange,
	revalidatePageAfterDelete,
	pagePath,
} from "../hooks/revalidatePage";

/** Flexible marketing pages built from blocks. Admin-managed. */
export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "_status"],
		group: "Content",
		hidden: adminOnlyNav,
		preview: (doc) => previewUrl(pagePath(String(doc?.slug ?? ""))),
	},
	versions: {
		drafts: { autosave: false },
		maxPerDoc: 20,
	},
	access: {
		read: ({ req: { user } }) => {
			if (user) return true;
			return { _status: { equals: "published" } };
		},
		create: isAdmin,
		update: isAdmin,
		delete: isAdmin,
	},
	hooks: {
		afterChange: [revalidatePageAfterChange],
		afterDelete: [revalidatePageAfterDelete],
	},
	fields: [
		{ name: "title", type: "text", required: true },
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			index: true,
			admin: {
				position: "sidebar",
				description: 'URL path. Use "home" for the homepage (/).',
			},
		},
		{
			name: "layout",
			type: "blocks",
			required: true,
			blocks: pageBlocks,
		},
		{
			name: "seo",
			type: "group",
			admin: { position: "sidebar" },
			fields: [
				{ name: "metaTitle", type: "text" },
				{ name: "metaDescription", type: "textarea" },
			],
		},
	],
};
