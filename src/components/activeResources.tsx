import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { RootState, persistor } from '../store/store';
import { styles } from './styles'; 
import { resetGame } from '../store/resourceSlice';
import FormattedNumber from './formattedNumber';

function ActiveResources() {
  const resources = useSelector((state: RootState) => state.resources.resources);
  const dispatch = useDispatch();

  return (
    <View style={styles.resourceWrapper}>
      {resources.map((resource) => (
        <Text key={resource.id} style={styles.text}>
          {resource.name}: <FormattedNumber value={resource.quantity} />
        </Text>
      ))}
      <Button title="Reset Resources" onPress={() => {
          persistor.purge().then(() => {
              dispatch(resetGame());
          });
      }}/>
    </View>
  );
}

export default ActiveResources;