import type { Access, Where } from "payload";

/**
 * Team read (REST/GraphQL + admin panel):
 * - public (no user): only active profiles
 * - admin: all profiles
 * - member: only their own profile (keeps their admin view focused)
 *
 * Note: the public site fetches via the Local API with explicit `where` filters,
 * so this governs the authenticated API + admin experience.
 */
export const readTeam: Access = ({ req: { user } }) => {
	const publishedOnly: Where = { _status: { equals: "published" } };
	if (!user) return publishedOnly;
	if (user.role === "admin") return true;
	if (user.role === "member" && user.member) {
		const memberId =
			typeof user.member === "object" ? user.member.id : user.member;
		return { id: { equals: memberId } } as Where;
	}
	return publishedOnly;
};
