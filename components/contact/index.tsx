import styles from "./component.module.css";

const Contact = () => {
	return (
		<section className={styles.component}>
			<header className={styles.header}>
				<div className={styles.headings}>
					<h3 className={styles.subheading}>Contact</h3>
					<h2 className={styles.heading}>Start the Conversation</h2>
				</div>
				<p className={styles.description}>
					Taking the first step is often the hardest, but you don&apos;t have to
					do it alone. Our space is here, waiting for you. Reach out, and
					let&apos;s talk about the support that feels right for you, whenever
					you&apos;re ready to begin.
				</p>
			</header>

			<div className={styles.wrapper}>
				<form className={styles.form}>
					<div className={styles.row}>
						<div className={styles.field}>
							<label htmlFor="name">Name</label>
							<input type="text" id="name" name="name" />
						</div>
						<div className={styles.field}>
							<label htmlFor="email">Email</label>
							<input type="email" id="email" name="email" />
						</div>
					</div>
					<div className={styles.field}>
						<label htmlFor="message">Message</label>
						<textarea id="message" name="message" rows={6}></textarea>
					</div>
					<button type="submit" className={styles.submit}>
						Submit
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
