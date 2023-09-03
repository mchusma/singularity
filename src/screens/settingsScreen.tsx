import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const changeLanguage = () => {
    // Logic for changing language goes here
  };

  const resetGame = () => {
    // Logic for resetting game goes here
  };

  const tipUs = () => {
    // Logic for tipping goes here
  };

  return (
    <View>
      <Text>This game was made by 2 brothers, with love. We do this for fun, but would appreciate any support!</Text>
      <Button title="Change Language" onPress={changeLanguage} />
      <Button title="Reset Game" onPress={resetGame} />
      <Button title="Give a Tip" onPress={tipUs} />
      <Button title="Close" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SettingsScreen;