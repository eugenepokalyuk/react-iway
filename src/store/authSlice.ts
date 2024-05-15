import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login: any = createAsyncThunk(
    'auth/login',
    async ({ login, password }: { login: string, password: string }) => {
        const response = await axios.post('https://transstage1.iwayex.com/transnextgen/v3/auth/login', {
            login,
            password,
        });
        return response.data.result.token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload;
                state.loading = false;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to login';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;