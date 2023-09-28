import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../store/store";
import { styles } from "../components/styles";
import { buildUnit } from "./components/buildUnit";
import ActiveUpgrades from "../components/activeUpgrades";
import FormattedNumber from "../components/formattedNumber";
import AnimatedButton from "../components/animatedButton";
import UnitComponent from "../components/unitComponent";

interface Attribute {
  name: string;
  quantity: number;
}

interface Unit {
  id: string;
  quantity: number;
  attributes?: Attribute[];
}

function Human() {
  const dispatch = useDispatch();
  const unitId = "human";
  const humans = useSelector((state: RootState) =>
    state.units?.units?.find((unit) => unit.id === unitId)
  );
  const useBuildUnit = buildUnit(unitId);
  const resources = useSelector(
    (state: RootState) => state.resources.resources
  );

  const production = useSelector((state: RootState) =>
    state.resources.resources.find((resource) => resource.id === "production")
  );

  const unit = useSelector((state: RootState) => {
    return state.units?.units?.find((unit) => unit.id === unitId);
  });

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

  return (
    <UnitComponent
      headerText="Population"
      unitId={unitId}
      animateCounter={Math.random()}
      gradientColor="#0b525b"
      fadeOutDuration={3000}
    >
      <View>
        <Text style={styles.text}>
          Humans do stuff.
        </Text>
        <Text style={styles.boldText}>
          Production: {production?.quantity.toString()}
        </Text>
        <Text style={styles.text}>
          Costs:
          {humans?.resourceCost
            ? humans.resourceCost.map((resource, index) => (
                <Text key={index}>
                  {resource.resourceId}: {resource.quantity.toString()}
                  {index < humans.resourceCost.length - 1 ? ", " : ""}
                </Text>
              ))
            : null}
        </Text>
        <Text style={styles.text}>
          Outputs:
          {humans?.resourceOutput
            ? humans.resourceOutput.map((resource, index) => (
                <Text key={index}>
                  {resource.resourceId}: {resource.quantity.toString()}
                  {index < humans.resourceOutput.length - 1 ? ", " : ""}
                </Text>
              ))
            : null}
        </Text>
      </View>
      <AnimatedButton
        buttonText="Be Productive"
        onPress={useBuildUnit}
        disabled={buttonState === "disabled"}
        unitId={unitId}
      />
      <ActiveUpgrades unitId="human" />
    </UnitComponent>
  );
}

Human.unitName = "Human";

export default Human;
