import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button,Text } from 'react-native';
import { RootState } from '../store/store';
import { updateUnitQuantity, updateUnitLevel } from '../store/unitSlice';
import { updateResourceQuantity } from '../store/resourceSlice';
import { styles } from '../components/styles';
import { buildUnit } from './components/buildUnit';
import ActiveUpgrades from '../components/activeUpgrades';

interface Unit {
  id: string;
  quantity: number;
  unitName: string;
}

function Rocket() {
  const dispatch = useDispatch();
  const unitId = 'rocket';
  const rocketsBuilt = useSelector((state: RootState) => state.units?.units?.find((unit) => unit.id === unitId));
  const tonsInSpace = useSelector((state: RootState) => state.resources.resources.find(res => res.id === 'tonsInSpace'));
  const money = useSelector((state: RootState) => state.resources.resources.find(res => res.id === 'money'));
  const useBuildUnit = buildUnit('rocket');

  return (
    <View style={styles.unitWrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Space</Text>
      </View>
    <Text style={styles.text}>Space is ultimately required to get more land, resources, and ultimately expand humanity.</Text>
    <Text style={styles.text}>Resources Required:</Text>
    {rocketsBuilt?.resourceCost.map((resource, index) => (
      <Text key={index} style={styles.text}>
        {resource.resourceId}: {resource.quantity}
      </Text>
    ))}

    <Text style={styles.text}>Outputs:</Text>
    {rocketsBuilt?.resourceOutput.map((resource, index) => (
      <Text key={index} style={styles.text}>
        {resource.resourceId}: {resource.quantity}
      </Text>
    ))}
      <Text style={styles.text}>Rocket Level: {rocketsBuilt?.level || 0} | Cost: ${rocketsBuilt?.levelCost || 0}</Text>
      <View style={styles.buttonContainer}>
      <Button
  title={`Build ${rocketsBuilt?.name}`}
  onPress={() => {
    useBuildUnit();
  }}
/>

      </View>

      <View style={styles.buttonContainer}>
      <Button
        title="Upgrade Rocket"
        disabled={(money?.quantity || 0) < (rocketsBuilt?.levelCost || 0)}
        onPress={() => {
          if (rocketsBuilt && 'levelCost' in rocketsBuilt && money && money.quantity >= rocketsBuilt.levelCost) {
            dispatch(updateUnitLevel({ unitId: 'rocket', levelChange: 1, levelCostChange: rocketsBuilt?.levelCost * 2 }));
            dispatch(updateResourceQuantity({ resourceId: 'money', quantityChange: -rocketsBuilt?.levelCost }));
          }
        }}
      />
      </View>
      <ActiveUpgrades unitId="rocket" />
    </View>
  );
}

Rocket.unitName = 'Rocket';

export default Rocket;
