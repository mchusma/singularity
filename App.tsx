import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [rocketsLaunched, setRocketsLaunched] = useState<number>(0);

  // Load the count from storage when the app loads
  useEffect(() => {
    const loadRocketsFromStorage = async () => {
      const storedCount = await AsyncStorage.getItem('rocketsLaunched');
      if (storedCount !== null) {
        setRocketsLaunched(Number(storedCount));
      }
    };
    loadRocketsFromStorage();
  }, []);

  const launchRocket = async () => {
    const newCount = rocketsLaunched + 1;
    setRocketsLaunched(newCount);
    await AsyncStorage.setItem('rocketsLaunched', String(newCount));
  };

  return (
    <View style={styles.container}>
      <Button title="Launch Rocket" onPress={launchRocket} />
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
