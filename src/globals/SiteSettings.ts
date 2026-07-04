import type { GlobalConfig } from "payload";
import { isAdmin } from "../access/isAdmin";
import { adminOnlyNav } from "../access/adminOnlyNav";

export const SiteSettings: GlobalConfig = {
	slug: "site-settings",
	label: "Site Settings",
	admin: { group: "Site", hidden: adminOnlyNav },
	access: { read: () => true, update: isAdmin },
	fields: [
		{ name: "siteName", type: "text", required: true, defaultValue: "Self-led Space" },
		{ name: "logo", type: "upload", relationTo: "media" },
		{
			type: "row",
			fields: [
				{ name: "email", type: "email", admin: { width: "50%" } },
				{ name: "phone", type: "text", admin: { width: "50%" } },
			],
		},
		{
			name: "socials",
			type: "array",
			fields: [
				{
					type: "row",
					fields: [
						{ name: "platform", type: "text", admin: { width: "50%" } },
						{ name: "url", type: "text", admin: { width: "50%" } },
					],
				},
			],
		},
	],
};
