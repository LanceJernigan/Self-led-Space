"use client";

import { useActionState } from "react";
import styles from "./component.module.css";
import { submitContact, type ContactState } from "@/lib/actions";

const initialState: ContactState = { status: "idle" };

const ContactForm = () => {
	const [state, formAction, pending] = useActionState(submitContact, initialState);

	return (
		<form className={styles.form} action={formAction}>
			<div className={styles.row}>
				<div className={styles.field}>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" required />
				</div>
				<div className={styles.field}>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" required />
				</div>
			</div>
			<div className={styles.field}>
				<label htmlFor="message">Message</label>
				<textarea id="message" name="message" rows={6} required></textarea>
			</div>
			{/* Honeypot — must stay empty. Hidden from people; bots fill it. */}
			<div className={styles.honeypot} aria-hidden="true">
				<label htmlFor="website">Website</label>
				<input
					type="text"
					id="website"
					name="website"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>
			<button type="submit" className={styles.submit} disabled={pending}>
				{pending ? "Sending…" : "Submit"}
			</button>
			{state.status !== "idle" && (
				<p className={styles.status} data-status={state.status} role="status">
					{state.message}
				</p>
			)}
		</form>
	);
};

export default ContactForm;
