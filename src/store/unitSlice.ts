// unitSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export const unitSlice = createSlice({
  name: 'units',
  initialState: {
    rocketsLaunched: 0,
    factoriesBuilt: 0,
    factoryEmittersBuilt: 0,
  },
  reducers: {
    launchRocket: (state) => {
      state.rocketsLaunched += 1;
    },
    buildFactory: (state) => {
      state.factoriesBuilt += 1;
    },
    buildFactoryEmitter: (state) => { 
      console.log('Before building factory emitter:', state.factoryEmittersBuilt);
      state.factoryEmittersBuilt += 1;
    },
  },
});

export const { launchRocket, buildFactory, buildFactoryEmitter } = unitSlice.actions;
export default unitSlice.reducer;
