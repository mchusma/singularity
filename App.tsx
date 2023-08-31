import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store/store';
import ActionTab from './src/screens/actionTab';
import LogTab from './src/screens/logTab';

export default function App() {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [logTabHeight, setLogTabHeight] = useState(100);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [logTabHeight]);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{width: windowWidth, height: windowHeight}}>
          <TouchableOpacity onPress={() => setLogTabHeight(prevHeight => prevHeight === 100 ? 400 : 100)}>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}
              style={[styles.logTab, { height: logTabHeight, width: windowWidth }]}
            >
              <LogTab />
            </ScrollView>
          </TouchableOpacity>
          <View style={[styles.actionTab, {width: windowWidth}]}>
            <ActionTab />
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logTab: {
    height: 100,
  },
  actionTab: {
    backgroundColor: '#333333', 
  },
});