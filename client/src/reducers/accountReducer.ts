// reducers/accountReducer.ts
import { createSlice } from '@reduxjs/toolkit';

interface AccountState {
    account: string | null;
}

const initialState: AccountState = {
    account: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
    },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;