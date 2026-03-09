import type { Metadata } from "next";
import Featurette from "@/components/featurette";

export const metadata: Metadata = {
	title: "Our Team",
	description: "Meet our dedicated team of therapists who bring warmth, experience, and genuine care to every session. Learn more about our specialized clinicians.",
};
import HeroSecondary from "@/components/heroSecondary";
import styles from "./page.module.css";
import CardsFeature from "@/components/cardsFeature";
import Contact from "@/components/contact";

const Team = () => (
	<div className={styles.spacing}>
		<HeroSecondary
			heading="Here to Support Your Growth"
			subheading="Our Team"
			content={
				<>
					<p>
						Our team of dedicated therapists brings warmth, experience, and
						genuine care to every session.
					</p>
					<p>
						Each therapist offers a unique approach, but we’re united by a
						shared belief — that healing happens through connection, empathy,
						and understanding.
					</p>
				</>
			}
			image={{
				src: "/assets/images/ourTeam.jpg",
				alt: "Calming Stepped Mountain",
			}}
			name="ourTeam"
		/>
		<Featurette
			subheading="Clinical Social Work/Therapist, LCSW"
			heading="Mannie (Amanda) D Switzer"
			content={
				<p>
					I specialize in working with folks with a history of trauma. Together
					we will work to create a safe place for recovery and growth.
				</p>
			}
			image={{
				src: "/assets/images/mannie.jpg",
				alt: "Mannie (Amanda) D Switzer",
			}}
			link={{
				href: "/team/mannie",
				label: "Read More",
			}}
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
		<Contact />
	</div>
);

export default Team;
