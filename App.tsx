import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/store';
import ActionTab from './src/screens/actionTab';
import LogTab, { styles as logTabStyles } from './src/screens/logTab';
import { LogProvider } from './src/LogContext';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LogProvider>
          <SafeAreaView style={styles.container}>
          <View style={logTabStyles.container}>
              <LogTab />
            </View>
            <View style={styles.actionTab}>
              <ActionTab />
            </View>
          </SafeAreaView>
        </LogProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  actionTab: {
    flex: 9,
    backgroundColor: '#333333', // dark grey background color
  },
});
