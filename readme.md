# Singularity

## Installation

Run:
`npm i --legacy-peer-deps`

`npm start`

## Application Overview

This application is built using Expo and React Native, with Redux for state management and Redux Persist for storing the state between sessions. The application is structured around the concept of "units", which are entities that can be created and interact with each other.

### Redux 

#### Redux Store

The Redux store is set up in src/store/store.ts. It uses redux-persist to persist the state to AsyncStorage. The store is configured with the unitsReducer from src/store/unitSlice.ts.

#### Redux Actions

The application uses several Redux actions to manage the state of the units:

- updateUnitQuantity: This action is dispatched when a unit is built. It increments the quantity of the specified unit. `dispatch(updateUnitQuantity({ unitId: 3, quantityChange: 1 }))`
- updateUnitVisibility: This action is dispatched to make a unit visible in the UI.
- resetGame: This action is dispatched to reset the state of the units to their initial state.

### Unit Structure

Units are defined in src/store/unitSlice.ts. Each unit has an id, name, isVisible flag, quantity, and a list of requiredUnits. The unitsSlice provides reducers for updating unit visibility, clearing all units, and adding a unit.
// src/store/unitSlice.ts
Unit {
  id: number;
  name: string;
  isVisible: boolean;
  quantity: number;
  requiredUnits: Array<{ unitId: number, quantity: number }>;
}

### How To Add Units
Units must be added in 2 places:
- the store/initialUnits.ts file - This defines the initial state and any requirements of the units to appear/disappear
- the units folder - adding a .tsx file for your unit defines how it works/looks (buttons, inputs, outputs, etc) This can be simple, like Rocket.tsx, or more complicated

### Levels in Units

In the application, each unit can have a level associated with it. The level of a unit can be increased by applying upgrades.
Unit Level Structure

In the Unit interface, there are two properties related to levels:

- level: This is a number representing the current level of the unit.
- levelCost: This is the cost to upgrade the unit to the next level.
export interface Unit {
  ...
  level: number;
  levelCost: number;
  ...
}
Upgrading a Unit Level

To upgrade a unit's level, the updateUnitLevel action is dispatched. This action takes an object with three properties:

- unitId: The ID of the unit to be upgraded.
- levelChange: The amount to change the level by (usually 1 to increase the level).
- levelCostChange: The amount to change the level cost by.
dispatch(updateUnitLevel({ unitId: 'rocket', levelChange: 1, levelCostChange: rocketsBuilt?.levelCost * 2 }));

This action finds the unit in the state by its ID, then increases the unit's level by levelChange and the unit's level cost by levelCostChange.
Displaying Unit Level

The level of a unit is displayed in the unit's component. For example, in the Rocket component, the level is displayed as follows:
<Text style={styles.text}>Rocket Level: {rocketsBuilt?.level || 0} | Cost: ${rocketsBuilt?.levelCost || 0}</Text>
Level Requirements

Before a unit's level can be upgraded, certain requirements must be met. For example, the player must have enough resources to pay the levelCost. This is checked before dispatching the updateUnitLevel action:
if (rocketsBuilt && 'levelCost' in rocketsBuilt && money && money.quantity >= rocketsBuilt.levelCost) {
  dispatch(updateUnitLevel({ unitId: 'rocket', levelChange: 1, levelCostChange: rocketsBuilt?.levelCost * 2 }));
  dispatch(updateResourceQuantity({ resourceId: 'money', quantityChange: -rocketsBuilt?.levelCost }));
}

In this example, the level of the rocket unit is upgraded only if the player has enough money to pay the levelCost. After the level is upgraded, the levelCost is deducted from the player's money.

### Upgrades in the System

In the application, each unit can have upgrades associated with it. These upgrades can modify the properties of the unit, such as reducing the cost of creating more units.
Upgrade Structure

In the Upgrades interface, there are several properties related to upgrades:
export interface Upgrades {
  id: string;
  name: string;
  order: number;
  description: string;
  isVisible: boolean,
  resourceCostUpdate: Array<{ resourceId: string, quantity: number }>;
  resourceCost: Array<{ unitId: string, quantity: number }>;
  requiredUnits: Array<{ unitId: string, quantity: number }>;
  requiredResources: Array<{ unitId: string, quantity: number }>;
}

- id: A unique identifier for the upgrade.
- name: The name of the upgrade.
- order: The order in which the upgrade should be applied.
- description: A description of what the upgrade does.
- isVisible: A boolean indicating whether the upgrade is visible in the UI.
- resourceCostUpdate: An array of objects, each containing a resourceId and a quantity. This represents the new cost of the resource after the upgrade is applied.
- resourceCost: An array of objects, each containing a unitId and a quantity. This represents the cost of the upgrade in terms of units.
- requiredUnits: An array of objects, each containing a unitId and a quantity. This represents the units required for the upgrade to be available.
- requiredResources: An array of objects, each containing a unitId and a quantity. This represents the resources required for the upgrade to be available.
Applying an Upgrade

To apply an upgrade, the applyUpgrade action is dispatched. This action takes an object with two properties:

- unitId: The ID of the unit to be upgraded.
- upgradeId: The ID of the upgrade to be applied.
dispatch(applyUpgrade({ unitId: 'rocket', upgradeId: 'rocket.partialReusable' }));

This action finds the unit and the upgrade in the state by their IDs, then applies the upgrade by updating the unit's resourceCost from the upgrade's resourceCostUpdate multiplier.
Adding Upgrades

Upgrades must be added in the initialUnitUpgrades array in the initialUnitUpgrades.ts file. This defines the initial state and any requirements of the upgrades.
export const initialUnitUpgrades: Upgrades[] = [
  {
    id: 'rocket.partialReusable',
    name: 'Partial Reusable',
    description: 'Decrease cost of rockets by 50%',
    order: 1,
    isVisible: false,
    resourceCostUpdate: [{ resourceId: 'money', quantity: 0.5 }],
    resourceCost: [{ unitId: 'rocket', quantity: 100 }],
    requiredUnits: [],
    requiredResources: [{ unitId: 'tonsInSpace', quantity: 10 }]
  },
  ...
];

Each upgrade is an object in the initialUnitUpgrades array. The properties of the upgrade should be filled out according to the Upgrades interface.

### Action Tab

This is where most things live. The Action Tab is defined in src/screens/actionTab.tsx. It renders the ActiveUnits component, which in turn renders a list of active units. The active units are defined in src/components/activeUnits.tsx and include Factory, FactoryEmitter, and Rocket.

### Log Tab
The Log Tab is something I'd like to see vertical instead of horizontal, less of tabs and more like expandable sections. But regardless, story elements populate here as you go.

### Units

Each unit is defined in its own file in the src/units directory. For example, the Rocket unit is defined in src/units/Rocket.tsx. Each unit component uses the useDispatch and useSelector hooks from react-redux to interact with the Redux store. The Rocket component, for example, displays the number of rockets built and provides a button to build a new rocket.

### Styles

The application uses a styles.tsx file to manage the styles of the components. This file exports a styles object that contains the styles for the components.
Navigation

The application uses react-navigation to manage navigation between screens. The main navigation is set up in App.tsx with a bottom tab navigator. The application currently has two screens: ActionTab and LogTab.
Running the Application

To run the application, use the command npm start. This will start the Expo server and allow you to run the application on a device or emulator.

### TypeScript

The application is written in TypeScript. The TypeScript configuration is defined in tsconfig.json.

### Babel

The application uses Babel for transpiling the JavaScript code. The Babel configuration is defined in babel.config.js.

### Package Management

The application uses npm for package management. The dependencies and scripts for the application are defined in package.json.