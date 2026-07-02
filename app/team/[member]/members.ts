type ImageRef = {
	src: string;
	alt: string;
};

export type Member = {
	slug: string;
	name: string;
	title: string;
	summary: string;
	banner: ImageRef;
	photo: ImageRef;
	intro: string[];
	gallery: ImageRef[];
	body: string[];
	qualifications: {
		label: string;
		content: string[];
	}[];
	approachImage: ImageRef;
	approaches: {
		title: string;
		text: string;
	}[];
	specialties: string[];
	expertise: string[];
};

export const members: Member[] = [
	{
		slug: "mannie",
		name: "Mannie (Amanda) D Switzer",
		title: "Clinical Social Work/Therapist, LCSW",
		summary:
			"Mannie (Amanda) D Switzer, LCSW, offers client-centered therapy grounded in Internal Family Systems, ACT, mindfulness, and EMDR.",
		banner: {
			src: "/assets/images/Mannie-background.jpg",
			alt: "Sunset over a calm lake and rolling hills",
		},
		photo: {
			src: "/assets/images/mannie.jpg",
			alt: "Mannie (Amanda) D Switzer",
		},
		intro: [
			"I am honored to practice on the territory of the Tsalagi and Tsahoya people. I am a grateful guest on their territory. In order to create a safe place for healing and growth, authenticity and acknowledgement of what is here now is essential. Whether you are looking to start therapy for the first time or you are trying it again, our time together is centered around your experience and ways you hope to move through the world.",
		],
		gallery: [
			{
				src: "/assets/images/mannieOffice1.jpg",
				alt: "Warm, plant-filled therapy office with a sofa and seating",
			},
			{
				src: "/assets/images/mannieOffice2.jpg",
				alt: "Bright therapy office with armchairs and a desk by the windows",
			},
		],
		body: [
			"Therapy should be client centered. With this in mind, I use a strengths based framework, leaning heavily into Internal Family Systems (Level two trained) and including ACT, mindfulness, and EMDR (level one trained). I hope to empower you with compassionate curiosity for yourself as you work toward your goals.",
			"Whether you are going through something big or small, all things add up. This can make us feel overloaded and unable to process in our day to day lives. Let's work together to get through this moment and build healthy patterns for managing life's challenges.",
		],
		qualifications: [
			{
				label: "Education",
				content: ["Attended UT Knoxville College of Social Work, MSSW, Graduated 2019"],
			},
			{
				label: "Experience",
				content: ["6 years in practice"],
			},
			{
				label: "Credentials",
				content: ["License: MN Board of Social Work", "33375 / 2024"],
			},
		],
		approachImage: {
			src: "/assets/images/services.jpg",
			alt: "Sunlit forest",
		},
		approaches: [
			{
				title: "Internal Family Systems (IFS)",
				text: "Internal Family Systems (IFS) is an approach to psychotherapy that identifies and addresses multiple sub-personalities or families within each person's mental system.",
			},
			{
				title: "Acceptance and Commitment (ACT)",
				text: "Acceptance and commitment therapy (ACT) is an action-oriented approach that stems from traditional behavior therapy and cognitive behavioral therapy.",
			},
			{
				title: "Attachment-based",
				text: "Attachment-based therapy is a form of therapy that applies to interventions or approaches based on attachment theory, which explains how the relationship a parent has with its child influences development.",
			},
			{
				title: "EMDR",
				text: "EMDR (Eye Movement Desensitization and Reprocessing) is an information processing therapy that helps clients cope with trauma, addictions, and phobias.",
			},
		],
		specialties: ["Trauma and PTSD", "Relationship Issues", "Substance Use"],
		expertise: [
			"Anxiety",
			"Bisexual",
			"Body Image",
			"Codependency",
			"Depression",
			"Domestic Violence",
			"Grief",
			"Lesbian",
			"LGBTQ+",
			"Life Transitions",
			"Obsessive-Compulsive (OCD)",
			"Open Relationships Non-Monogamy",
			"Parenting",
			"Self Esteem",
			"Sexual Abuse",
			"Stress",
			"Suicidal Ideation",
			"Women's Issues",
		],
	},
];

export const getMember = (slug: string): Member | undefined =>
	members.find((member) => member.slug === slug);
