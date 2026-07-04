import Image from "next/image";
import {
	convertLexicalNodesToJSX,
	defaultJSXConverters,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedUploadNode } from "@payloadcms/richtext-lexical";
import type { Media } from "@/src/payload-types";
import styles from "./component.module.css";
import { MemberBioProps } from "./types";

type Node = { type?: string; [k: string]: unknown };

const isUpload = (n: Node): n is SerializedUploadNode => n?.type === "upload";

const MediaImage = ({ media }: { media: Media | number }) => {
	if (typeof media !== "object" || !media?.url) return null;
	return (
		<div className={styles.image}>
			<Image
				src={media.url}
				alt={media.alt ?? ""}
				fill
				sizes="(max-width: 800px) 100vw, 400px"
				quality={100}
			/>
		</div>
	);
};

/**
 * Renders the free-form bio. Consecutive images collapse into a responsive
 * gallery (2-up on desktop, stacked on mobile) to match the design; runs of
 * text render through the default Lexical → JSX converters.
 */
const MemberBio = ({ name, title, bio }: MemberBioProps) => {
	const root = bio?.root;
	const children = (root?.children ?? []) as Node[];

	type Segment = { kind: "images" | "content"; nodes: Node[] };
	const segments: Segment[] = [];
	for (const node of children) {
		const kind = isUpload(node) ? "images" : "content";
		const last = segments[segments.length - 1];
		if (last && last.kind === kind) last.nodes.push(node);
		else segments.push({ kind, nodes: [node] });
	}

	return (
		<section className={styles.component}>
			<div className={styles.wrapper}>
				<header className={styles.header}>
					<h2 className={styles.subheading}>{title}</h2>
					<h1 className={styles.heading}>{name}</h1>
				</header>
				<div className={styles.content}>
					{segments.map((seg, i) => {
						if (seg.kind === "images") {
							return (
								<div
									key={i}
									className={seg.nodes.length > 1 ? styles.gallery : undefined}
								>
									{seg.nodes.map((n, j) => (
										<MediaImage
											key={j}
											media={(n as SerializedUploadNode).value as Media | number}
										/>
									))}
								</div>
							);
						}
						return (
							<div key={i} className={styles.prose}>
								{convertLexicalNodesToJSX({
									converters: defaultJSXConverters,
									nodes: seg.nodes as never,
									parent: root as never,
								})}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default MemberBio;
