import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { RootState, persistor } from '../store/store';
import { styles } from './styles';
import { resetGame } from '../store/logSlice';
import FormattedNumber from './formattedNumber';

interface Log {
    id: number;
    message: string;
  }

  function ActiveLogs() {
    const dispatch = useDispatch();
    const logs = useSelector((state: RootState) => state.logs.logs);
    console.log('Logs:', logs);
  
    return (
      <View style={styles.resourceWrapper}>
        <Text style={styles.text}>Log</Text>
        {logs && logs.map((log: Log) => (
          <Text key={log.id} style={styles.text}>
            {log.message}
          </Text>
        ))}
        <button onClick={() => {
            persistor.purge().then(() => {
                dispatch(resetGame());
            });
            }}>Reset Log</button>
      </View>
    );
  }
  
  export default ActiveLogs;