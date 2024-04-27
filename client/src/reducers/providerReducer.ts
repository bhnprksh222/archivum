// reducers/providerReducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

interface ProviderState {
    provider: ethers.BrowserProvider | null;
}

const initialState: ProviderState = {
    provider: null,
};

const providerSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {
        setProvider: (state, action) => {
            state.provider = action.payload;
        },
    },
});

export const { setProvider } = providerSlice.actions;
export default providerSlice.reducer;