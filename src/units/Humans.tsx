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
  
  function Human() {
    const dispatch = useDispatch();
    const unitId = 'human'; 
    const humans = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));

  return (
    <View style={styles.unitWrapper}>
      <Text style={styles.text}>Humans: <FormattedNumber value={humans?.quantity || 0} /></Text>
      {humans?.attributes?.map((attribute, index) => (
        <Text key={index} style={styles.text}>
          {attribute.name}: <FormattedNumber value={attribute.quantity} />
        </Text>
      ))}
      <Text style={styles.text}>Humans grow with land, education, inspiratino, energy, lifespan, productive years</Text>
      <ActiveUpgrades unitId="human" />
    </View>
  );
}

Human.unitName = 'Human';

export default Human;