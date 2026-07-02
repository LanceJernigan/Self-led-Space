import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MemberHero from "@/components/memberHero";
import MemberBio from "@/components/memberBio";
import Qualifications from "@/components/qualifications";
import CardsFeature from "@/components/cardsFeature";
import Specialties from "@/components/specialties";
import Expertise from "@/components/expertise";
import { getMember, members } from "./members";
import styles from "./page.module.css";

type PageProps = {
	params: Promise<{ member: string }>;
};

export const generateStaticParams = async () =>
	members.map((member) => ({ member: member.slug }));

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const { member } = await params;
	const data = getMember(member);

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
	const data = getMember(member);

	if (!data) {
		notFound();
	}

	return (
		<div className={styles.spacing}>
			<MemberHero
				banner={data.banner}
				photo={data.photo}
			/>
			<MemberBio
				name={data.name}
				title={data.title}
				intro={data.intro}
				gallery={data.gallery}
				body={data.body}
			/>
			<Qualifications
				heading="Qualifications"
				items={data.qualifications}
			/>
			<CardsFeature
				heading="Treatment Approaches"
				image={data.approachImage}
				cards={data.approaches}
			/>
			<Specialties
				heading="Specialties"
				items={data.specialties}
			/>
			<Expertise
				heading="Expertise"
				items={data.expertise}
			/>
		</div>
	);
};

export default MemberPage;
