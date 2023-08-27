import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateUnitQuantity } from '../../store/unitSlice';
import { updateResourceQuantity } from '../../store/resourceSlice';

export const buildUnit = (unitId: string) => {
    const dispatch = useDispatch();
    const unit = useSelector((state: RootState) => state.units.units.find(unit => unit.id === unitId));

    return () => {
      if (!unit) {
        console.error(`Unit with id ${unitId} not found`);
        return;
      }

      // Increase the quantity of the unit
      dispatch(updateUnitQuantity({ unitId, quantityChange: 1 }));

      // Loop through the resourceCost array and decrease the quantity of each resource
      unit.resourceCost.forEach(cost => {
        dispatch(updateResourceQuantity({ resourceId: cost.resourceId, quantityChange: -cost.quantity }));
      });

      // Loop through the unitCost array and decrease the quantity of each unit
      unit.unitCost.forEach(cost => {
        dispatch(updateUnitQuantity({ unitId: cost.unitId, quantityChange: -cost.quantity }));
      });
    };
  };
