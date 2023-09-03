import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../../src/store/store";
import ActionTab from "./actionTab";
import LogTab from "./logTab";

export default function MainScreen() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <View style={styles.logTab}>
            <LogTab />
          </View>
          <View style={styles.actionTab}>
            <ScrollView>
              <ActionTab />
            </ScrollView>
          </View>
        </View>
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