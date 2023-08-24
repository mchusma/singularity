import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, persistor } from '../store/store';
import { Upgrades } from '../store/unitSlice';
import { upgradeUnit } from '../units/components/upgradeUnit';

interface ActiveUpgradesProps {
  unitId: string;
}

const ActiveUpgrades: React.FC<ActiveUpgradesProps> = ({ unitId }) => {
    console.log('unitId:', unitId); // Log unitId
  
    const dispatch = useDispatch();
  
    const unit = useSelector((state: RootState) => state.units.units.find(unit => unit.id === unitId));
    console.log('unit:', unit); // Log unit
  
    const upgrades = unit?.upgrades;
    console.log('upgrades:', upgrades); // Log upgrades
  

  return (
    <div>
        {upgrades?.map((upgrade) => (
            <button 
            key={upgrade.id} 
            onClick={() => unit && upgradeUnit(unit.id, upgrade.id)}
            >
            {upgrade.name}
            </button>
        ))}
    </div>
  );
};

export default ActiveUpgrades;
