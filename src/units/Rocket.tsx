import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../store/store";
import { styles } from "../components/styles";
import { buildUnit } from "./components/buildUnit";
import ActiveUpgrades from "../components/activeUpgrades";
import AnimatedButton from "../components/animatedButton";
import UnitComponent from "../components/unitComponent";

function Rocket() {
  const unitId = "rocket";
  const useBuildUnit = buildUnit(unitId);
  const rocketsBuilt = useSelector((state: RootState) =>
    state.units?.units?.find((unit) => unit.id === unitId)
  );
  const spaceCapacity = useSelector((state: RootState) =>
    state.resources.resources.find((res) => res.id === "spaceCapacity")
  );
  const resources = useSelector(
    (state: RootState) => state.resources.resources
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
    <UnitComponent unitId={unitId} animateCounter={Math.random()}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Space</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Space is ultimately required to get more land, resources, and
          ultimately expand humanity. Outputs tonsInSpace and spaceCapacity
        </Text>
        <Text style={styles.boldText}>
          Space Capacity: {spaceCapacity?.quantity.toString()}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.subheader}>Costs:</Text>
          <Text>{'\n'}</Text>
          {rocketsBuilt?.resourceCost
            ? rocketsBuilt.resourceCost.map((resource, index) => (
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
          {rocketsBuilt?.resourceOutput
            ? rocketsBuilt.resourceOutput.map((resource, index) => (
              <>
                <Text key={index} style={styles.listItem}>
                {resource.name}: {resource.quantity.toString()}
                </Text>
                <Text>{'\n'}</Text>
              </>
            ))
            : null}
        </Text>
      </View>
      <AnimatedButton
        buttonText={`Build ${rocketsBuilt?.name}`}
        onPress={useBuildUnit}
        disabled={buttonState === "disabled"}
        unitId={unitId}
      />
      <ActiveUpgrades unitId="rocket" />
    </UnitComponent>
  );
}

Rocket.unitName = "Rocket";

export default Rocket;
