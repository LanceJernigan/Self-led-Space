import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Turns off draft mode and returns to the given path (or home). */
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	(await draftMode()).disable();
	redirect(searchParams.get("path") || "/");
}
