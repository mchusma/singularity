import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Text } from "react-native";
import { RootState } from "../store/store";
import { updateUnitQuantity } from "../store/unitSlice";
import { styles } from "../components/styles";
import { buildUnit } from "./components/buildUnit";
import ActiveUpgrades from "../components/activeUpgrades";
import FormattedNumber from "../components/formattedNumber";
import AnimatedButton from "../components/animatedButton";
import { updateResourceQuantity } from "../store/resourceSlice";

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
  const [isRouletteMode, setIsRouletteMode] = useState<boolean>(true);
  const selectedIndex = selectedAttribute
    ? science?.attributes?.indexOf(selectedAttribute)
    : -1;

  const tryScience = () => {
    setSelectedAttribute(null);
    setIsRouletteMode(true);

    if (selectedAttribute) {
      // Use the attribute name as the resource id
      const resourceId = selectedAttribute.name;
      console.log(`Science Selected attribute: ${resourceId}`); // Log the selected attribute

      // Dispatch the updateResourceQuantity action
      dispatch(updateResourceQuantity({ resourceId, quantityChange: 2 }));
    } else {
      console.log("No attribute selected."); // Log when no attribute is selected
    }
  };

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

      // After 5 seconds, select an attribute and disable roulette mode
      setTimeout(() => {
        setIsRouletteMode(false);
        clearInterval(intervalId);
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [isRouletteMode, science]);

  return (
    <View style={styles.unitWrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Science</Text>
      </View>
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
      />
      <ActiveUpgrades unitId="science" />
    </View>
  );
};

Science.unitName = "Science";

export default Science;
