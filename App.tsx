import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActionTab from './src/screens/ActionTab';
import LogTab from './src/screens/LogTab';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Action" component={ActionTab} />
        <Tab.Screen name="Log" component={LogTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
