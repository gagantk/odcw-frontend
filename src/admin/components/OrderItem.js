import React, { useContext, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './OrderItem.css';

const OrderItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showAssignWasherModal, setShowAssignWasherModal] = useState(false);

  const showAssignWasherModalHandler = () => setShowAssignWasherModal(true);

  const cancelAssignWasherHandler = () => setShowAssignWasherModal(false);

  const confirmAssignWasherHandler = () => {};

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showAssignWasherModal}
        header='Proceed to assign washer?'
        footerClass='car-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelAssignWasherHandler}>
              Cancel
            </Button>
            <Button inverse onClick={confirmAssignWasherHandler}>
              Proceed
            </Button>
          </React.Fragment>
        }
      >
        <p>Choose washer to assign:</p>
        <select name='' id=''></select>
      </Modal>
      <li className='order-item'>
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='order-item__content'>
            <div className='orders-item__info'>
              <h3>{props.model}</h3>
              <p>
                <b>{props.regno}</b>
                <br />
                Customer name: {props.customer} <br />
                {props.washer && `Washer name: ${props.washer.name}`}
                <br />
                Wash Plan: {props.washPlan}
              </p>
              <h3>Wash Price: ₹{props.price}</h3>
            </div>
            <div className='orders-item__status'>
              <h3>{props.status}</h3>
            </div>
            <div className='orders-item__image'>
              <img
                src={`data:image/jpeg;base64, ${props.image}`}
                alt={props.model}
              />
            </div>
          </div>
          {props.status === 'Pending' && (
            <div className='order-item__footer'>
              <Button inverse onClick={showAssignWasherModalHandler}>
                Assign Washer
              </Button>
            </div>
          )}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default OrderItem;
