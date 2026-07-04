import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import MemberHero from "@/components/memberHero";
import MemberBio from "@/components/memberBio";
import Qualifications from "@/components/qualifications";
import CardsFeature from "@/components/cardsFeature";
import Specialties from "@/components/specialties";
import Expertise from "@/components/expertise";
import { getMemberBySlug, getAllMemberSlugs, toImage } from "@/lib/data";
import styles from "./page.module.css";

type PageProps = {
	params: Promise<{ member: string }>;
};

export const generateStaticParams = async () => {
	const slugs = await getAllMemberSlugs();
	return slugs.map((member) => ({ member }));
};

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const { member } = await params;
	const data = await getMemberBySlug(member);

	if (!data) {
		return {};
	}

	return {
		title: data.name,
		description: data.summary,
	};
};

const MemberPage = async ({ params }: PageProps) => {
	const { member } = await params;
	const { isEnabled: isDraft } = await draftMode();
	const data = await getMemberBySlug(member, isDraft);

	if (!data) {
		notFound();
	}

	const banner = toImage(data.banner);
	const photo = toImage(data.photo);
	const approachImage = toImage(data.approachImage);

	return (
		<div className={styles.spacing}>
			{banner && photo && (
				<MemberHero
					banner={banner}
					photo={photo}
				/>
			)}
			<MemberBio
				name={data.name}
				title={data.title}
				bio={data.bio}
			/>
			<Qualifications
				heading="Qualifications"
				items={(data.qualifications ?? []).map((q) => ({
					label: q.label,
					content: q.content ?? [],
				}))}
			/>
			{approachImage && (
				<CardsFeature
					heading="Treatment Approaches"
					image={approachImage}
					cards={(data.approaches ?? []).map((a) => ({
						title: a.title,
						text: a.text,
					}))}
				/>
			)}
			<Specialties
				heading="Specialties"
				items={data.specialties ?? []}
			/>
			<Expertise
				heading="Expertise"
				items={data.expertise ?? []}
			/>
		</div>
	);
};

export default MemberPage;
