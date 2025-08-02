import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'Rohit Rai',
    email: 'rohit@example.com',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export default userSlice.reducer;
