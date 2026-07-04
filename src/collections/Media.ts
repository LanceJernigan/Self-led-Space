import path from "path";
import type { CollectionConfig } from "payload";

/** Owner-or-admin write access; public read. Members manage their own media. */
export const Media: CollectionConfig = {
	slug: "media",
	admin: { group: "Content" },
	access: {
		read: () => true,
		create: ({ req: { user } }) => Boolean(user),
		update: ({ req: { user } }) => {
			if (!user) return false;
			if (user.role === "admin") return true;
			return { createdBy: { equals: user.id } };
		},
		delete: ({ req: { user } }) => {
			if (!user) return false;
			if (user.role === "admin") return true;
			return { createdBy: { equals: user.id } };
		},
	},
	upload: {
		// Ignored when the R2/S3 storage plugin is active (see payload.config.ts).
		staticDir: path.resolve(process.cwd(), "media"),
		mimeTypes: ["image/*"],
		imageSizes: [
			{ name: "thumbnail", width: 400 },
			{ name: "card", width: 768 },
			{ name: "hero", width: 1920 },
		],
	},
	fields: [
		{ name: "alt", type: "text", required: true },
		{
			name: "createdBy",
			type: "relationship",
			relationTo: "users",
			admin: { hidden: true },
			access: { update: () => false },
			hooks: {
				beforeChange: [({ req, value }) => value ?? req.user?.id],
			},
		},
	],
};
