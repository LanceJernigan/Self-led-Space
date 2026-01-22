import Featurette from "@/components/featurette";
import HeroSecondary from "@/components/heroSecondary";
import styles from "./page.module.css";

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
	</div>
);

export default Team;
