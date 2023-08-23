import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Unit {
  id: number;
  name: string;
  isVisible: boolean;
  quantity: number;
  requiredUnits: Array<{ unitId: number, quantity: number }>;
}

interface UnitsState {
  units: Unit[];
}

const initialState: UnitsState = {
  units: [
    {
      id: 1,
      name: 'Rocket',
      isVisible: true,
      quantity: 0,
      requiredUnits: []
    },
    {
      id: 2,
      name: 'Factory',
      isVisible: false,
      quantity: 0,
      requiredUnits: [{ unitId: 1, quantity: 10 }]
    },
    {
      id: 3,
      name: 'FactoryEmitter',
      isVisible: false,
      quantity: 0,
      requiredUnits: [{ unitId: 2, quantity: 10 }]
    },  ]
};

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    updateUnitVisibility(state, action: PayloadAction<number>) {
      const unit = state.units.find(unit => unit.id === action.payload);
      if (unit) {
        unit.isVisible = true;
      }
    },
    clearUnits: (state) => {
      return initialState;
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
