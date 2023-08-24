import React from 'react';
import ActiveUnits from '../components/activeUnits';
import ActiveResources from '../components/activeResources';
import { View, StyleSheet } from 'react-native';

function ActionTab() {
  return (
    <View style={styles.container}>
      <ActiveResources />
      <ActiveUnits />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', 
  },
  text: {
    color: '#FFFFFF', 
  },
});

export default ActionTab;