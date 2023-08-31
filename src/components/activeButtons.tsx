import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateButtonState } from '../store/unitSlice';

export const ActiveButtons = ({ unitId }: { unitId: string }) => {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.units.units.find(unit => unit.id === unitId));
  const resources = useSelector((state: RootState) => state.resources.resources);
  const units = useSelector((state: RootState) => state.units.units);
  const [prevState, setPrevState] = useState('disabled');
  const prevStateRef = useRef('disabled');
  const [newState, setNewState] = useState('disabled'); // Add this line

  useEffect(() => {
    console.log('Button: Resources state has changed, component is re-rendering', resources);
  }, [resources]);

  useEffect(() => {
    if (!unit) {
      throw new Error(`Button: Unit with id ${unitId} not found`);
    }
  
    const interval = setInterval(() => {
      // Check if there are enough resources to build the unit
      const currentResource = unit.resourceCost.map(cost => resources.find((res) => res.id === cost.resourceId));
      console.log(`Button: currentResource: ${JSON.stringify(currentResource)}`);       
      let resourceCheck = true;
      for (let i = 0; i < currentResource.length; i++) {
        console.log(`Button: resource quantity for unit ${unitId}: ${currentResource[i].id} ${currentResource[i].quantity}`);
        console.log(`Button: required resource quantity for unit ${unitId}: ${unit.resourceCost[i].resourceId} ${unit.resourceCost[i].quantity}`); 
        if (!currentResource[i] || currentResource[i].quantity < unit.resourceCost[i].quantity) {
          console.log(`Button: Not enough resources for unit ${unitId}`);
          resourceCheck = false;
          break;
        }
        else {
          console.log(`Button: Enough resources for unit ${unitId}`);
        }
      }
  
      console.log(`Button: resourceCheck: ${resourceCheck}`); 
  
      // If both checks pass, enable the button, otherwise disable it
      const newState = (resourceCheck) ? 'enabled' : 'disabled';
      setNewState(newState);
      if (prevStateRef.current !== newState) {
        console.log(`Button: state changed from ${prevStateRef.current} to ${newState}`);
        prevStateRef.current = newState;
      }
      console.log(`Button: newState: ${newState}`); // Add this line
  
      dispatch(updateButtonState({ unitId: unitId, buttonState: newState }));
    }, 1000);
  
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (prevStateRef.current !== newState) {
    console.log(`Button: state changed from ${prevStateRef.current} to ${newState}`);
    prevStateRef.current = newState;
  }
  
  return (
    <button disabled={newState === 'disabled'}> // Change this line
      Button
    </button>
  );
}

export default ActiveButtons;