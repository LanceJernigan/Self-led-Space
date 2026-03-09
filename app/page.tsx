import type { Metadata } from "next";
import Featurette from "@/components/featurette";

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to Self-led Space. We offer compassionate, personalized therapy to help you breathe, reflect, and grow.",
};
import Hero from "@/components/hero";
import CardsFeature from "@/components/cardsFeature";
import Contact from "@/components/contact";
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
}
