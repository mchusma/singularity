import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { RootState } from "../store/store";
import { buildUnit } from "./components/buildUnit";

import { updateAttributeQuantity } from "../store/unitSlice";
import { styles } from "../components/styles";
import ActiveUpgrades from "../components/activeUpgrades";
import DropDownPicker from "react-native-dropdown-picker";
import AnimatedButton from "../components/animatedButton";
import UnitComponent from "../components/unitComponent";

interface Unit {
  id: string;
  quantity: number;
  buttonState: string;
}

function Energy() {
  const dispatch = useDispatch();
  const unitId = "energy";

  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );
  const energy = useSelector((state: RootState) =>
    state.units?.units?.find((unit) => unit.id === unitId)
  );
  const energyResource = useSelector((state: RootState) =>
    state.resources.resources.find((resource) => resource.id === "energy")
  );
  const useBuildUnit = buildUnit(unitId);

  const [selectedAttribute, setSelectedAttribute] = React.useState(
    energy?.attributes[0]?.name
  );
  const unit = useSelector((state: RootState) => {
    return state.units?.units?.find((unit) => unit.id === unitId);
  });
  const hasEnoughResources = () => {
    if (!energy?.resourceCost) return "disabled";
    for (let cost of energy.resourceCost) {
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = React.useState(
    energy?.attributes?.map((attribute) => ({
      label: attribute.name,
      value: attribute.name,
    })) || []
  );

  useEffect(() => {
    setItems(
      energy?.attributes?.map((attribute) => ({
        label: attribute.name,
        value: attribute.name,
      })) || []
    );
  }, [energy]);

  return (
    <UnitComponent
      headerText="Energy"
      unitId={unitId}
      animateCounter={Math.random()}
      gradientColor="#00406c"
    >
      <View>
        <Text style={styles.text}>Energy does stuff.</Text>
        <Text style={styles.boldText}>
          Energy: {energyResource?.quantity.toString()}
        </Text>
        <Text style={styles.text}>
          Costs:
          {energy?.resourceCost
            ? energy.resourceCost.map((resource, index) => (
                <Text key={index}>
                  {resource.resourceId}: {resource.quantity.toString()}
                  {index < energy.resourceCost.length - 1 ? ", " : ""}
                </Text>
              ))
            : null}
        </Text>
        <Text style={styles.text}>
          Outputs:
          {energy?.resourceOutput
            ? energy.resourceOutput.map((resource, index) => (
                <Text key={index}>
                  {resource.resourceId}: {resource.quantity.toString()}
                  {index < energy.resourceOutput.length - 1 ? ", " : ""}
                </Text>
              ))
            : null}
        </Text>
      </View>
      <AnimatedButton
        buttonText="Energize"
        onPress={useBuildUnit}
        disabled={buttonState === "disabled"}
        unitId={unitId}
      />
      <ActiveUpgrades unitId="energy" />
    </UnitComponent>
  );
}

Energy.unitName = "Energy";

export default Energy;
