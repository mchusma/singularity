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

- addUnit: This action is dispatched when a unit is built. It increments the quantity of the specified unit.
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