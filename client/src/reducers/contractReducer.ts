// reducers/contractReducer.ts
import { ethers } from 'ethers';
import { createSlice } from '@reduxjs/toolkit';

interface ContractState {
    contract: ethers.Contract | null;
}

const initialState: ContractState = {
    contract: null,
};

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setContract: (state, action) => {
            state.contract = action.payload;
        },
    },
});

export default contractSlice.reducer;
export const { setContract } = contractSlice.actions;