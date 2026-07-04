import type { Team } from "@/src/payload-types";

export type MemberBioProps = {
	name: string;
	title: string;
	bio: Team["bio"];
};
