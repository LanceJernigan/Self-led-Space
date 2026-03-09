import type { Metadata } from "next";
import Featurette from "@/components/featurette";

export const metadata: Metadata = {
    title: "Our Services",
    description: "Explore our range of therapeutic services designed to support individuals, couples, and families through every stage of life.",
};
import HeroSecondary from "@/components/heroSecondary";
import styles from "./page.module.css";
import Contact from "@/components/contact";
import CardsFeature from "@/components/cardsFeature";

const Team = () => (
    <div className={styles.spacing}>
        <HeroSecondary
            heading="Our Approach to Care"
            subheading="Services"
            content={
                <>
                    <p>
                        We offer therapy that meets you where you are — whether you&apos;re
                        navigating anxiety, relationship challenges, or simply seeking a deeper
                        sense of calm and connection.
                    </p>
                </>
            }
            image={{
                src: "/assets/images/services.jpg",
                alt: "Forrest background",
            }}
            name="services"
        />
        <Featurette
            heading="What We Offer"
            content={
                <p>
                    Our network provides a range of therapeutic services designed to support individuals, couples, and families through every stage of life. Each therapist brings unique training and specialties, yet we all share one goal: helping you feel supported and understood.
                </p>
            }
            image={{
                src: "/assets/images/whoWeAre.jpg",
                alt: "Who We Are background",
            }}
        />
        <CardsFeature
            heading="Treatment Approaches"
            description={
                <p>
                    We use evidence-based methods and warm, collaborative guidance to help you reach your goals.
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

export default Team;
