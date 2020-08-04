import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import OrderItem from './OrderItem';
import './OrdersList.css';

const OrdersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='orders-list center'>
        <Card>
          <h2>No orders found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className='orders-list'>
      {props.items.map((order) => (
        <OrderItem
          key={order.id}
          id={order.id}
          model={order.car.carModel}
          regno={order.car.carRegNo}
          image={order.car.carImage}
          customer={order.customer.name}
          washer={order.washer}
          status={order.status}
          price={order.price}
          washPlan={order.washPlan}
          washers={props.washers}
        />
      ))}
    </ul>
  );
};

export default OrdersList;
