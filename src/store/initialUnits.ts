import { UnitsState } from './unitSlice'; // Adjust the path as needed

export const initialUnits: UnitsState = {
  units: [
    {
      id: 1,
      name: 'Rocket',
      isVisible: true,
      quantity: 0,
      requiredUnits: []
    },
    {
      id: 2,
      name: 'Factory',
      isVisible: false,
      quantity: 0,
      requiredUnits: [{ unitId: 1, quantity: 10 }]
    },
    {
      id: 3,
      name: 'FactoryEmitter',
      isVisible: false,
      quantity: 0,
      requiredUnits: [{ unitId: 2, quantity: 10 }]
    },
  ]
};