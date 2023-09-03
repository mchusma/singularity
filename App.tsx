import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/store/store";
import ActionTab from "./src/screens/actionTab";
import LogTab from "./src/screens/logTab";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import MainScreen from "./src/screens/MainScreen"; // import the MainScreen component
import logFullScreen from "./src/screens/logFullScreen"; // import the LogFullScreen component

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="logFullScreen" component={logFullScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logTab: {
    flex: 1,
    maxHeight: 200,
  },
  actionTab: {
    flex: 9,
  },
});
