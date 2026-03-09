import Image from "next/image";
import Button from "@/components/shared/button";
import styles from "./component.module.css";

const Approach = () => {
	return (
		<section className={styles.component}>
			<header className={styles.header}>
				<div className={styles.headings}>
					<h3 className={styles.subheading}>Services</h3>
					<h2 className={styles.heading}>Our Approach to Care</h2>
				</div>
				<p className={styles.description}>
					We offer therapy that meets you where you are — whether you&apos;re
					navigating anxiety, relationship challenges, or simply seeking a deeper
					sense of calm and connection.
				</p>
			</header>

			<div className={styles.wrapper}>
				<Image
					src="/assets/images/services.jpg"
					alt="Forest background"
					fill
					sizes="100vw"
					quality={100}
					className={styles.background}
				/>
				<div className={styles.cards}>
					<div className={styles.card}>
						<h4 className={styles.cardTitle}>Internal Family Systems (IFS)</h4>
						<p className={styles.cardText}>
							An evidence-based therapy that helps you understand and heal the
							different parts of you, fostering self-compassion and inner
							balance.
						</p>
					</div>
					<div className={styles.card}>
						<h4 className={styles.cardTitle}>Acceptance and Commitment (ACT)</h4>
						<p className={styles.cardText}>
							Helps you accept what is out of your personal control, and commit
							to action that improves and enriches your life.
						</p>
					</div>
					<div className={styles.card}>
						<h4 className={styles.cardTitle}>Attachment-based</h4>
						<p className={styles.cardText}>
							Focuses on the deep bonds formed in early relationships, helping
							you understand how they impact current patterns for healthier
							connections.
						</p>
					</div>
				</div>
				<div className={styles.buttonWrapper}>
					<Button href="/services" variant="light">Learn More</Button>
				</div>
			</div>
		</section>
	);
};

export default Approach;
