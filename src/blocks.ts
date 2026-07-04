import type { Block, Field } from "payload";

// Optional call-to-action link used by Featurette / CardsFeature.
const linkGroup: Field = {
	name: "link",
	type: "group",
	admin: { description: "Optional button. Leave blank for no button." },
	fields: [
		{
			type: "row",
			fields: [
				{ name: "label", type: "text", admin: { width: "50%" } },
				{ name: "href", type: "text", admin: { width: "50%", placeholder: "/about" } },
			],
		},
	],
};

// A view-transition key so shared elements animate between pages (e.g. "about").
const nameField: Field = {
	name: "name",
	type: "text",
	admin: {
		position: "sidebar",
		description: "Optional view-transition key (e.g. about, services, ourTeam).",
	},
};

export const HeroBlock: Block = {
	slug: "hero",
	interfaceName: "HeroBlock",
	labels: { singular: "Hero (home)", plural: "Hero (home)" },
	fields: [
		{ name: "heading", type: "text", required: true },
		{ name: "intro", type: "textarea", required: true },
		{ name: "backgroundImage", type: "upload", relationTo: "media", required: true },
		{
			name: "quotes",
			type: "array",
			labels: { singular: "Quote", plural: "Rotating quotes" },
			fields: [
				{ name: "text", type: "textarea", required: true },
				{ name: "author", type: "text", required: true },
			],
		},
	],
};

export const HeroSecondaryBlock: Block = {
	slug: "heroSecondary",
	interfaceName: "HeroSecondaryBlock",
	labels: { singular: "Hero (secondary)", plural: "Hero (secondary)" },
	fields: [
		{ name: "subheading", type: "text", required: true },
		{ name: "heading", type: "text", required: true },
		{ name: "content", type: "richText", required: true },
		{ name: "image", type: "upload", relationTo: "media", required: true },
		nameField,
	],
};

export const FeaturetteBlock: Block = {
	slug: "featurette",
	interfaceName: "FeaturetteBlock",
	labels: { singular: "Featurette", plural: "Featurettes" },
	fields: [
		{ name: "subheading", type: "text" },
		{ name: "heading", type: "text", required: true },
		{ name: "content", type: "richText", required: true },
		{ name: "image", type: "upload", relationTo: "media", required: true },
		{ name: "reverse", type: "checkbox", admin: { description: "Flip image to the right." } },
		linkGroup,
		nameField,
	],
};

export const CardsFeatureBlock: Block = {
	slug: "cardsFeature",
	interfaceName: "CardsFeatureBlock",
	labels: { singular: "Cards Feature", plural: "Cards Features" },
	fields: [
		{ name: "subheading", type: "text" },
		{ name: "heading", type: "text", required: true },
		{ name: "description", type: "richText" },
		{ name: "image", type: "upload", relationTo: "media", required: true },
		{
			name: "cards",
			type: "array",
			minRows: 1,
			fields: [
				{ name: "title", type: "text", required: true },
				{ name: "text", type: "textarea", required: true },
			],
		},
		linkGroup,
		nameField,
	],
};

export const TeamListBlock: Block = {
	slug: "teamList",
	interfaceName: "TeamListBlock",
	labels: { singular: "Team List", plural: "Team Lists" },
	admin: { disableBlockName: true },
	fields: [
		{
			name: "startReversed",
			type: "checkbox",
			admin: {
				description:
					"Renders every active member (image/title/summary from their profile). Check to flip the first card's image to the right.",
			},
		},
	],
};

export const ContactBlock: Block = {
	slug: "contact",
	interfaceName: "ContactBlock",
	labels: { singular: "Contact", plural: "Contact" },
	fields: [
		{ name: "subheading", type: "text", defaultValue: "Contact" },
		{ name: "heading", type: "text", defaultValue: "Start the Conversation" },
		{ name: "description", type: "richText" },
	],
};

export const pageBlocks = [
	HeroBlock,
	HeroSecondaryBlock,
	FeaturetteBlock,
	CardsFeatureBlock,
	TeamListBlock,
	ContactBlock,
];
