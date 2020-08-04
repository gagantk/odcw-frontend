import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import WashPlanItem from './WashPlanItem';
import './WashPlansList.css';

const WashPlansList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='washplans-list center'>
        <Card>
          <h2>No wash plans found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className='washplans-list'>
      {props.items.map((washplan) => (
        <WashPlanItem
          key={washplan.id}
          id={washplan.id}
          name={washplan.name}
          price={washplan.price}
          description={washplan.description}
          onDelete={props.onDeleteWashPlan}
        />
      ))}
    </ul>
  );
};

export default WashPlansList;
