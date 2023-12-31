import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Animated, Text } from "react-native";
import { RootState } from "../store/store";
import { styles } from "../components/styles";
import { buildUnit } from "./components/buildUnit";
import ActiveUpgrades from "../components/activeUpgrades";
import AnimatedButton from "../components/animatedButton";
import UnitComponent from "../components/unitComponent";

interface Unit {
  id: string;
  quantity: number;
  buttonState: string;
}

function Economy() {
  const dispatch = useDispatch();
  const unitId = "economy";
  const useBuildUnit = buildUnit(unitId);

  const money = useSelector((state: RootState) =>
    state.resources.resources.find((res) => res.id === "money")
  );

  const unit = useSelector((state: RootState) => {
    return state.units?.units?.find((unit) => unit.id === unitId);
  });

  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );

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

  const [buttonState, setButtonState] = React.useState(hasEnoughResources());

  React.useEffect(() => {
    setButtonState(hasEnoughResources());
  }, [unit, resources]);

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
    <UnitComponent unitId={unitId} animateCounter={Math.random()}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Economy</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Space economy generates money, which is required for expansion. This
          takes available space capacity and sells it to the highest bidder.
        </Text>
        <Text style={styles.boldText}>Money: ${money?.quantity}</Text>
        <Text style={styles.text}>
          <Text style={styles.subheader}>Costs:</Text>
          <Text>{'\n'}</Text>
          {unit?.resourceCost
            ? unit.resourceCost.map((resource, index) => (
              <>
                <Text key={index} style={styles.listItem}>
                  {resource.name}: {resource.quantity.toString()}
                </Text>
                <Text>{'\n'}</Text>
              </>
            ))
            : null}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.subheader}>Outputs:</Text>
          <Text>{'\n'}</Text>
          {unit?.resourceOutput
            ? unit.resourceOutput.map((resource, index) => (
              <>
                <Text key={index} style={styles.listItem}>
                  {resource.name}: {resource.quantity.toString()}
                </Text>
                <Text>{'\n'}</Text>
              </>
            ))
            : null}
        </Text>
        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          {unit && Array.isArray(unit?.resourceCost)
            ? unit.resourceCost.map((resource, index) => (
              <Text key={index} style={styles.text}>
                Cost: {resource.quantity.toString()} {resource.name}
              </Text>
            ))
            : null}
          <Animated.View style={[styles.dot, dotStyle]} />
          {unit && Array.isArray(unit?.resourceOutput)
            ? unit.resourceOutput.map((resource, index) => (
              <Text key={index} style={styles.text}>
                Output: {resource.quantity.toString()} {resource.name}
              </Text>
            ))
            : null}
        </View> */}
        <AnimatedButton
          buttonText="Sell Space Capacity"
          onPress={useBuildUnit}
          disabled={buttonState === "disabled"}
          unitId={unitId}
        />
        <ActiveUpgrades unitId="economy" />
      </View>
    </UnitComponent>
  );
}

Economy.unitName = "Economy";

export default Economy;
