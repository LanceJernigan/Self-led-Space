import type { Metadata } from "next";
import Featurette from "@/components/featurette";

export const metadata: Metadata = {
	title: "About Us",
	description: "Learn about our network of therapists who share a simple belief: everyone deserves a supportive space to heal, reflect, and grow. Discover our mission and approach.",
};
import HeroSecondary from "@/components/heroSecondary";
import styles from "./page.module.css";
import Contact from "@/components/contact";
import CardsFeature from "@/components/cardsFeature";

const About = () => (
	<div className={styles.spacing}>
		<HeroSecondary
			heading="Guided by compassion, grounded in care"
			subheading="About"
			content={
				<p>
					We believe therapy should feel natural and supportive — a space to
					breathe, reflect, and grow. Our collective of therapists is here to
					walk alongside you, wherever you are in your journey.
				</p>
			}
			image={{
				src: "/assets/images/about.jpg",
				alt: "Calming mountain range under stary sky.",
			}}
			name="about"
		/>
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
		<Featurette
			heading="Our Mission"
			content={
				<>
					<p>
						Our mission is to make compassionate, high-quality mental health
						care accessible, approachable, and deeply personalized.
					</p>
					<p>
						We help individuals and families build resilience, gain clarity, and
						move toward lives that feel more connected and meaningful.
					</p>
				</>
			}
			image={{
				src: "/assets/images/mission.jpg",
				alt: "Sunlight shining through clouds",
			}}
			reverse
		/>
		<CardsFeature
			name="services"
			heading="Our Approach to Care"
			subheading="Approach"
			description={
				<p>
					We offer therapy that meets you where you are — whether you&apos;re
					navigating anxiety, relationship challenges, or simply seeking a deeper
					sense of calm and connection.
				</p>
			}
			image={{
				src: "/assets/images/services.jpg",
				alt: "Forest background",
			}}
			cards={[
				{
					title: "Internal Family Systems (IFS)",
					text: "An evidence-based therapy that helps you understand and heal the different parts of you, fostering self-compassion and inner balance.",
				},
				{
					title: "Acceptance and Commitment (ACT)",
					text: "Helps you accept what is out of your personal control, and commit to action that improves and enriches your life.",
				},
				{
					title: "Attachment-based",
					text: "Focuses on the deep bonds formed in early relationships, helping you understand how they impact current patterns for healthier connections.",
				},
			]}
			link={{ label: "Learn More", href: "/services" }}
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
		<Contact />
	</div>
);

export default About;
