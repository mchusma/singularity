import React, { useEffect, useRef } from "react";
import { Button, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateUpgradeVisibility } from "../store/unitSlice";
import { upgradeUnit } from "../units/components/upgradeUnit";
import { addMessage } from "../store/logSlice";

interface ActiveUpgradesProps {
  unitId: string;
}

const ActiveUpgrades: React.FC<ActiveUpgradesProps> = ({ unitId }) => {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) =>
    state.units.units.find((unit) => unit.id === unitId)
  );
  const upgrades = unit?.upgrades;
  const resources = useSelector((state: RootState) => state.resources);
  const allUnits = useSelector((state: RootState) => state.units);

  console.log("upgrades:", upgrades);

  useEffect(() => {
    const interval = setInterval(() => {
      upgrades?.forEach((upgrade) => {
        if (!upgrade.isVisible && !upgrade.isApplied) {
          //check if required units are met
          const requiredUnitsMet = upgrade.requiredUnits.every(
            (requiredUnit) => {
              const unit = allUnits.units.find(
                (unit) => unit.id === requiredUnit.unitId
              );
              return unit && unit.quantity >= requiredUnit.quantity;
            }
          );

          //check if required resources are met
          const requiredResourcesMet = upgrade.requiredResources.every(
            (requiredResource) => {
              const resource = resources.resources.find(
                (resource) => resource.id === requiredResource.unitId
              );
              return resource && resource.quantity >= requiredResource.quantity;
            }
          );

          if (requiredUnitsMet && requiredResourcesMet && unit) {
            console.log(`Upgrade ${upgrade.name} to be visible`);
            dispatch(
              updateUpgradeVisibility({
                unitId: unit.id,
                upgradeId: upgrade.id,
              })
            );
          }
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, upgrades, allUnits, resources]);

  console.log("upgrades:", upgrades);

  return (
    <View>
      {upgrades
        ? upgrades
            .filter((upgrade) => upgrade.isVisible && !upgrade.isApplied)
            .map((upgrade) => (
              <Button
                key={upgrade.id}
                title={`${upgrade.name} ${upgrade.description}`}
                onPress={() => {
                  console.log(
                    `Upgrade attempted. Unit ID: ${unit?.id}, Upgrade ID: ${upgrade.id}, isVisible: ${upgrade.isVisible}, isApplied: ${upgrade.isApplied}`
                  );
                  unit && upgradeUnit(unit, upgrade.id, dispatch);

                  dispatch(
                    addMessage({ id: Date.now(), message: upgrade.log_message })
                  );
                }}
              />
            ))
        : null}
    </View>
  );
};

export default ActiveUpgrades;
