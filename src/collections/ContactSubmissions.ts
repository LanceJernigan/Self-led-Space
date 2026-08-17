import type { CollectionConfig } from "payload";
import { isAdmin } from "../access/isAdmin";
import { adminOnlyNav } from "../access/adminOnlyNav";
import { notifyContactSubmission } from "../hooks/notifyContactSubmission";

/**
 * Business contact-form submissions. Anyone can create (public form);
 * only admins can read/manage. Keep fields minimal — a therapy contact form can
 * attract sensitive info, so avoid collecting more than needed.
 */
export const ContactSubmissions: CollectionConfig = {
	slug: "contact-submissions",
	labels: { singular: "Contact Submission", plural: "Contact Submissions" },
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "email", "createdAt"],
		group: "Inbox",
		hidden: adminOnlyNav,
	},
	access: {
		create: () => true,
		read: isAdmin,
		update: isAdmin,
		delete: isAdmin,
	},
	hooks: {
		afterChange: [notifyContactSubmission],
	},
	fields: [
		{
			type: "row",
			fields: [
				{ name: "name", type: "text", required: true, admin: { width: "50%" } },
				{ name: "email", type: "email", required: true, admin: { width: "50%" } },
			],
		},
		{ name: "phone", type: "text" },
		{ name: "message", type: "textarea", required: true },
		{
			name: "member",
			type: "relationship",
			relationTo: "team",
			admin: { description: "Optional: the team member this inquiry is about." },
		},
	],
};
