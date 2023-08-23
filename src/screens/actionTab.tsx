import React from 'react';
import ActiveUnits from '../components/activeUnits';
import { View, StyleSheet } from 'react-native';

function ActionTab() {
  return (
    <View style={styles.container}>
      Some amazing units!
      <ActiveUnits />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', // Change this to your desired color
  },
});

export default ActionTab;