import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Team } from "./collections/Team";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Use Cloudflare R2 for media only when configured; otherwise local disk (dev).
const useR2 = Boolean(process.env.R2_BUCKET && process.env.R2_ACCESS_KEY_ID);

export default buildConfig({
	admin: {
		user: Users.slug,
	},
	collections: [Users, Team, Media, Pages, ContactSubmissions],
	globals: [SiteSettings, Header, Footer],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: { connectionString: process.env.DATABASE_URI || "" },
	}),
	sharp,
	plugins: useR2
		? [
				s3Storage({
					collections: { media: true },
					bucket: process.env.R2_BUCKET as string,
					config: {
						endpoint: process.env.R2_ENDPOINT,
						region: "auto",
						credentials: {
							accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
							secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
						},
					},
				}),
			]
		: [],
});
