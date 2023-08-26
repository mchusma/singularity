import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity } from '../store/unitSlice';
import { styles } from '../components/styles'; 
import { buildUnit } from './components/buildUnit';
import ActiveUpgrades from '../components/activeUpgrades';
import FormattedNumber from '../components/formattedNumber';

interface Unit {
    id: string;
    quantity: number;
  }
  
  function Science() {
    const dispatch = useDispatch();
    const unitId = 'science'; 
    const science = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));

  return (
    <View style={styles.unitWrapper}>
        {science?.attributes?.map((attribute, index) => (
        <Text key={index} style={styles.text}>
          {`${attribute.name}: ${attribute.quantity * 100}%`}
        </Text>
        ))}
        <Text style={styles.text}>Science grows stuff</Text>
        <ActiveUpgrades unitId="science" />
    </View>
  );
}

Science.unitName = 'Science';

export default Science;