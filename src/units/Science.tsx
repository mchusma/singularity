import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Text } from "react-native";
import { RootState } from "../store/store";
import { updateAttributeQuantity } from "../store/unitSlice";
import { styles } from "../components/styles";
import { buildUnit } from "./components/buildUnit";
import ActiveUpgrades from "../components/activeUpgrades";
import FormattedNumber from "../components/formattedNumber";
import AnimatedButton from "../components/animatedButton";
import { updateResourceQuantity } from "../store/resourceSlice";
import UnitComponent from "../components/unitComponent";

interface Unit {
  id: string;
  quantity: number;
}

interface Attribute {
  name: string;
  quantity: number;
}

interface ScienceProps {
  unitName?: string;
}

const Science: React.FC<ScienceProps> & { unitName?: string } = () => {
  const dispatch = useDispatch();
  const unitId = "science";
  const science = useSelector((state: RootState) =>
    state.units?.units?.find((unit) => unit.id === unitId)
  );
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null
  );
  const [finalSelectedAttribute, setFinalSelectedAttribute] =
    useState<Attribute | null>(null);
  const [isRouletteMode, setIsRouletteMode] = useState<boolean>(true);
  const selectedIndex = selectedAttribute
    ? science?.attributes?.indexOf(selectedAttribute)
    : -1;

  const tryScience = () => {
    setSelectedAttribute(null);
    setIsRouletteMode(true);
  };

  // Select the resource from the Redux store
  const resource = useSelector((state: RootState) =>
    state.resources?.resources?.find(
      (resource) => resource.id === selectedAttribute?.name
    )
  );

  useEffect(() => {
    // Check if the resource and attribute exist
    if (resource && selectedAttribute) {
      // Dispatch the updateAttributeQuantity action
      if (science) {
        dispatch(
          updateAttributeQuantity({
            unitId: science.id,
            attributeName: selectedAttribute.name,
            quantityChange: resource.quantity - selectedAttribute.quantity,
          })
        );
      }
    }
  }, [resource, selectedAttribute]);

  useEffect(() => {
    if (finalSelectedAttribute) {
      // Use the attribute name as the resource id
      const resourceId = finalSelectedAttribute.name;
      console.log(`Science Selected attribute: ${resourceId}`); // Log the selected attribute

      // Dispatch the updateResourceQuantity action
      dispatch(updateResourceQuantity({ resourceId, quantityChange: 2 }));
    } else {
      console.log("No attribute selected."); // Log when no attribute is selected
    }
  }, [finalSelectedAttribute]);

  // Cycle through attributes when in roulette mode
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRouletteMode) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(
          Math.random() * (science?.attributes?.length || 0)
        );
        setSelectedAttribute(
          science?.attributes ? science.attributes[randomIndex] : null
        );
      }, 100);

      // After 3 seconds, select an attribute and disable roulette mode
      setTimeout(() => {
        setIsRouletteMode(false);
        clearInterval(intervalId);
        if (selectedAttribute) {
          setFinalSelectedAttribute(selectedAttribute);
        }
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [isRouletteMode, science]);

  return (
    <UnitComponent
      headerText="Science"
      unitId={unitId}
      animateCounter={Math.random()}
      gradientColor="#2d0065"
    >
      <Text style={styles.text}>Science expands upgrade options.</Text>
      {science?.attributes?.map((attribute, index) => (
        <View key={index} style={styles.row}>
          {index === selectedIndex ? (
            <View style={styles.dot} />
          ) : (
            <View style={styles.dotPlaceholder} />
          )}
          <Text style={styles.text}>
            {`${attribute.name}: ${attribute.quantity.toString()} ${
              !isRouletteMode && attribute.name === selectedAttribute?.name
                ? "(Selected)"
                : ""
            }`}{" "}
          </Text>
        </View>
      ))}
      <AnimatedButton
        buttonText="Try Science"
        onPress={tryScience}
        disabled={isRouletteMode}
        unitId={unitId}
      />
      <ActiveUpgrades unitId="science" />
    </UnitComponent>
  );
};

Science.unitName = "Science";

export default Science;
