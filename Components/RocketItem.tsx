import React, { VFC } from 'react';
import { Rocket } from '../types/type';

interface Props {
  rocket: Rocket;
}

const RocketItem: VFC<Props> = ({ rocket }) => {
  return (
    <>
      <li key={rocket.id} className="p-1">
        <p className=" font-bold text-purple-600">{rocket.name}</p>
        <p className="">{rocket.mass.kg}kg</p>
        <p className="">height: {rocket.height.meters}m</p>
        <p className="">dimeter: {rocket.diameter.meters}m</p>
      </li>
    </>
  );
};

export default RocketItem;
