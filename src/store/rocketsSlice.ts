// store/rocketsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface RocketsState {
  launched: number;
}

const initialState: RocketsState = {
  launched: 0,
};

export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    launchRocket: (state) => {
      state.launched += 1;
    },
    setRocketsLaunched: (state, action) => {
      state.launched = action.payload;
    },
  },
});

export const { launchRocket, setRocketsLaunched } = rocketsSlice.actions;

export default rocketsSlice.reducer;
