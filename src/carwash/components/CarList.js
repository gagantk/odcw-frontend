import React, { useEffect, useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import CarItem from './CarItem';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './CarList.css';

const CarList = (props) => {
  const [price, setPrice] = useState(props.items.washPlans[0].price);
  console.log(props.items);
  if (props.items.cars.length === 0) {
    return (
      <div className='car-list center'>
        <Card>
          <h2>No cars found! Click to add one.</h2>
          <Button to='/cars/new'>Add Car Details</Button>
        </Card>
      </div>
    );
  }

  const washPlanValueChangeHandler = (event) => {
    setPrice(
      props.items.washPlans.filter((plan) => plan.id === event.target.value)[0]
        .price
    );
  };

  return (
    <ul className='car-list'>
      {props.items.cars.map((car) => (
        <CarItem
          key={car.id}
          id={car.id}
          model={car.carModel}
          regno={car.carRegNo}
          image={car.carImage}
          changed={washPlanValueChangeHandler}
          washPlans={props.items.washPlans}
          price={price}
        />
      ))}
    </ul>
  );
};

export default CarList;
