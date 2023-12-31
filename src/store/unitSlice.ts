import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUnits } from "./initialUnits";

export interface Unit {
  id: string;
  name: string;
  order: number;
  resourceCost: Array<{ resourceId: string; name: string; quantity: number }>;
  resourceOutput: Array<{ resourceId: string; name: string; quantity: number }>;
  unitCost: Array<{ unitId: string; quantity: number }>;
  isVisible: boolean;
  quantity: number;
  requiredUnits: Array<{ unitId: string; name: string; quantity: number }>;
  level: number;
  buttonState: string;
  levelCost: number;
  upgrades: Upgrades[];
  attributes: Array<{ name: string; quantity: number }>;
}

export interface UnitsState {
  units: Unit[];
}

export interface Upgrades {
  id: string;
  name: string;
  new_unit_name: string;
  order: number;
  description: string;
  log_message: string;
  isVisible: boolean;
  isApplied: boolean;
  resourceCostUpdate: Array<{ resourceId: string; name: string; quantity: number }>;
  resourceCost: Array<{ unitId: string; name: string; quantity: number }>;
  resourceOutputUpdate: Array<{ resourceId: string; name: string; quantity: number }>;
  requiredUnits: Array<{ unitId: string; name: string; quantity: number }>;
  requiredResources: Array<{ unitId: string; name: string; quantity: number }>;
}

const unitsSlice = createSlice({
  name: "units",
  initialState: initialUnits,
  reducers: {
    updateUnitVisibility(state, action: PayloadAction<string>) {
      const unit = state.units.find((unit) => unit.id === action.payload);
      if (unit) {
        unit.isVisible = true;
      }
    },
    updateButtonState(
      state,
      action: PayloadAction<{ unitId: string; buttonState: string }>
    ) {
      const unit = state.units.find(
        (unit) => unit.id === action.payload.unitId
      );
      if (unit) {
        unit.buttonState = action.payload.buttonState;
      }
    },
    resetGame: (state) => {
      return initialUnits;
    },
    updateUnitQuantity: (
      state,
      action: PayloadAction<{ unitId: string; quantityChange: number }>
    ) => {
      try {
        const unit = state.units.find(
          (unit) => unit.id === action.payload.unitId
        );
        if (unit) {
          unit.quantity += action.payload.quantityChange;
        }
      } catch (error) {
        console.error("Error in updateUnitQuantity reducer:", error);
      }
    },
    updateUnitLevel: (
      state,
      action: PayloadAction<{
        unitId: string;
        levelChange: number;
        levelCostChange: number;
      }>
    ) => {
      try {
        const unit = state.units.find(
          (unit) => unit.id === action.payload.unitId
        );
        if (unit) {
          unit.level += action.payload.levelChange;
          unit.levelCost += action.payload.levelCostChange;
        }
      } catch (error) {
        console.error("Error in updateUnitLevel reducer:", error);
      }
    },
    updateAttributeQuantity: (
      state,
      action: PayloadAction<{
        unitId: string;
        attributeName: string;
        quantityChange: number;
      }>
    ) => {
      const unit = state.units.find(
        (unit) => unit.id === action.payload.unitId
      );
      if (unit) {
        const attribute = unit.attributes.find(
          (attr) => attr.name === action.payload.attributeName
        );
        if (attribute) {
          attribute.quantity += action.payload.quantityChange;
        }
      }
    },
    applyUpgrade: (
      state,
      action: PayloadAction<{ unitId: string; upgradeId: string }>
    ) => {
      const unit = state.units.find(
        (unit) => unit.id === action.payload.unitId
      );
      const upgrade = unit?.upgrades.find(
        (upgrade) => upgrade.id === action.payload.upgradeId
      );
      if (unit && upgrade) {
        // apply the upgrade by updating the unit's resourceCost from the upgrade's resourceCostUpdate multiplier.
        upgrade.resourceCostUpdate.forEach((resourceCostUpdate) => {
          const resourceCost = unit.resourceCost.find(
            (resource) => resource.resourceId === resourceCostUpdate.resourceId
          );
          if (resourceCost) {
            resourceCost.quantity *= resourceCostUpdate.quantity;
          }
        });
        console.log(
          `Upgrading ${unit.id} from ${unit.name} to ${upgrade.new_unit_name}`
        );
        unit.name = upgrade.new_unit_name;
        unit.resourceOutput = upgrade.resourceOutputUpdate;

        console.log(`Log message for unit: ${upgrade.log_message}`); // Log when function is called

        upgrade.isVisible = false;
        upgrade.isApplied = true;
      }
    },
    updateUpgradeVisibility: (
      state,
      action: PayloadAction<{ unitId: string; upgradeId: string }>
    ) => {
      const unit = state.units.find(
        (unit) => unit.id === action.payload.unitId
      );
      const upgrade = unit?.upgrades.find(
        (upgrade) => upgrade.id === action.payload.upgradeId
      );
      if (upgrade) {
        upgrade.isVisible = true;
      }
    },
  },
});

export const {
  updateUnitVisibility,
  updateAttributeQuantity,
  updateButtonState,
  updateUnitQuantity,
  resetGame,
  updateUnitLevel,
  applyUpgrade,
  updateUpgradeVisibility,
} = unitsSlice.actions;
export default unitsSlice.reducer;
