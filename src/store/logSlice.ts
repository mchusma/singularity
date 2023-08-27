import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialLogs } from './initialLogs';

interface Log {
  id: number;
  message: string;
}

export interface LogState {
  logs: Log[];
}

const logSlice = createSlice({
  name: 'log',
  initialState: initialLogs,
  reducers: {
    addMessage: (state, action: PayloadAction<Log>) => {
      state.logs.push(action.payload);
    },
    resetGame: (state) => {
      return initialLogs;
    },
  },
});

export const { addMessage, resetGame } = logSlice.actions;
export default logSlice.reducer;