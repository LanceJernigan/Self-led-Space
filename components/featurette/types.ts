export type FeaturetteProps = {
	heading: string;
	subheading?: string;
	content: React.ReactNode;
	name?: string;
	image: {
		src: string;
		alt: string;
	};
	link?: {
		label: string;
		href: string;
	};
};
