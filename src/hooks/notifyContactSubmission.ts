import type { CollectionAfterChangeHook } from "payload";
import type { ContactSubmission } from "../payload-types";

/**
 * Email the practice when a new inquiry arrives, so a submission isn't left
 * sitting in the admin panel unseen.
 *
 * Recipient comes from Site Settings → email (editable in the admin, no deploy
 * needed), falling back to CONTACT_NOTIFICATION_EMAIL. Reply-To is the sender's
 * address, so replying from the inbox goes straight back to them.
 *
 * This hook NEVER throws: the submission is the thing that must not be lost, so
 * a mail failure is logged and swallowed rather than failing the create.
 */

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

const row = (label: string, value: string) =>
	`<p style="margin:0 0 8px"><strong>${label}:</strong> ${escapeHtml(value)}</p>`;

export const notifyContactSubmission: CollectionAfterChangeHook<
	ContactSubmission
> = async ({ doc, operation, req }) => {
	// Only new inquiries — editing a stored submission shouldn't re-notify.
	if (operation !== "create") return doc;

	const { payload } = req;

	try {
		const settings = await payload.findGlobal({
			slug: "site-settings",
			depth: 0,
		});
		const to = settings?.email || process.env.CONTACT_NOTIFICATION_EMAIL;

		if (!to) {
			payload.logger.warn(
				"Contact submission saved but not emailed: set Site Settings → email or CONTACT_NOTIFICATION_EMAIL.",
			);
			return doc;
		}

		const details = [
			row("Name", doc.name),
			row("Email", doc.email),
			doc.phone ? row("Phone", doc.phone) : "",
			`<p style="margin:16px 0 4px"><strong>Message:</strong></p>`,
			`<p style="margin:0;white-space:pre-wrap">${escapeHtml(doc.message)}</p>`,
		].join("");

		await payload.sendEmail({
			to,
			replyTo: doc.email,
			subject: `New contact form submission — ${doc.name}`,
			text: [
				`Name: ${doc.name}`,
				`Email: ${doc.email}`,
				doc.phone ? `Phone: ${doc.phone}` : "",
				"",
				doc.message,
			]
				.filter(Boolean)
				.join("\n"),
			html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">${details}</div>`,
		});
	} catch (err) {
		payload.logger.error(
			{ err },
			"Contact submission saved, but the notification email failed to send.",
		);
	}

	return doc;
};
