import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ActiveUnits from "../components/activeUnits";
import ActiveResources from "../components/activeResources";
import StarField from "../components/starfield";

function ActionTab() {
  return (
    <View style={styles.actionTabContainer}>
      <View style={styles.starFieldContainer}>
        <StarField />
      </View>
      <ScrollView style={styles.content}>
        <ActiveUnits />
        <ActiveResources />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionTabContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#25292e",
  },
  starFieldContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
});

export default ActionTab;