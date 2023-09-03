import React, { useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import ActiveLogs from '../components/activeLogs';
import { useNavigation } from '@react-navigation/native';
import { persistor } from "../store/store";
import { resetGame } from "../store/logSlice";

const LogFullScreen = () => {
    const dispatch = useDispatch();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const logs = useSelector((state: RootState) => state.logs.logs);
  const navigation = useNavigation();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [logs]);

  return (
    <ScrollView ref={scrollViewRef} style={styles.logTabContainer}>
      <ActiveLogs />
      <Button
        title="Reset Log"
        onPress={() => {
          persistor.purge().then(() => {
            dispatch(resetGame());
          });
        }}
      />
      <Button title="Close" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logTabContainer: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default LogFullScreen;