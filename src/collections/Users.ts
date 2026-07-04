import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField } from "../access/isAdmin";
import { adminOnlyNav } from "../access/adminOnlyNav";

/**
 * Single auth collection for everyone who logs in.
 * - `admin` role: full access to the CMS.
 * - `member` role: edits only their own linked team profile (`member` relationship).
 */
export const Users: CollectionConfig = {
	slug: "users",
	auth: true,
	admin: {
		useAsTitle: "email",
		defaultColumns: ["email", "role"],
		group: "Admin",
		hidden: adminOnlyNav,
	},
	access: {
		// Any authenticated user may open the admin panel (members get a scoped view).
		admin: ({ req: { user } }) => Boolean(user),
		create: isAdmin,
		delete: isAdmin,
		// Admins read all users; everyone else reads only their own record.
		read: ({ req: { user } }) => {
			if (!user) return false;
			if (user.role === "admin") return true;
			return { id: { equals: user.id } };
		},
		// Admins update anyone; members may update their own record (but not role/member).
		update: ({ req: { user } }) => {
			if (!user) return false;
			if (user.role === "admin") return true;
			return { id: { equals: user.id } };
		},
	},
	fields: [
		{
			name: "role",
			type: "select",
			required: true,
			defaultValue: "member",
			options: [
				{ label: "Admin", value: "admin" },
				{ label: "Member", value: "member" },
			],
			access: { update: isAdminField },
			admin: { description: "Admins manage everything; members edit their own profile." },
		},
		{
			name: "member",
			type: "relationship",
			relationTo: "team",
			access: { update: isAdminField },
			admin: {
				condition: (data) => data?.role === "member",
				description: "The team profile this member owns. Required for the member role.",
			},
		},
	],
};
