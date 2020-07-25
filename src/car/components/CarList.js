import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import CarItem from './CarItem';
import './CarList.css';

const CarList = (props) => {
  console.log(props.items);
  if (props.items.length === 0) {
    return (
      <div className='car-list center'>
        <Card>
          <h2>No cars found! Click to add one.</h2>
          <Button to='/cars/new'>Add Car Details</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='car-list'>
      {props.items.map((car) => (
        <CarItem
          key={car.id}
          id={car.id}
          model={car.carModel}
          regno={car.carRegNo}
          image={car.carImage}
        />
      ))}
    </ul>
  );
};

export default CarList;
