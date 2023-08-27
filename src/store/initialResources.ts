import { ResourcesState } from './resourceSlice';

export const initialResources: ResourcesState = {
  resources: [
    {
      id: 'tonsInSpace',
      name: 'Tons in Space',
      quantity: 0,
      requiredUnits: []
    },
    {
      id: 'money',
      name: 'Money',
      quantity: 1000,
      requiredUnits: []
    },
    {
      id: 'energy',
      name: 'Energy Production',
      quantity: 17.02,
      requiredUnits: []
    },
    {
      id: 'productionCapacity',
      name: 'Production Capacity',
      quantity: 1,
      requiredUnits: []
    },
    {
      id: 'lifespan',
      name: 'Lifespan',
      quantity: 73.4,
      requiredUnits: []
    },
    {
      id: 'land',
      name: 'Inhabitable Land',
      quantity: 15770000000,
      requiredUnits: []
    },
  ],
};
