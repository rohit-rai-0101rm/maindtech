// store/chatSlice.ts (already exists)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: string;
}

interface ChatState {
    [key: string]: Message[]; // key = projectId or projectId_fileId
}

const initialState: ChatState = {};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage: (state, action: PayloadAction<{ key: string; message: Message }>) => {
            const { key, message } = action.payload;
            state[key] = [...(state[key] || []), message];
        },
    },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
