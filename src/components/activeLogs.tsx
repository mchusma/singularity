import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { RootState } from '../store/store';
import { styles } from './styles';

function ActiveLogs() {
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
    </View>
  );
}

export default ActiveLogs;
