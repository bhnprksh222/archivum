// reducers/filesReducer.ts
import { createSlice } from '@reduxjs/toolkit';

interface FileState {
    id: string;
    user_id: string;
    name: string;
    ipfs_pin_hash: string;
    size: string;
    date_pinned: string;
}

interface FilesState {
    files: FileState[];
}

const initialState: FilesState = {
    files: [],
};

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            console.log('entered')
            state.files = [...state.files, action.payload];
        },
    },
});

export const { setFiles } = filesSlice.actions;
export default filesSlice.reducer;