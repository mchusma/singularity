import React from "react";
import ActiveUnits from "../components/activeUnits";
import ActiveResources from "../components/activeResources";
import { View, StyleSheet } from "react-native";

function ActionTab() {
  return (
    <View style={styles.actionTabContainer}>
      <ActiveUnits />
      <ActiveResources />
    </View>
  );
}

const styles = StyleSheet.create({
  actionTabContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#25292e",
  },
});

export default ActionTab;
