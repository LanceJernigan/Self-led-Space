import type { Metadata } from "next";
import Featurette from "@/components/featurette";

export const metadata: Metadata = {
	title: "Contact Us",
	description: "Get in touch with us to schedule a session. We're here to help you find the support you need on your healing journey.",
};
import styles from "./page.module.css";
import Approach from "@/components/approach";
import Contact from "@/components/contact";

const Team = () => (
	<div className={styles.spacing}>
		<Contact />
		<Approach name="services" />
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
