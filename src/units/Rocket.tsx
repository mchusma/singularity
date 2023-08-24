import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button,Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity } from '../store/unitSlice';
import { styles } from '../components/styles'; 

interface Unit {
  id: number;
  quantity: number;
}

function Rocket() {
  const dispatch = useDispatch();
  const unitId = 1;
  const rocketsBuilt = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));

  return (
    <View style={styles.unitWrapper}>
      <Text style={styles.text}>Rockets Built: {rocketsBuilt?.quantity || 0}</Text>        
      <View style={styles.buttonContainer}>
        <Button title="Build Rocket" onPress={() => dispatch(updateUnitQuantity({ unitId: 1, quantityChange: 1 }))} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Launch Rocket" onPress={() => dispatch(updateUnitQuantity({ unitId: 1, quantityChange: -1 }))} />
      </View>
    </View>
  );
}

Rocket.unitName = 'Rocket';

export default Rocket;