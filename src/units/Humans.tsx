import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity } from '../store/unitSlice';
import { updateResourceQuantity } from '../store/resourceSlice';
import { styles } from '../components/styles';
import { buildUnit } from './components/buildUnit';
import ActiveUpgrades from '../components/activeUpgrades';
import FormattedNumber from '../components/formattedNumber';

interface Attribute {
  name: string;
  quantity: number;
}

interface Unit {
  id: string;
  quantity: number;
  attributes?: Attribute[]; 
}

  function Human() {
    const dispatch = useDispatch();
    const unitId = 'human';
    const humans = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));

    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(updateResourceQuantity({ resourceId: 'productionCapacity', quantityChange: 1 }));
      }, 1000);
  
      return () => clearInterval(interval);
    }, [dispatch]);

  return (
    <View style={styles.unitWrapper}>
      <Text style={styles.text}>Humans: <FormattedNumber value={humans?.quantity || 0} /></Text>
      {humans?.attributes?.map((attribute, index) => (
        <Text key={index} style={styles.text}>
          {attribute.name}: <FormattedNumber value={attribute.quantity} />
        </Text>
      ))}
      <Text style={styles.text}>adds production capacity - needed for building stuff and research.</Text>
      <Text style={styles.text}>Population growth rate (1.1% currently) - Humans growth rate grows in proportion to land, inspiration, energy, lifespan. Decreases with education.</Text>
      <Text style={styles.text}>% productive - Increases with lifespan and education.</Text>
      <ActiveUpgrades unitId="human" />
    </View>
  );
}

Human.unitName = 'Human';

export default Human;
