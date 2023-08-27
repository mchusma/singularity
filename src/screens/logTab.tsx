import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActiveLogs from '../components/activeLogs';

function LogTab() {
  console.log(ActiveLogs);
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
    height: 200,
  },
  logWrapper: {
    flex: 1,
    position: 'relative', // Make sure the container has a relative position
    // ... other styles ...
  },
  button: {
    position: 'absolute', // Set button to absolute position
    bottom: 10,            // 10 pixels from the bottom
    right: 10,             // 10 pixels from the right
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000000',
  },
});

export default LogTab;
export { styles };
