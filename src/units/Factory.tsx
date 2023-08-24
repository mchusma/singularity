import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity } from '../store/unitSlice';
import { styles } from '../components/styles'; 

interface Unit {
  id: number;
  quantity: number;
}

function Factory() {
  const dispatch = useDispatch();
  const unitId = 2; // Replace with the actual unit ID you're looking for
  const unitQuantity = useSelector((state: RootState) => {
    const unit = state.units?.units?.find((unit) => unit.id === unitId);
    return unit ? unit.quantity : 0;
  });
//  const factoriesBuilt = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));

  useEffect(() => {
    const intervalRockets = setInterval(() => {
      for (let i = 0; i < unitQuantity; i++) {
        dispatch(updateUnitQuantity({ unitId: 1, quantityChange: 1 }));
      }
    }, 1000);

    return () => {
      clearInterval(intervalRockets);
    };
  }, [unitQuantity, dispatch]);

  return (
    <View style={styles.unitWrapper}> 
      <View>
        <Text style={styles.text}>Factories Built: {unitQuantity}</Text>        
        <Button title="Build Factory" onPress={() => dispatch(updateUnitQuantity({ unitId: 2, quantityChange: 1 }))} />
      </View>
    </View>
  );
}

Factory.unitName = 'Factory';

export default Factory;