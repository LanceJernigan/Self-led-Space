import type { GlobalConfig } from "payload";
import { isAdmin } from "../access/isAdmin";
import { adminOnlyNav } from "../access/adminOnlyNav";

export const Footer: GlobalConfig = {
	slug: "footer",
	admin: { group: "Site", hidden: adminOnlyNav },
	access: { read: () => true, update: isAdmin },
	fields: [
		{
			name: "organizationName",
			type: "text",
			defaultValue: "Self-led Space",
			admin: {
				description: "Shown in the footer as “© <current year> <name>”. The year is set automatically.",
			},
		},
	],
};
