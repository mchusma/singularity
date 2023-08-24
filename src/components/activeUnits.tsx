import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Factory from '../units/Factory';
import FactoryEmitter from '../units/FactoryEmitter';
import Rocket from '../units/Rocket';
import { resetGame, updateUnitVisibility } from '../store/unitSlice';
import { RootState, persistor } from '../store/store';
import { Unit } from '../store/unitSlice';

const activeUnits = [Factory, FactoryEmitter, Rocket];

const useUpdatedRef = (val: any) => {
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
            unitsRef.current.forEach((unit: Unit) => {
                if (!unit.isVisible) {
                    interface RequiredUnit {
                        unitId: number;
                        quantity: number;
                      }
                      const requirementsMet = unit.requiredUnits.every((requiredUnit: RequiredUnit) => {
                        const requiredUnitState = unitsRef.current.find((u: typeof unit) => u.id === requiredUnit.unitId);                        if (!requiredUnitState) {
                            console.error(`Required unit with id ${requiredUnit.unitId} not found`);
                        }
                        return requiredUnitState && requiredUnitState.quantity >= requiredUnit.quantity;
                    });

                    if (requirementsMet) {
                        dispatch(updateUnitVisibility(unit.id));
                    } else {
                        console.error(`Requirements not met for unit with id ${unit.id}`);
                    }
                }
            });
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [dispatch, unitsRef]);

    const visibleUnitsWithState = activeUnits.map(UnitComponent => {
        // Find the corresponding unit in the Redux state
        const unitState = units.find(unit => unit.name === UnitComponent.unitName);
        if (!unitState) {
            console.error(`Unit with name ${UnitComponent.unitName} not found in state`);
        }
        return { UnitComponent, ...unitState };
    }).filter(unit => unit.isVisible);
    
    const sortedVisibleUnits = visibleUnitsWithState.sort((a, b) => (a.id || 0) - (b.id || 0)).map(unit => unit.UnitComponent);    
    return (
        <div>
            {sortedVisibleUnits.map((Unit, index) => <Unit key={index} />)}
            <button onClick={() => {
                persistor.purge().then(() => {
                    dispatch(resetGame());
                });
                }}>Reset Game</button>
        </div>
    );
}

export default ActiveUnits;