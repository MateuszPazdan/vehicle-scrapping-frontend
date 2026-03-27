export const ROLES = {
	ADMIN: 'ADMIN',
	USER: 'USER',
	EMPLOYEE: 'EMPLOYEE',
};

export type Roles = typeof ROLES[keyof typeof ROLES];