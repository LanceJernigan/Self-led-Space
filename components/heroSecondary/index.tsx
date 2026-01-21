import Image from "next/image";
import styles from "./component.module.css";
import "./animations.css";

const HeroSecondary = () => (
	<section className={styles.component}>
		<div className={styles.wrapper}>
			<div
				className={styles.content}
				style={{ viewTransitionName: "about-content-wrapper" }}
			>
				<div className={styles.header}>
					<header className={styles.header}>
						<h2
							className={styles.subheading}
							style={{ viewTransitionName: "about-content-subheading" }}
						>
							About
						</h2>
						<h1
							className={styles.heading}
							style={{ viewTransitionName: "about-content-heading" }}
						>
							Guided by compassion, <br />
							grounded in care
						</h1>
					</header>
				</div>
				<p style={{ viewTransitionName: "about-content-description" }}>
					We believe therapy should feel natural and supportive — a space to
					breathe, reflect, and grow. Our collective of therapists is here to
					walk alongside you, wherever you are in your journey.
				</p>
			</div>
			<Image
				src="/assets/images/about.jpg"
				alt="Calm mountain range"
				fill
				priority
				sizes="(min-width: 1340px) 1340px, 100vw"
				className={styles.background}
				quality="100"
				style={{
					viewTransitionName: "about-image-wrapper",
				}}
			/>
		</div>
	</section>
);

export default HeroSecondary;
