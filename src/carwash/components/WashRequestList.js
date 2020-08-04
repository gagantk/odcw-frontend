import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import WashRequestItem from './WashRequestItem';
import './WashRequestList.css';

const WashRequestList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='washrequest-list center'>
        <Card>
          <h2 className='washrequest-title'>No wash requests found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className='washrequest-list'>
      {props.items.map((washRequest) => (
        <WashRequestItem
          key={washRequest._id}
          id={washRequest._id}
          carModel={washRequest.car.carModel}
          carImage={washRequest.car.carImage}
          carRegNo={washRequest.car.carRegNo}
        />
      ))}
    </ul>
  );
};

export default WashRequestList;
