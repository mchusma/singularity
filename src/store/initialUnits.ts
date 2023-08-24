import { UnitsState } from './unitSlice';

export const initialUnits: UnitsState = {
  units: [
    {
      id: 'rocket',
      name: 'Rocket',
      order: 1,
      resourceCost: [{ resourceId: 'money', quantity: 100 }],
      unitCost: [],
      isVisible: true,
      isApplied: false,
      quantity: 0,
      level: 0,
      levelCost: 10000,
      requiredUnits: [],
      upgrades: [  {
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
      }]
    },
    {
      id: 'factory',
      name: 'Factory',
      order: 2,
      resourceCost: [{ resourceId: 'money', quantity: 100 }],
      unitCost: [],
      isVisible: false,
      isApplied: false,
      quantity: 0,
      level: 0,
      levelCost: 0,
      requiredUnits: [{ unitId: 'rocket', quantity: 10 }],
      upgrades: [  {
        id: 'factory.leanManufacturing',
        name: 'Lean Manufacturing',
        description: 'Decrease cost of factories by 50%',
        order: 1,
        isVisible: false,
        resourceCostUpdate: [{ resourceId: 'money', quantity: 0.5 }],
        resourceCost: [{ unitId: 'factory', quantity: 100 }],
        requiredUnits: [],
        requiredResources: [{ unitId: 'money', quantity: 2000 }]
      }]
    },
    {
      id: 'factoryEmitter',
      name: 'FactoryEmitter',
      order: 3,
      resourceCost: [{ resourceId: 'money', quantity: 100 }],
      unitCost: [],
      isVisible: false,
      isApplied: false,
      quantity: 0,
      level: 0,
      levelCost: 0,
      requiredUnits: [{ unitId: 'factory', quantity: 10 }],
      upgrades: []
    },
  ]
};