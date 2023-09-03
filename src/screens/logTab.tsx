import React, { useEffect, useRef } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ActiveLogs from "../components/activeLogs";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const LogTab = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const logs = useSelector((state: RootState) => state.logs.logs);
  const navigation = useNavigation();

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(
        () => scrollViewRef.current?.scrollToEnd({ animated: true }),
        100
      );
    }
  }, [logs]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
        style={styles.logTabContainer}
      >
        <ActiveLogs />
      </ScrollView>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <Ionicons name="menu-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("logFullScreen")}
      >
        <Ionicons name="chevron-down-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logTabContainer: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#808080",
  },
  floatingButton: {
    position: "absolute",
    right: 10,
    bottom: 5,
  },
  settingsButton: {
    position: "absolute",
    right: 10,
    top: 5,
  },
});

export default LogTab;
