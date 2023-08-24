import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity } from '../store/unitSlice';
import { styles } from '../components/styles'; 

interface Unit {
    id: string;
    quantity: number;
  }
  
  function FactoryEmitter() {
    const dispatch = useDispatch();
    const unitId = 'factoryEmitter'; // Replace with the actual unit ID you're looking for
    const factoryEmittersBuilt = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));
  
    useEffect(() => {
      const intervalFactories = setInterval(() => {
        for (let i = 0; i < (factoryEmittersBuilt?.quantity || 0); i++) {
            dispatch(updateUnitQuantity({ unitId: 'factory', quantityChange: 1 }));
        }
      }, 10000);
  
      return () => {
        clearInterval(intervalFactories);
      };
    }, [factoryEmittersBuilt, dispatch]);
  

  return (
    <View style={styles.unitWrapper}>
      <View>
      <Text style={styles.text}>Factory Emitters Built: {factoryEmittersBuilt?.quantity || 0}</Text>        
        <Button title="Build Factory Emitter" onPress={() => dispatch(updateUnitQuantity({ unitId: 'factoryEmitter', quantityChange: 1 }))} />
      </View>
    </View>
  );
}

FactoryEmitter.unitName = 'FactoryEmitter';

export default FactoryEmitter;