import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Economy from '../units/Economy';
import Human from '../units/Humans';
import Rocket from '../units/Rocket';
import Science from '../units/Science';
import Energy from '../units/Energy';
import { resetGame, updateUnitVisibility } from '../store/unitSlice';
import { RootState, persistor } from '../store/store';
import { Unit } from '../store/unitSlice';
import { View, Dimensions, Button } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const unitWidth = screenWidth >= 800 ? 400 : '100%';
const activeUnits = [Economy, Human, Rocket, Science, Energy];

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
                        unitId: string;
                        quantity: number;
                      }
                      const requirementsMet = unit.requiredUnits.every((requiredUnit: RequiredUnit) => {
                        const requiredUnitState = unitsRef.current.find((u: Unit) => u.id === requiredUnit.unitId);
                        if (!requiredUnitState) {
                          console.error(`Required unit with id ${requiredUnit.unitId} not found`);
                        }
                        return requiredUnitState && requiredUnitState.quantity >= requiredUnit.quantity;
                      });

                    if (requirementsMet) {
                        dispatch(updateUnitVisibility(unit.id));
                    } else {
                    }
                }
            });
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [dispatch, unitsRef]);

    const visibleUnitsWithState = activeUnits.map(UnitComponent => {
        const unitState = units.find(unit => unit.id === UnitComponent.name.toLowerCase());
        if (!unitState) {
            console.error(`Unit with id ${UnitComponent.name.toLowerCase()} not found in state`);
        }
        return { UnitComponent, ...unitState };
    }).filter(unit => unit.isVisible);
    
    const sortedVisibleUnits = visibleUnitsWithState.sort((a, b) => (a.order || 0) - (b.order || 0)).map(unit => unit.UnitComponent);    
    return (
        <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {sortedVisibleUnits.map((Unit, index) => (
                    <View style={{ width: unitWidth, margin: 10 }} key={index}>
                        <Unit />
                    </View>
                ))}
            </View>
            <Button title="Reset Log" onPress={() => {
                persistor.purge().then(() => {
                    dispatch(resetGame());
                });
            }}/>
        </View>
    );
}

export default ActiveUnits;