import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Animated, Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity } from '../store/unitSlice';
import { styles } from '../components/styles'; 
import { buildUnit } from './components/buildUnit';
import { updateResourceQuantity } from '../store/resourceSlice';
import ActiveUpgrades from '../components/activeUpgrades';

interface Unit {
  id: string;
  quantity: number;
}

function Economy() {
  const dispatch = useDispatch();
  const unitId = 'economy'; 

  const unit = useSelector((state: RootState) => {
    return state.units?.units?.find((unit) => unit.id === unitId);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      unit?.resourceCost.forEach(resource => {
        dispatch(updateResourceQuantity({ resourceId: resource.resourceId, quantityChange: -resource.quantity }));
      });
      unit?.resourceOutput.forEach(resource => {
        dispatch(updateResourceQuantity({ resourceId: resource.resourceId, quantityChange: resource.quantity }));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, unit]);

  const dotPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = () => {
      Animated.sequence([
        Animated.timing(dotPosition, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(dotPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(animateDot);
    };

    animateDot();
  }, []);

  const dotStyle = {
    transform: [
      {
        translateX: dotPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 100], // adjust this value to move the dot further
        }),
      },
    ],
  };

  return (
    <View style={styles.unitWrapper}>
      <View>
        <Text style={styles.text}>Economy running...</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {unit?.resourceCost.map((resource, index) => (
            <Text key={index} style={styles.text}>
              Cost: {resource.quantity} {resource.resourceId}
            </Text>
          ))}
          <Animated.View style={[styles.dot, dotStyle]} />
          {unit?.resourceOutput.map((resource, index) => (
            <Text key={index} style={styles.text}>
              Output: {resource.quantity} {resource.resourceId}
            </Text>
          ))}
        </View>
        <ActiveUpgrades unitId="economy" />
      </View>
    </View>
  );
}

Economy.unitName = 'Economy';

export default Economy;