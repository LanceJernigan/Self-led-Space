import Featurette from "@/components/featurette";
import styles from "./page.module.css";
import Approach from "@/components/approach";
import Contact from "@/components/contact";

const Team = () => (
	<div className={styles.spacing}>
		<Contact />
		<Approach />
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
