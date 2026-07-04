/** Builds the admin "Preview" URL that enables draft mode for a given public path. */
export const previewUrl = (path: string): string => {
	const secret = process.env.PREVIEW_SECRET || process.env.PAYLOAD_SECRET || "";
	const base = process.env.NEXT_PUBLIC_SERVER_URL || "";
	return `${base}/preview?secret=${encodeURIComponent(secret)}&path=${encodeURIComponent(path)}`;
};
