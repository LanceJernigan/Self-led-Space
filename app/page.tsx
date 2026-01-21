import Featurette from "@/components/featurette";
import Hero from "@/components/hero";
import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.spacing}>
			<Hero />
			<Featurette
				name="about"
				subheading="About"
				heading="Guided by compassion, grounded in care"
				content={
					<p>
						We believe therapy should feel natural and supportive — a space to
						breathe, reflect, and grow. Our collective of therapists is here to
						walk alongside you, wherever you are in your journey.
					</p>
				}
				image={{
					src: "/assets/images/about.jpg",
					alt: "Calm mountain range",
				}}
				link={{
					label: "Read More",
					href: "/about",
				}}
			/>
		</div>
	);
}
