// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from './rocketsSlice';

const store = configureStore({
  reducer: {
    rockets: rocketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
