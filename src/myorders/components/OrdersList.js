import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import OrdersItem from './OrdersItem';
import './OrdersList.css';

const OrdersList = (props) => {
  if (props.items.orders.length === 0) {
    return (
      <div className='orders-list center'>
        <Card>
          <h2 className='orders-list-title'>
            No Orders available for this section.
          </h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className='orders-list'>
      {props.items.orders.map((order) => (
        <OrdersItem
          key={order.id}
          id={order.id}
          model={order.car.carModel}
          regno={order.car.carRegNo}
          image={order.car.carImage}
          customer={order.customer.name}
          washer={order.washer}
          status={order.status}
          userType={props.items.userType}
          price={order.price}
          washPlan={order.washPlan}
        />
      ))}
    </ul>
  );
};

export default OrdersList;
