import { Roles } from '@/app/_utils/roles';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	roles: Roles[];
}

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	roles: [],
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<{ roles: Roles[] } | undefined>) => {
			if (!action.payload) return;

			state.isAuthenticated = true;
			state.roles = action.payload.roles;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.roles = [];
		},
		finishInitialLoad: (state) => {
			state.isLoading = false;
		},
	},
});

export const { setAuth, finishInitialLoad, logout } = authSlice.actions;
export default authSlice.reducer;
