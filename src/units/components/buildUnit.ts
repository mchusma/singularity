import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateUnitQuantity } from '../../store/unitSlice';
import { updateResourceQuantity } from '../../store/resourceSlice';

export const buildUnit = (unitId: string) => {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.units.units.find(unit => unit.id === unitId));
  const resources = useSelector((state: RootState) => state.resources);
  const units = useSelector((state: RootState) => state.units);

  return () => {
    if (!unit) {
      console.error(`Unit with id ${unitId} not found`);
      return;
    }

    // Check if there are enough resources to build the unit
    const resourceCosts = unit.resourceCost.map(cost => resources.resources.find((res) => res.id === cost.resourceId));
    for (let i = 0; i < resourceCosts.length; i++) {
      const resourceCost = resourceCosts[i];
      if (!resourceCost || (resourceCost.quantity < unit.resourceCost[i].quantity)) {
        throw new Error("Not enough resources.");
      }
    }

    // Check if there are enough units to build the unit
    const unitCosts = unit.unitCost.map(cost => units.units.find((u) => u.id === cost.unitId));
    for (let i = 0; i < unitCosts.length; i++) {
      const unitCost = unitCosts[i];
      if (!unitCost || unitCost?.quantity < unit.unitCost[i].quantity) {
        throw new Error("Not enough units.");
      }
    }

    console.log(`Building unit with id ${unitId}`);

    // Increase the quantity of the unit
    dispatch(updateUnitQuantity({ unitId, quantityChange: 1 }));

    // Decrease the quantity of each resource and unit
    unit.resourceCost.forEach(cost => {
      console.log(`Decreasing resource ${cost.resourceId} by ${cost.quantity}`);
      dispatch(updateResourceQuantity({ resourceId: cost.resourceId, quantityChange: -cost.quantity }));
    });

    unit.unitCost.forEach(cost => {
      console.log(`Decreasing unit ${cost.unitId} by ${cost.quantity}`);
      dispatch(updateUnitQuantity({ unitId: cost.unitId, quantityChange: -cost.quantity }));
    });

    // Increase the quantity of each resource output
    unit.resourceOutput.forEach(output => {
      console.log(`Increasing resource ${output.resourceId} by ${output.quantity}`);
      dispatch(updateResourceQuantity({ resourceId: output.resourceId, quantityChange: output.quantity }));
    });
  };
};