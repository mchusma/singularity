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
  
  function Energy() {
    const dispatch = useDispatch();
    const unitId = 'energy'; 
    const energy = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));

  return (
    <View style={styles.unitWrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Energy</Text>
      </View>
      <Text style={styles.text}>Energy is used for building things, computation, and more.</Text>
        {energy?.attributes?.map((attribute, index) => (
        <Text key={index} style={styles.text}>
          {`${attribute.name}: ${attribute.quantity}`}PWh
        </Text>
        ))}
        <ActiveUpgrades unitId="energy" />
    </View>
  );
}

Energy.unitName = 'Energy';

export default Energy;