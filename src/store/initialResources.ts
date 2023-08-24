import { ResourcesState } from './resourceSlice';

export const initialResources: ResourcesState = {
    resources: [
      { id: 'tonsInSpace', name: 'Tons in Space', quantity: 0 },
      { id: 'money', name: 'Money', quantity: 1000 },
      { id: 'population', name: 'Population', quantity: 7.9 },
    ],
  };