import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Factory from '../units/Factory';
import FactoryEmitter from '../units/FactoryEmitter';
import Rocket from '../units/Rocket';
import { clearUnits, updateUnitVisibility } from '../store/unitSlice';
import { RootState } from '../store/store';

const activeUnits = [Factory, FactoryEmitter, Rocket];

const useUpdatedRef = (val) => {
  const ref = useRef(val);
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref;
};

const ActiveUnits = () => {
    const dispatch = useDispatch();
  
    // Access the units state from Redux
    const units = useSelector((state: RootState) => state.units.units);
    const unitsRef = useUpdatedRef(units);

    useEffect(() => {
        const intervalId = setInterval(() => {
            unitsRef.current.forEach(unit => {
                if (!unit.isVisible) {
                    const requirementsMet = unit.requiredUnits.every(requiredUnit => {
                        const requiredUnitState = unitsRef.current.find(u => u.id === requiredUnit.unitId);
                        return requiredUnitState && requiredUnitState.quantity >= requiredUnit.quantity;
                    });

                    if (requirementsMet) {
                        dispatch(updateUnitVisibility(unit.id));
                    }
                }
            });
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [dispatch, unitsRef]);

    const visibleUnitsWithState = activeUnits.map(Unit => {
        // Find the corresponding unit in the Redux state
        const unitState = units.find(unit => unit.name === Unit.name);
        return { Unit, ...unitState };
    }).filter(unit => unit.isVisible);
    
    const sortedVisibleUnits = visibleUnitsWithState.sort((a, b) => a.id - b.id).map(unit => unit.Unit);
    
    return (
        <div>
            {sortedVisibleUnits.map((Unit, index) => <Unit key={index} />)}
            <button onClick={() => dispatch(clearUnits())}>Reset Game</button>
        </div>
    );
}

export default ActiveUnits;