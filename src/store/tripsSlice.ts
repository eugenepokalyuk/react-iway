// store/tripsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Trip {
    order_id: number;
    user_id: number;
    order_type: number;
    transaction: number;
    date: string;
    date_arrival: string;
    date_departure: string | null;
    payable_status: number;
    status: number;
    service_id: number;
    duration: number;
}

interface TripsState {
    trips: Trip[];
    loading: boolean;
    error: string | null;
}

const initialState: TripsState = {
    trips: [],
    loading: false,
    error: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchTrips: any = createAsyncThunk(
    'trips/fetchTrips',
    async (token: string) => {
        const response = await axios.get('https://transstage1.iwayex.com/transnextgen/v3/orders/trips', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.result.orders;
    }
);

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrips.fulfilled, (state, action) => {
                state.trips = action.payload;
                state.loading = false;
            })
            .addCase(fetchTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch trips';
            });
    },
});

export default tripsSlice.reducer;
