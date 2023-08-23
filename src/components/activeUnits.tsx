import React from 'react';
import { useDispatch } from 'react-redux';
import Factory from '../units/Factory';
import FactoryEmitter from '../units/FactoryEmitter';
import Rocket from '../units/Rocket';
import { clearUnits } from '../store/unitSlice';

const activeUnits = [Factory, FactoryEmitter, Rocket];

const ActiveUnits = () => {
  const dispatch = useDispatch();

  return (
    <div>
      {activeUnits.map((Unit, index) => <Unit key={index} />)}
      <button onClick={() => dispatch(clearUnits())}>Clear Units</button>
    </div>
  );
}

export default ActiveUnits;