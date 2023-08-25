import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity } from '../store/unitSlice';
import { styles } from '../components/styles'; 
import { buildUnit } from './components/buildUnit';

interface Unit {
  id: string;
  quantity: number;
}

function Factory() {
  const dispatch = useDispatch();
  const unitId = 'factory'; 
  const unitQuantity = useSelector((state: RootState) => {
    const unit = state.units?.units?.find((unit) => unit.id === unitId);
    return unit ? unit.quantity : 0;
  });

  useEffect(() => {
    const intervalRockets = setInterval(() => {
      for (let i = 0; i < unitQuantity; i++) {
        dispatch(updateUnitQuantity({ unitId: 'rocket', quantityChange: 1 }));
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
        <Button title="Build Factory" onPress={buildUnit('factory')} />
      </View>
    </View>
  );
}

Factory.unitName = 'Factory';

export default Factory;