import Image from "next/image";
import styles from "./component.module.css";
import Button from "@/components/shared/button";
import { FeaturetteProps } from "./types";

const Featurette = ({
	heading,
	subheading,
	content,
	name,
	image,
	link,
	reverse,
}: FeaturetteProps) => (
	<section className={styles.component}>
		<div
			className={styles.wrapper}
			data-reverse={reverse}
		>
			<div
				className={styles.content}
				style={{
					...(name ? { viewTransitionName: `${name}-content-wrapper` } : {}),
				}}
			>
				<header className={styles.header}>
					{!!subheading && (
						<h3
							className={styles.subheading}
							style={{
								...(name
									? { viewTransitionName: `${name}-content-subheading` }
									: {}),
							}}
						>
							{subheading}
						</h3>
					)}
					<h2
						className={styles.heading}
						style={{
							...(name
								? { viewTransitionName: `${name}-content-heading` }
								: {}),
						}}
					>
						{heading}
					</h2>
				</header>
				<div
					className={styles.description}
					style={{
						...(name
							? { viewTransitionName: `${name}-content-description` }
							: {}),
					}}
				>
					{content}
				</div>
				{!!link?.href && !!link?.label && (
					<Button href={link.href}>{link.label}</Button>
				)}
			</div>
			<div className={styles.image}>
				<Image
					src={image.src}
					alt={image.alt}
					fill
					sizes="(max-width: 768px) 100vw, 500px"
					quality="100"
					preload
					style={{
						...(name ? { viewTransitionName: `${name}-image-wrapper` } : {}),
					}}
				/>
			</div>
		</div>
	</section>
);

export default Featurette;
