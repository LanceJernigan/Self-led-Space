import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import RenderBlocks from "@/components/renderBlocks";
import { getPageBySlug, getAllPageSlugs } from "@/lib/data";
import styles from "./page.module.css";

type PageProps = {
	params: Promise<{ slug?: string[] }>;
};

const resolveSlug = (slug?: string[]) => (slug?.length ? slug.join("/") : "home");

export const generateStaticParams = async () => {
	const slugs = await getAllPageSlugs();
	return slugs.map((slug) => ({ slug: slug === "home" ? [] : [slug] }));
};

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const { slug } = await params;
	const page = await getPageBySlug(resolveSlug(slug));
	if (!page) return {};
	return {
		title: page.seo?.metaTitle ?? page.title,
		description: page.seo?.metaDescription ?? undefined,
	};
};

const Page = async ({ params }: PageProps) => {
	const { slug } = await params;
	const { isEnabled: isDraft } = await draftMode();
	const page = await getPageBySlug(resolveSlug(slug), isDraft);
	if (!page) notFound();

	const firstBlock = page.layout?.[0]?.blockType;
	const leadsWithHero = firstBlock === "hero" || firstBlock === "heroSecondary";

	return (
		<div className={leadsWithHero ? styles.spacing : styles.spacingTop}>
			<RenderBlocks blocks={page.layout} />
		</div>
	);
};

export default Page;
