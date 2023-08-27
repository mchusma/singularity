import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable } from 'react-native';
import { RootState, persistor } from '../store/store';
import { styles } from './styles';
import { resetGame } from '../store/resourceSlice';
import FormattedNumber from './formattedNumber';

function ActiveLogs() {
  const dispatch = useDispatch();
  const logs = useSelector((state: RootState) => state.logs ? state.logs.logs : []);
  
  return (
    <View style={styles.resourceWrapper}>
      {logs.map((log) => (
        <Text key={log.id} style={styles.text}>
          {log.name}: <FormattedNumber value={log.quantity} />
        </Text>
      ))}
      <Pressable style={styles.button} onPress={() => {
        persistor.purge().then(() => {
            dispatch(resetGame());
        });
      }}>
        <Text style={styles.buttonText}>Reset Log</Text>
      </Pressable>
    </View>
  );
}

export default ActiveLogs;