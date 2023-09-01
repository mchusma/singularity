import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Animated, Text, TouchableOpacity } from "react-native";
import { RootState } from "../store/store";
import { styles } from "../components/styles";
import { buildUnit } from "./components/buildUnit";
import ActiveUpgrades from "../components/activeUpgrades";

interface Unit {
  id: string;
  quantity: number;
  buttonState: string;
}

function Economy() {
  const dispatch = useDispatch();
  const unitId = "economy";
  const useBuildUnit = buildUnit("economy");
  
  const money = useSelector((state: RootState) =>
    state.resources.resources.find((res) => res.id === "money")
  );

  const unit = useSelector((state: RootState) => {
    return state.units?.units?.find((unit) => unit.id === unitId);
  });
  
  const resources = useSelector((state: RootState) => state.resources.resources);

  const hasEnoughResources = () => {
    if (!unit?.resourceCost) return "disabled";
  
    for (let cost of unit.resourceCost) {
      const resource = resources.find((res) => res.id === cost.resourceId);
      if (!resource || resource.quantity < cost.quantity) {
        return "disabled";
      }
    }
  
    return "enabled";
  };
  
  const buttonState = hasEnoughResources();

  const dotPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = () => {
      Animated.sequence([
        Animated.timing(dotPosition, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(dotPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(animateDot);
    };

    animateDot();
  }, []);

  const dotStyle = {
    transform: [
      {
        translateX: dotPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 100],
        }),
      },
    ],
  };

  return (
    <View style={styles.unitWrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Economy</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Space economy generates money, which is required for expansion. This
          takes available space capacity and sells it to the highest bidder.
        </Text>
        <Text style={styles.boldText}>Money: {money?.quantity}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {unit && Array.isArray(unit?.resourceCost) &&
            unit.resourceCost.map((resource, index) => (
              <Text key={index} style={styles.text}>
                Cost: {resource.quantity} {resource.resourceId}
              </Text>
            ))}
          <Animated.View style={[styles.dot, dotStyle]} />
          {unit && Array.isArray(unit?.resourceOutput) &&
            unit.resourceOutput.map((resource, index) => (
              <Text key={index} style={styles.text}>
                Output: {resource.quantity} {resource.resourceId}
              </Text>
            ))}
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            buttonState === "disabled" ? styles.disabledButton : styles.button
          }
          onPress={useBuildUnit}
          disabled={buttonState === "disabled"}
        >
          <Text style={styles.buttonText}>Sell Space Capacity</Text>
        </TouchableOpacity>
        </View>
        <ActiveUpgrades unitId="economy" />
      </View>
    </View>
  );
}

Economy.unitName = "Economy";

export default Economy;
