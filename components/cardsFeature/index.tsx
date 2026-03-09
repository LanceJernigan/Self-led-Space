import Image from "next/image";
import Button from "@/components/shared/button";
import styles from "./component.module.css";
import { CardsFeatureProps } from "./types";

const CardsFeature = ({ 
	heading,
	subheading,
	description,
	image,
	cards,
	link,
	name 
}: CardsFeatureProps) => {
	return (
		<section className={styles.component}>
			<header className={styles.header}
				style={{
					...(name ? { viewTransitionName: `${name}-content-wrapper` } : {}),
				}}
			>
				<div
					className={styles.headings}
				>
					{!!subheading && (
						<h3
							className={styles.subheading}
							style={{
								...(name ? { viewTransitionName: `${name}-content-subheading` } : {}),
							}}
						>
							{subheading}
						</h3>
					)}
					<h2
						className={styles.heading}
						style={{
							...(name ? { viewTransitionName: `${name}-content-heading` } : {}),
						}}
					>
						{heading}
					</h2>
				</div>
				{!!description && (
					<div
						className={styles.description}
						style={{
							...(name ? { viewTransitionName: `${name}-content-description` } : {}),
						}}
					>
						{description}
					</div>
				)}
			</header>

			<div
				className={styles.wrapper}
			>
				<Image
					src={image.src}
					alt={image.alt}
					fill
					sizes="100vw"
					quality={100}
					className={styles.background}
					style={{
						...(name ? { viewTransitionName: `${name}-image-wrapper` } : {}),
					}}
				/>
				<div
					className={styles.cards}
					data-large={cards.length > 3}
				>
					{cards.map((card, index) => (
						<div key={index} className={styles.card}>
							<h4 className={styles.cardTitle}>{card.title}</h4>
							<p className={styles.cardText}>{card.text}</p>
						</div>
					))}
				</div>
				{!!link?.href && !!link?.label && (
					<div className={styles.buttonWrapper}>
						<Button href={link.href} variant="light">{link.label}</Button>
					</div>
				)}
			</div>
		</section>
	);
};

export default CardsFeature;
