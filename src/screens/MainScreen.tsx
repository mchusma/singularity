import React from "react";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../src/store/store";
import ActionTab from "./actionTab";
import LogTab from "./logTab";

export default function MainScreen() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <View style={styles.outerContainer}>

        <SafeAreaView style={styles.container}>
          <View style={styles.logTab}>
            <LogTab />
          </View>
          <View style={styles.actionTab}>
            <ScrollView>
              <ActionTab />
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#282828',
  },
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