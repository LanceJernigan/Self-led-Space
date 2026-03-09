import type { Metadata } from "next";
import Featurette from "@/components/featurette";

export const metadata: Metadata = {
	title: "Contact Us",
	description: "Get in touch with us to schedule a session. We're here to help you find the support you need on your healing journey.",
};
import styles from "./page.module.css";
import CardsFeature from "@/components/cardsFeature";
import Contact from "@/components/contact";

const Team = () => (
	<div className={styles.spacing}>
		<Contact />
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
	</div>
);

export default Team;
