import Featurette from "@/components/featurette";
import HeroSecondary from "@/components/heroSecondary";
import styles from "./page.module.css";

const About = () => (
	<div className={styles.spacing}>
		<HeroSecondary />
		<Featurette
			heading="Who We Are"
			content={
				<>
					<p>
						We are a network of therapists who share a simple belief: everyone
						deserves a supportive space to heal, reflect, and grow.
					</p>
					<p>
						Each therapist in our community brings their own expertise and
						personality, yet we’re united by a commitment to genuine care. We
						aim to create a therapeutic environment that feels steady,
						grounding, and human. No judgment. No pressure. Just a space where
						your story matters.
					</p>
				</>
			}
			image={{
				src: "/assets/images/whoWeAre.jpg",
				alt: "Sunlight shining through clouds",
			}}
		/>
	</div>
);

export default About;
