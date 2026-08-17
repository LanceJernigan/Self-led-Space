"use server";

import { getPayloadClient } from "@/lib/data";

export type ContactState = {
	status: "idle" | "success" | "error";
	message?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function submitContact(
	_prev: ContactState,
	formData: FormData,
): Promise<ContactState> {
	const name = String(formData.get("name") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();

	// Honeypot: only a bot fills the hidden "website" field. Report success rather
	// than an error so it can't tell it was caught and retry with the field blank.
	if (String(formData.get("website") ?? "").trim()) {
		return { status: "success", message: "Thanks — we'll be in touch soon." };
	}

	if (!name || !email || !message) {
		return { status: "error", message: "Please fill in your name, email, and message." };
	}
	if (!isEmail(email)) {
		return { status: "error", message: "Please enter a valid email address." };
	}

	try {
		const payload = await getPayloadClient();
		await payload.create({
			collection: "contact-submissions",
			data: { name, email, message },
		});
		return { status: "success", message: "Thanks — we'll be in touch soon." };
	} catch (err) {
		// Log it: a silent failure here means an inquiry was lost with no trace.
		console.error("[contact] submission failed to save", err);
		return { status: "error", message: "Something went wrong. Please try again." };
	}
}
