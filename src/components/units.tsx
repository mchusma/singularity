import React, { useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchRocket, buildFactory, buildFactoryEmitter } from '../store/unitSlice';
import { RootState } from '../store/store';

function Units() {
  const dispatch = useDispatch();
  const rocketsLaunched = useSelector((state: RootState) => state.units.rocketsLaunched);
  const factoriesBuilt = useSelector((state: RootState) => state.units.factoriesBuilt);
  const factoryEmittersBuilt = useSelector((state: RootState) => state.units.factoryEmittersBuilt);

  useEffect(() => {
    // Set an interval to dispatch launchRocket action for each factory every second
    const intervalRockets = setInterval(() => {
      for (let i = 0; i < factoriesBuilt; i++) {
        dispatch(launchRocket());
      }
    }, 1000);

    return () => {
      clearInterval(intervalRockets);
    };
  }, [factoriesBuilt, dispatch]);

  useEffect(() => {
    // Set an interval to dispatch buildFactory action for each factory emitter every 10 seconds
    const intervalFactories = setInterval(() => {
      for (let i = 0; i < factoryEmittersBuilt; i++) {
        dispatch(buildFactory());
      }
    }, 10000);

    return () => {
      clearInterval(intervalFactories);
    };
  }, [factoryEmittersBuilt, dispatch]);

  return (
    <View style={styles.container}>
      <Button title="Launch Rocket" onPress={() => dispatch(launchRocket())} />
      <Text style={{ color: '#fff', marginTop: 20 }}>Rockets Launched: {rocketsLaunched}</Text>
      <Button title="Build Factory" onPress={() => dispatch(buildFactory())} />
      <Text style={{ color: '#fff', marginTop: 20 }}>Factories Built: {factoriesBuilt}</Text>
      <Button title="Build Factory Emitter" onPress={() => dispatch(buildFactoryEmitter())} />
      <Text style={{ color: '#fff', marginTop: 20 }}>Factory Emitters Built: {factoryEmittersBuilt}</Text>
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

export default Units;
