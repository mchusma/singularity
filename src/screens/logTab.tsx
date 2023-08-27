import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActiveLogs from '../components/activeLogs';

function LogTab() {
  return (
    <View style={styles.container}>
      <ActiveLogs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  cursor: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default LogTab;