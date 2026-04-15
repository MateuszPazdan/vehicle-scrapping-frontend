import { Roles } from '@/app/_utils/roles';
import { apiSlice } from '../services/apiSlice';

export interface User {
	id: string;
	email: string;
	is_admin: boolean;
	created_at: string;
	updated_at: string;
	roles: Roles;
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => ({ url: '/users/me', method: 'GET' }),
		}),
		retrieveAllUsers: builder.query<User[], void>({
			query: () => ({ url: '/users/all', method: 'GET' }),
			providesTags: ['Users'],
		}),
		verifyToken: builder.mutation({
			query: () => ({
				url: '/auth/verify',
				method: 'POST',
			}),
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/auth/login',
				method: 'POST',
				body: { email, password },
			}),
		}),
		register: builder.mutation({
			query: ({ email, password }) => ({
				url: '/auth/register',
				method: 'POST',
				body: { email, password },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
		}),
		updateRoles: builder.mutation({
			query: ({ userId, roles }) => ({
				url: `/users/roles`,
				method: 'PUT',
				body: { id: userId, roles },
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useRetrieveAllUsersQuery,
	useVerifyTokenMutation,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useUpdateRolesMutation,
} = authApiSlice;
