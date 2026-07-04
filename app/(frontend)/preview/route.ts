import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enables Next draft mode, then redirects to the page so it renders the latest
 * draft. Linked from Payload's admin "Preview" button (guarded by PREVIEW_SECRET).
 */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const secret = searchParams.get("secret");
	const path = searchParams.get("path") || "/";

	const expected = process.env.PREVIEW_SECRET || process.env.PAYLOAD_SECRET;
	if (!secret || secret !== expected) {
		return new Response("Invalid preview token", { status: 401 });
	}
	// Only allow same-site internal paths.
	if (!path.startsWith("/")) {
		return new Response("Invalid path", { status: 400 });
	}

	(await draftMode()).enable();
	redirect(path);
}
