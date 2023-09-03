import React, { useEffect, useRef } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [logs]);

  return (
    <ScrollView ref={scrollViewRef} style={styles.logTabContainer}>
      <ActiveLogs />
      <TouchableOpacity onPress={() => navigation.navigate("logFullScreen")}>
        {" "}
        <Ionicons name="expand" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logTabContainer: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

export default LogTab;
