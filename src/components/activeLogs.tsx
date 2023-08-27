import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { RootState, persistor } from '../store/store';
import { styles } from './styles';
import { resetGame, addMessage } from '../store/logSlice';  // Import the addMessage action

function ActiveLogs() {
  const dispatch = useDispatch();
  const scrollViewRef = React.useRef<ScrollView | null>(null);
  const logs = useSelector((state: RootState) => state.logs ? state.logs.logs : []);

  return (
    <View style={styles.logWrapper}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {logs?.map((log) => (
          <Text key={log.id} style={styles.text}>
            {log.message}
          </Text>
        ))}
      </ScrollView>
      <button onClick={() => {
        persistor.purge().then(() => {
          dispatch(resetGame());
        });
      }}>Reset Log</button>
    </View>
  );
}

export default ActiveLogs;
