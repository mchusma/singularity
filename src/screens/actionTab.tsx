import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slider } from 'react-native-elements';

function ActionTab() {
  const [rocketsLaunched, setRocketsLaunched] = useState(0);
  const [lunarLandings, setLunarLandings] = useState(0);

  // Load the count from storage when the app loads
  useEffect(() => {
    const loadRocketsFromStorage = async () => {
      const storedCount = await AsyncStorage.getItem('rocketsLaunched');
      if (storedCount !== null) {
        setRocketsLaunched(Number(storedCount));
      }
    };
    loadRocketsFromStorage();
    
    const loadLunarLandings = async () => {
      const storedCount = await AsyncStorage.getItem('lunarLandings');
      if (storedCount !== null) {
        setLunarLandings(Number(storedCount));
      }
    };
    loadLunarLandings();
  }, []);


  const launchRocket = async () => {
    const newRocketsLaunchedCount = rocketsLaunched + 1;
    setRocketsLaunched(newRocketsLaunchedCount);
    await AsyncStorage.setItem('rocketsLaunched', String(newRocketsLaunchedCount));
  };

  const launchLunarLandings = async () => {
    const newLunarLandingsCount = lunarLandings + 1;
    setLunarLandings(newLunarLandingsCount);
    await AsyncStorage.setItem('lunarLandings', String(newLunarLandingsCount));
  };

  return (
    <View style={styles.container}>
      <Button title="Launch Rocket" onPress={launchRocket} />
      <Text style={{ color: '#fff', marginTop: 20 }}>Rockets Launched: {rocketsLaunched}</Text>
      {rocketsLaunched >= 55 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#fff' }}>Lunar Landing</Text>
          <Slider
            style={{ height: 200, marginTop: 10 }}
            orientation="vertical"
            disabled={rocketsLaunched < 60}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
            step={1}
            value={0}
            onValueChange={(value) => console.log(value)}
            onSlidingComplete={launchLunarLandings}
          />
          <Text style={{ color: '#fff', marginTop: 10 }}>Launch Lunar Landing: {lunarLandings}</Text>
        </View>
      )}
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
