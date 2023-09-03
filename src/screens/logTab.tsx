import React, { useEffect, useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ActiveLogs from '../components/activeLogs';

const LogTab = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const logs = useSelector((state: RootState) => state.logs.logs);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [logs]);

  return (
    <ScrollView ref={scrollViewRef} style={styles.logTabContainer}>
      <ActiveLogs />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logTabContainer: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default LogTab;