import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Page } from "@/src/payload-types";
import { toImage } from "@/lib/data";
import Hero from "@/components/hero";
import HeroSecondary from "@/components/heroSecondary";
import Featurette from "@/components/featurette";
import CardsFeature from "@/components/cardsFeature";
import Contact from "@/components/contact";
import TeamList from "@/components/teamList";

type LinkGroup = { label?: string | null; href?: string | null } | null | undefined;

const toLink = (link: LinkGroup) =>
	link?.href && link?.label ? { href: link.href, label: link.label } : undefined;

const RenderBlocks = ({ blocks }: { blocks: Page["layout"] }) => (
	<>
		{(blocks ?? []).map((block, i) => {
			const key = block.id ?? i;
			switch (block.blockType) {
				case "hero": {
					const image = toImage(block.backgroundImage);
					if (!image) return null;
					return (
						<Hero
							key={key}
							heading={block.heading}
							intro={block.intro}
							image={image}
							quotes={(block.quotes ?? []).map((q) => ({
								text: q.text,
								author: q.author,
							}))}
						/>
					);
				}
				case "heroSecondary": {
					const image = toImage(block.image);
					if (!image) return null;
					return (
						<HeroSecondary
							key={key}
							heading={block.heading}
							subheading={block.subheading}
							content={<RichText data={block.content} />}
							image={image}
							name={block.name ?? ""}
						/>
					);
				}
				case "featurette": {
					const image = toImage(block.image);
					if (!image) return null;
					return (
						<Featurette
							key={key}
							heading={block.heading}
							subheading={block.subheading ?? undefined}
							content={<RichText data={block.content} />}
							image={image}
							link={toLink(block.link)}
							reverse={block.reverse ?? false}
							name={block.name ?? undefined}
						/>
					);
				}
				case "cardsFeature": {
					const image = toImage(block.image);
					if (!image) return null;
					return (
						<CardsFeature
							key={key}
							heading={block.heading}
							subheading={block.subheading ?? undefined}
							description={
								block.description ? <RichText data={block.description} /> : undefined
							}
							image={image}
							cards={(block.cards ?? []).map((c) => ({
								title: c.title,
								text: c.text,
							}))}
							link={toLink(block.link)}
							name={block.name ?? undefined}
						/>
					);
				}
				case "teamList":
					return <TeamList key={key} startReversed={block.startReversed ?? false} />;
				case "contact":
					return (
						<Contact
							key={key}
							subheading={block.subheading ?? undefined}
							heading={block.heading ?? undefined}
							description={
								block.description ? <RichText data={block.description} /> : undefined
							}
						/>
					);
				default:
					return null;
			}
		})}
	</>
);

export default RenderBlocks;
