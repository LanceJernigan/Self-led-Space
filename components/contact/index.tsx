import styles from "./component.module.css";
import { ContactProps } from "./types";
import ContactForm from "./form";

const defaultDescription = (
	<p>
		Taking the first step is often the hardest, but you don&apos;t have to do it
		alone. Our space is here, waiting for you. Reach out, and let&apos;s talk
		about the support that feels right for you, whenever you&apos;re ready to
		begin.
	</p>
);

const Contact = ({
	subheading = "Contact",
	heading = "Start the Conversation",
	description,
}: ContactProps) => {
	return (
		<section className={styles.component}>
			<header className={styles.header}>
				<div className={styles.headings}>
					<h3 className={styles.subheading}>{subheading}</h3>
					<h2 className={styles.heading}>{heading}</h2>
				</div>
				<div className={styles.description}>
					{description ?? defaultDescription}
				</div>
			</header>

			<div className={styles.wrapper}>
				<ContactForm />
			</div>
		</section>
	);
};

export default Contact;
