import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
    name: 'ui',
    initialState: { isRefresh: false },
    reducers: {
        toggle(state) {
            state.isRefresh = !state.isRefresh;
        }
    }
});

export const refreshActions = refreshSlice.actions;

export default refreshSlice;