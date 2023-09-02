import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Text } from "react-native";
import { RootState } from "../store/store";
import { updateUnitQuantity, updateUnitLevel } from "../store/unitSlice";
import { updateResourceQuantity } from "../store/resourceSlice";
import { styles } from "../components/styles";
import { buildUnit } from "./components/buildUnit";
import ActiveUpgrades from "../components/activeUpgrades";

interface Unit {
  id: string;
  quantity: number;
  unitName: string;
}

function Rocket() {
  const dispatch = useDispatch();
  const unitId = "rocket";
  const rocketsBuilt = useSelector((state: RootState) =>
    state.units?.units?.find((unit) => unit.id === unitId)
  );
  const spaceCapacity = useSelector((state: RootState) =>
    state.resources.resources.find((res) => res.id === "spaceCapacity")
  );

  const useBuildUnit = buildUnit("rocket");

  return (
    <View style={styles.unitWrapper}>
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
          Costs:
          {rocketsBuilt?.resourceCost
            ? rocketsBuilt.resourceCost.map((resource, index) => (
                <Text key={index}>
                  {resource.resourceId}: {resource.quantity.toString()}
                  {index < rocketsBuilt.resourceCost.length - 1 ? ", " : ""}
                </Text>
              ))
            : null}
        </Text>
        <Text style={styles.text}>
          Outputs:
          {rocketsBuilt?.resourceOutput
            ? rocketsBuilt.resourceOutput.map((resource, index) => (
                <Text key={index}>
                  {resource.resourceId}: {resource.quantity.toString()}
                  {index < rocketsBuilt.resourceOutput.length - 1 ? ", " : ""}
                </Text>
              ))
            : null}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={`Build ${rocketsBuilt?.name}`}
          onPress={() => {
            useBuildUnit();
          }}
        />
      </View>
      <ActiveUpgrades unitId="rocket" />
    </View>
  );
}

Rocket.unitName = "Rocket";

export default Rocket;
