/** Hide a collection/global from the admin nav for non-admin (member) users. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adminOnlyNav = ({ user }: { user?: any }): boolean =>
	user?.role !== "admin";
