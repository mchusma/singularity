import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { RootState } from "../store/store";
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
    <UnitComponent unitId={unitId} animateCounter={Math.random()}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Energy</Text>
      </View>
      <Text style={styles.text}>
        Energy is used for building things, computation, and more.
      </Text>
      {energy?.attributes?.map((attribute, index) => (
        <Text key={index} style={styles.text}>
          {`${attribute.name}: ${
            attribute.quantity ? attribute.quantity.toString() : ""
          } PWh`}{" "}
        </Text>
      ))}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <AnimatedButton
        buttonText="Build Power Plant"
        onPress={() => {
          if (selectedAttribute && energy) {
            dispatch(
              updateAttributeQuantity({
                unitId: energy.id,
                attributeName: selectedAttribute,
                quantityChange: 1,
              })
            );
          }
        }}
        disabled={buttonState === "disabled"}
        unitId={unitId}
      />
      <ActiveUpgrades unitId="energy" />
    </UnitComponent>
  );
}

Energy.unitName = "Energy";

export default Energy;
