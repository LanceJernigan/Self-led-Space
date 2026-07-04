import type { Access } from "payload";

/**
 * Team profile update: admins can edit any profile; a member can edit only the
 * one profile their user account is linked to (`users.member`). Returning a query
 * constraint restricts the member to their own document at the DB level.
 */
export const canEditProfile: Access = ({ req: { user } }) => {
	if (!user) return false;
	if (user.role === "admin") return true;
	if (user.role === "member" && user.member) {
		const memberId =
			typeof user.member === "object" ? user.member.id : user.member;
		return { id: { equals: memberId } };
	}
	return false;
};
