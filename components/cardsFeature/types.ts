import { ReactNode } from "react";

export type CardItem = {
	title: string;
	text: string;
};

export type CardsFeatureProps = {
    heading: string;
    subheading?: string;
    description?: ReactNode;
    name?: string;
    image: {
        src: string;
        alt: string;
    };
    cards: CardItem[];
    link?: {
        label: string;
        href: string;
    };
};
