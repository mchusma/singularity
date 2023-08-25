import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, persistor } from '../store/store';
import { Upgrades, updateUpgradeVisibility } from '../store/unitSlice';
import { upgradeUnit } from '../units/components/upgradeUnit';

interface ActiveUpgradesProps {
  unitId: string;
}

const ActiveUpgrades: React.FC<ActiveUpgradesProps> = ({ unitId }) => {
  
    const dispatch = useDispatch();
    const unit = useSelector((state: RootState) => state.units.units.find(unit => unit.id === unitId));
    const upgrades = unit?.upgrades;

    console.log('upgrades:', upgrades);

    return (
        <div>
          {upgrades?.filter(upgrade => upgrade.isVisible && !upgrade.isApplied).map((upgrade) => (
            <button 
              key={upgrade.id} 
              onClick={() => {
                console.log(`Upgrade attempted. Unit ID: ${unit?.id}, Upgrade ID: ${upgrade.id}, isVisible: ${upgrade.isVisible}, isApplied: ${upgrade.isApplied}`);
                unit && upgradeUnit(unit.id, upgrade.id); // Use the function returned by the hook
              }}
            >
              {upgrade.name}
            </button>
          ))}
        </div>
      );
};

export default ActiveUpgrades;