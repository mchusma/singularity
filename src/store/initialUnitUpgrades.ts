import { Upgrades } from './unitSlice';

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
  {
    id: 'rocket.fullyReusable',
    name: 'Fully Reusable',
    description: 'Decrease cost of rockets by 80%',
    order: 2,
    isVisible: false,
    resourceCostUpdate: [{ resourceId: 'money', quantity: 0.2 }],
    resourceCost: [{ unitId: 'rocket', quantity: 200 }],
    requiredUnits: [{ unitId: 'partialReusable', quantity: 1 }],
    requiredResources: [{ unitId: 'tonsInSpace', quantity: 20 }]
  },
  {
    id: 'factory.leanManufacturing',
    name: 'Lean Manufacturing',
    description: 'Decrease cost of factories by 50%',
    order: 1,
    isVisible: false,
    resourceCostUpdate: [{ resourceId: 'money', quantity: 0.5 }],
    resourceCost: [{ unitId: 'factory', quantity: 100 }],
    requiredUnits: [],
    requiredResources: [{ unitId: 'money', quantity: 2000 }]
  }
];