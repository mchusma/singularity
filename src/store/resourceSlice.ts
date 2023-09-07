import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialResources } from "./initialResources";

interface Resource {
  id: string;
  name: string;
  quantity: number;
  requiredUnits: Array<{ unitId: number; quantity: number }>;
}

export interface ResourcesState {
  resources: Resource[];
}

const resourcesSlice = createSlice({
  name: "resources",
  initialState: initialResources,
  reducers: {
    updateResourceQuantity: (
      state,
      action: PayloadAction<{ resourceId: string; quantityChange: number }>
    ) => {
      const resource = state.resources.find(
        (res) => res.id === action.payload.resourceId
      );
      if (resource) {
        resource.quantity += action.payload.quantityChange;
      }
    },
    resetGame: (state) => {
      return initialResources;
    },
  },
});

export const { updateResourceQuantity, resetGame } = resourcesSlice.actions;
export default resourcesSlice.reducer;
