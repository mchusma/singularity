import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Setting {
  activeUnitId: string;
}

const initialSetting: Setting = {
  activeUnitId: 'none',
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialSetting,
  reducers: {
    setActiveUnitId: (state, action: PayloadAction<string>) => {
      state.activeUnitId = action.payload;
    },
    resetSetting: () => {
      return initialSetting;
    },
  },
});

export const { setActiveUnitId, resetSetting } = settingSlice.actions;
export default settingSlice.reducer;