import type { Access, FieldAccess } from "payload";

/** Collection-level: only admins. */
export const isAdmin: Access = ({ req: { user } }) => user?.role === "admin";

/** Field-level: only admins may write this field (used to lock structural fields). */
export const isAdminField: FieldAccess = ({ req: { user } }) =>
	user?.role === "admin";
