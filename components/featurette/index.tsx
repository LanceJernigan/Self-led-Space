import Image from "next/image";
import styles from "./component.module.css";
import Button from "@/components/shared/button";

const Featurette = () => (
	<section className={styles.component}>
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<header className={styles.header}>
					<h3 className={styles.subheading}>About</h3>
					<h2 className={styles.heading}>
						Guided by compassion, grounded in care
					</h2>
				</header>
				<p>
					We believe therapy should feel natural and supportive — a space to
					breathe, reflect, and grow. Our collective of therapists is here to
					walk alongside you, wherever you are in your journey.
				</p>
				<Button />
			</div>
			<div className={styles.image}>
				<Image
					src="/assets/images/about.jpg"
					alt="Calm mountain range"
					fill
					sizes="(min-width: 768px) 500, 100vw"
					quality="100"
				/>
			</div>
		</div>
	</section>
);

export default Featurette;
