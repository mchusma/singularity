import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUnits } from './initialUnits';

export interface Unit {
  id: number;
  name: string;
  isVisible: boolean;
  quantity: number;
  requiredUnits: Array<{ unitId: number, quantity: number }>;
}

export interface UnitsState {
  units: Unit[];
}

const unitsSlice = createSlice({
  name: 'units',
  initialState: initialUnits,
  reducers: {
    updateUnitVisibility(state, action: PayloadAction<number>) {
      const unit = state.units.find(unit => unit.id === action.payload);
      if (unit) {
        unit.isVisible = true;
      }
    },
    clearUnits: (state) => {
      return initialUnits;
    },
    addUnit: (state, action: PayloadAction<number>) => {
      try {
        const unit = state.units.find(unit => unit.id === action.payload);
        if (unit) {
          unit.quantity += 1;
        }
      } catch (error) {
        console.error('Error in addUnit reducer:', error);
      }
    },
  },
});

export const { updateUnitVisibility, addUnit, clearUnits } = unitsSlice.actions;
export default unitsSlice.reducer;
