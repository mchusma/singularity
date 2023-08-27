import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialLog } from './initialLogs';

interface Log {
  id: string;
  message: string;
}

export interface LogState {
  logs: Log[];
}

const logSlice = createSlice({
  name: 'log',
  initialState: initialLog,
  reducers: {
    updateResourceQuantity: (state, action: PayloadAction<{ resourceId: string, quantityChange: number }>) => {
      const resource = state.resources.find(res => res.id === action.payload.resourceId);
      if (resource) {
        resource.quantity += action.payload.quantityChange;
      }
    },
    resetGame: (state) => {
        return initialLog;
      },
  },
});

export const { updateResourceQuantity, resetGame } = resourcesSlice.actions;
export default resourcesSlice.reducer;
