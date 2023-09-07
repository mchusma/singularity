// src/units/components/upgradeUnit.ts
import { applyUpgrade } from "../../store/unitSlice";
import { updateResourceQuantity } from "../../store/resourceSlice";

interface Cost {
  resourceId: string;
  quantity: number;
}

export const upgradeUnit = (
  unit: any,
  upgradeId: string,
  dispatch: Function
) => {
  console.log(
    `upgradeUnit called with unitId: ${unit.id} and upgradeId: ${upgradeId}`
  );
  if (!unit) {
    console.error(`Unit not found`);
    return;
  }

  console.log(`Found unit: ${JSON.stringify(unit)}`); // Log the found unit

  // apply the upgrade
  dispatch(applyUpgrade({ unitId: unit.id, upgradeId }));
  console.log(`Upgrade applied to unitId: ${unit.id}`); // Log after upgrade is applied

  // apply the cost of the upgrade
  unit.resourceCost.forEach((cost: Cost) => {
    dispatch(
      updateResourceQuantity({
        resourceId: cost.resourceId,
        quantityChange: -cost.quantity,
      })
    );
    console.log(`Resource quantity updated for resourceId: ${cost.resourceId}`); // Log after resource quantity is updated
  });
};
