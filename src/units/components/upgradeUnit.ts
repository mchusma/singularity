import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { applyUpgrade } from '../../store/unitSlice';
import { updateResourceQuantity } from '../../store/resourceSlice';

export const upgradeUnit = (unitId: string, upgradeId: string) => {
  return () => {
    const dispatch = useDispatch();
    const unit = useSelector((state: RootState) => state.units.units.find(unit => unit.id === unitId));

    if (!unit) {
      console.error(`Unit with id ${unitId} not found`);
      return;
    }

    // apply the upgrade
    dispatch(applyUpgrade({ unitId, upgradeId }));

    // apply the cost of the upgrade
    unit.resourceCost.forEach(cost => {
      dispatch(updateResourceQuantity({ resourceId: cost.resourceId, quantityChange: -cost.quantity }));
    });
  };
};