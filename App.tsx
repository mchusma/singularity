import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/store';
import ActionTab from './src/screens/actionTab';
import LogTab from './src/screens/logTab';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <View style={styles.logTab}>
            <LogTab />
          </View>
          <View style={styles.actionTab}>
            <ActionTab />
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  logTab: {
    flex: 1,
    backgroundColor: '#000000', // black background color
  },
  actionTab: {
    flex: 9,
    backgroundColor: '#333333', // dark grey background color
  },
});