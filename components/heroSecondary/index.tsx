import Image from "next/image";
import styles from "./component.module.css";
import "./animations.css";
import { HeroSecondaryProps } from "./types";

const HeroSecondary = ({
	heading,
	subheading,
	content,
	image,
	name,
}: HeroSecondaryProps) => (
	<section className={styles.component}>
		<div className={styles.wrapper}>
			<div
				className={styles.content}
				style={{
					...(name ? { viewTransitionName: `${name}-content-wrapper` } : {}),
				}}
			>
				<div className={styles.header}>
					<header className={styles.header}>
						<h2
							className={styles.subheading}
							style={{
								...(name
									? { viewTransitionName: `${name}-content-subheading` }
									: {}),
							}}
						>
							{subheading}
						</h2>
						<h1
							className={styles.heading}
							style={{
								...(name
									? { viewTransitionName: `${name}-content-heading` }
									: {}),
							}}
						>
							{heading}
						</h1>
					</header>
				</div>
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
			</div>
			<Image
				src={image.src}
				alt={image.alt}
				fill
				priority
				sizes="(max-width: 1340px) 100vw, 1340px"
				className={styles.background}
				quality="100"
				style={{
					...(name ? { viewTransitionName: `${name}-image-wrapper` } : {}),
				}}
			/>
		</div>
	</section>
);

export default HeroSecondary;
