import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { launchRocket, setRocketsLaunched } from '../store/rocketsSlice';
import { RootState } from '../store/store';

function ActionTab() {
  const dispatch = useDispatch();
  const rocketsLaunched = useSelector((state: RootState) => state.rockets.launched);

  const initialRocketsLaunched = 0;

  const handleLaunchRocket = () => {
    dispatch(launchRocket());
  };

  return (
    <View style={styles.container}>
      <Button title="Launch Rocket" onPress={handleLaunchRocket} />
      <Text style={{ color: '#fff', marginTop: 20 }}>Rockets Launched: {rocketsLaunched}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActionTab;
