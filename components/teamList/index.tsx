import Featurette from "@/components/featurette";
import { getActiveMembers, toImage } from "@/lib/data";

type TeamListProps = {
	startReversed?: boolean;
};

/** Renders every active team member as a Featurette (image/title/summary from their profile). */
const TeamList = async ({ startReversed = false }: TeamListProps) => {
	const members = await getActiveMembers();

	return (
		<>
			{members.map((member, index) => {
				const photo = toImage(member.photo);
				if (!photo) return null;
				const reverse = startReversed ? index % 2 === 0 : index % 2 === 1;
				return (
					<Featurette
						key={member.id}
						subheading={member.title}
						heading={member.name}
						content={<p>{member.summary}</p>}
						image={photo}
						link={{ href: `/team/${member.slug}`, label: "Read More" }}
						reverse={reverse}
					/>
				);
			})}
		</>
	);
};

export default TeamList;
