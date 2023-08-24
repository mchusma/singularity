import { UnitsState } from './unitSlice';

export const initialUnits: UnitsState = {
  units: [
    {
      id: 'rocket',
      name: 'Rocket',
      order: 1,
      isVisible: true,
      quantity: 0,
      level: 0,
      levelCost: 10000,
      requiredUnits: []
    },
    {
      id: 'factory',
      name: 'Factory',
      order: 2,
      isVisible: false,
      quantity: 0,
      level: 0,
      levelCost: 0,
      requiredUnits: [{ unitId: 'rocket', quantity: 10 }]
    },
    {
      id: 'factoryEmitter',
      name: 'FactoryEmitter',
      order: 3,
      isVisible: false,
      quantity: 0,
      level: 0,
      levelCost: 0,
      requiredUnits: [{ unitId: 'factory', quantity: 10 }]
    },
  ]
};