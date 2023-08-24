import React from 'react';
import ActiveUnits from '../components/activeUnits';
import { View, Text, StyleSheet } from 'react-native';

function ActionTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Unit List</Text>      
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