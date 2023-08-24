import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUnits } from './initialUnits';

export interface Unit {
  id: string;
  name: string;
  order: number,
  isVisible: boolean;
  quantity: number;
  requiredUnits: Array<{ unitId: string, quantity: number }>;
  level: number;
  levelCost: number;
}

export interface UnitsState {
  units: Unit[];
}

const unitsSlice = createSlice({
  name: 'units',
  initialState: initialUnits,
  reducers: {
    updateUnitVisibility(state, action: PayloadAction<string>) {
      const unit = state.units.find(unit => unit.id === action.payload);
      if (unit) {
        unit.isVisible = true;
      }
    },
    resetGame: (state) => {
      return initialUnits;
    },
    updateUnitQuantity: (state, action: PayloadAction<{ unitId: string, quantityChange: number }>) => {
      try {
        const unit = state.units.find(unit => unit.id === action.payload.unitId);
        if (unit) {
          unit.quantity += action.payload.quantityChange;
        }
      } catch (error) {
        console.error('Error in updateUnitQuantity reducer:', error);
      }
    },
  },
});

export const { updateUnitVisibility, updateUnitQuantity, resetGame } = unitsSlice.actions;
export default unitsSlice.reducer;
