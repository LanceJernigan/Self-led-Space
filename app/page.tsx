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
			<Featurette
				name="ourTeam"
				subheading="Our Team"
				heading="Here to Support Your Growth"
				content={
					<p>
						Our team of dedicated therapists brings warmth, experience, and
						genuine care to every session. Each therapist offers a unique
						approach, but we’re united by a shared belief — that healing happens
						through connection, empathy, and understanding.
					</p>
				}
				image={{
					src: "/assets/images/ourTeam.jpg",
					alt: "Calm mountain range",
				}}
				link={{
					label: "Meet Our Team",
					href: "/team",
				}}
				reverse
			/>
		</div>
	);
}
