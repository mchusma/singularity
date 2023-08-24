import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button,Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity } from '../store/unitSlice';
import { updateResourceQuantity } from '../store/resourceSlice';
import { styles } from '../components/styles'; 

interface Unit {
  id: string;
  quantity: number;
}

function Rocket() {
  const dispatch = useDispatch();
  const unitId = 'rocket';
  const rocketsBuilt = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));
  const tonsInSpace = useSelector((state: RootState) => state.resources.resources.find(res => res.id === 'tonsInSpace'));

  return (
    <View style={styles.unitWrapper}>
      <Text style={styles.text}>Rockets Built: {rocketsBuilt?.quantity || 0}</Text>  
      <Text style={styles.text}>Tons in Space: {tonsInSpace?.quantity || 0}</Text>      
      <View style={styles.buttonContainer}>
        <Button 
          title="Build Rocket" 
          onPress={() => {
            dispatch(updateUnitQuantity({ unitId: 'rocket', quantityChange: 1 }));
            dispatch(updateResourceQuantity({ resourceId: 'money', quantityChange: -100 }));
          }} 
        />      
      </View>
      <View style={styles.buttonContainer}>
      <Button 
        title="Launch Rocket" 
        onPress={() => {
          dispatch(updateUnitQuantity({ unitId: 'rocket', quantityChange: -1 }));
          dispatch(updateResourceQuantity({ resourceId: 'tonsInSpace', quantityChange: 1 }));
          dispatch(updateResourceQuantity({ resourceId: 'money', quantityChange: 200 }));
        }} 
      />   
      </View>
    </View>
  );
}

Rocket.unitName = 'Rocket';

export default Rocket;