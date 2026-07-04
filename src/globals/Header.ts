import type { GlobalConfig } from "payload";
import { isAdmin } from "../access/isAdmin";
import { adminOnlyNav } from "../access/adminOnlyNav";

export const Header: GlobalConfig = {
	slug: "header",
	admin: { group: "Site", hidden: adminOnlyNav },
	access: { read: () => true, update: isAdmin },
	fields: [
		{
			name: "links",
			type: "array",
			labels: { singular: "Nav Link", plural: "Nav Links" },
			fields: [
				{
					type: "row",
					fields: [
						{ name: "label", type: "text", required: true, admin: { width: "50%" } },
						{ name: "href", type: "text", required: true, admin: { width: "50%" } },
					],
				},
			],
		},
	],
};
