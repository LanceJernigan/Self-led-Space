import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField } from "../access/isAdmin";
import { canEditProfile } from "../access/canEditProfile";
import { readTeam } from "../access/readTeam";
import { previewUrl } from "../preview";
import {
	revalidateTeamAfterChange,
	revalidateTeamAfterDelete,
} from "../hooks/revalidateTeam";

/**
 * A team member's public profile AND their editable record.
 * Members edit their own; admins may adjust any. The page keeps its fixed section
 * order (hero -> bio -> qualifications -> approaches -> specialties -> expertise);
 * only `bio` is a free-form rich content area (text + inline images).
 */
export const Team: CollectionConfig = {
	slug: "team",
	labels: { singular: "Team Member", plural: "Team Members" },
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "title", "_status"],
		group: "Content",
		preview: (doc) => previewUrl(`/team/${String(doc?.slug ?? "")}`),
	},
	access: {
		read: readTeam,
		create: isAdmin,
		update: canEditProfile,
		delete: isAdmin,
	},
	hooks: {
		afterChange: [revalidateTeamAfterChange],
		afterDelete: [revalidateTeamAfterDelete],
	},
	// Draft/publish: profile edits stay a draft until published (Publish button).
	// The public site shows only published profiles; drafts are previewable.
	versions: {
		drafts: { autosave: false },
		maxPerDoc: 20,
	},
	fields: [
		// ---- sidebar: structural fields, admin-only ----
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			index: true,
			access: { update: isAdminField },
			admin: { position: "sidebar", description: "URL: /team/<slug>" },
		},
		// ---- main content, member-editable ----
		{ name: "name", type: "text", required: true },
		{
			name: "title",
			type: "text",
			required: true,
			admin: { description: 'e.g. "Clinical Social Work/Therapist, LCSW"' },
		},
		{
			name: "summary",
			type: "textarea",
			required: true,
			admin: { description: "Short overview shown on the /team listing card." },
		},
		{
			type: "row",
			fields: [
				{
					name: "banner",
					type: "upload",
					relationTo: "media",
					required: true,
					admin: { width: "50%", description: "Wide background at the top of the profile." },
				},
				{
					name: "photo",
					type: "upload",
					relationTo: "media",
					required: true,
					admin: { width: "50%", description: "Portrait photo." },
				},
			],
		},
		{
			name: "bio",
			type: "richText",
			required: true,
			admin: {
				description:
					"Your story — write freely and insert images wherever you like.",
			},
		},
		{
			name: "qualifications",
			type: "array",
			labels: { singular: "Qualification", plural: "Qualifications" },
			fields: [
				{ name: "label", type: "text", required: true, admin: { description: "e.g. Education, Experience, Credentials" } },
				{ name: "content", type: "text", hasMany: true, required: true, admin: { description: "One or more lines." } },
			],
		},
		{
			name: "approachImage",
			type: "upload",
			relationTo: "media",
			admin: { description: "Background image for the Treatment Approaches section." },
		},
		{
			name: "approaches",
			type: "array",
			labels: { singular: "Approach", plural: "Treatment Approaches" },
			fields: [
				{ name: "title", type: "text", required: true },
				{ name: "text", type: "textarea", required: true },
			],
		},
		{
			name: "specialties",
			type: "text",
			hasMany: true,
			admin: { description: "Free-form tags, e.g. Trauma and PTSD." },
		},
		{
			name: "expertise",
			type: "text",
			hasMany: true,
			admin: { description: "Free-form tags, e.g. Anxiety, Depression." },
		},
	],
};
