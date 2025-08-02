import { createSlice } from '@reduxjs/toolkit';
import { projects } from '@/data/projects'; // We'll create this next

const initialState = {
    projects, // from mock file
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // You can add reducers later if needed
    },
});

export default projectSlice.reducer;
