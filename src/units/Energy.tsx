import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RootState } from "../store/store";
import { updateAttributeQuantity } from "../store/unitSlice";
import { styles } from "../components/styles";
import { buildUnit } from "./components/buildUnit";
import ActiveUpgrades from "../components/activeUpgrades";
import FormattedNumber from "../components/formattedNumber";

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
  const buttonState = hasEnoughResources();

  return (
    <View style={styles.unitWrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Energy</Text>
      </View>
      <Text style={styles.text}>
        Energy is used for building things, computation, and more.
      </Text>
      {energy?.attributes?.map((attribute, index) => (
        <Text key={index} style={styles.text}>
          {`${attribute.name}: ${attribute.quantity}`}PWh
        </Text>
      ))}
      <Picker
        selectedValue={selectedAttribute}
        onValueChange={(itemValue: string, itemIndex: number) =>
          setSelectedAttribute(itemValue)
        }
      >
        {energy?.attributes?.map((attribute, index) => (
          <Picker.Item
            key={index}
            label={attribute.name}
            value={attribute.name}
          />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            buttonState === "disabled" ? styles.disabledButton : styles.button
          }
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
        >
          <Text style={styles.buttonText}>Build </Text>
        </TouchableOpacity>
      </View>
      <ActiveUpgrades unitId="energy" />
    </View>
  );
}

Energy.unitName = "Energy";

export default Energy;
