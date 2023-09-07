import { ResourcesState } from "./resourceSlice";

export const initialResources: ResourcesState = {
  resources: [
    {
      id: "tonsInSpace",
      name: "Tons in Space",
      quantity: 1000,
      requiredUnits: [],
    },
    { id: "money", name: "Money", quantity: 1000, requiredUnits: [] },
    {
      id: "energy",
      name: "Energy Production",
      quantity: 17.02,
      requiredUnits: [],
    },
    {
      id: "spaceCapacity",
      name: "Space Capacity",
      quantity: 10,
      requiredUnits: [],
    },
    {
      id: "productionCapacity",
      name: "Production Capacity",
      quantity: 10,
      requiredUnits: [],
    },
    {
      id: "Biology",
      name: "Biology",
      quantity: 0,
      requiredUnits: [],
    },
    {
      id: "Physics",
      name: "Physics",
      quantity: 0,
      requiredUnits: [],
    },
    {
      id: "Engineering",
      name: "Engineering",
      quantity: 0,
      requiredUnits: [],
    }
  ],
};
