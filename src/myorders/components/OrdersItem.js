import React, { useContext, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './OrdersItem.css';

const OrdersItem = (props) => {
  const auth = useContext(AuthContext);
  const [showCarWashStartedModal, setShowCarWashStartedModal] = useState(false);
  const [showCarWashEndedModal, setShowCarWashEndedModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const startCarWashHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_WASHNOW_SERVICE}/startCarWash/${props.id}`,
        undefined,
        undefined,
        { Authorization: `Bearer ${auth.token}` }
      );
      setShowCarWashStartedModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const endCarWashHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_WASHNOW_SERVICE}/endCarWash/${props.id}`,
        undefined,
        undefined,
        { Authorization: `Bearer ${auth.token}` }
      );
      setShowCarWashEndedModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModalHandler = () => {
    setShowCarWashStartedModal(false);
    setShowCarWashEndedModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showCarWashStartedModal}
        header='Car Wash Started'
        footerClass='orders-item__modal-actions'
        footer={
          <Button inverse onClick={closeModalHandler} to='/'>
            OK
          </Button>
        }
      >
        <p>Car Wash started successfully.</p>
      </Modal>
      <Modal
        show={showCarWashEndedModal}
        header='Car Wash Ended'
        footerClass='orders-item__modal-actions'
        footer={
          <Button inverse onClick={closeModalHandler} to='/'>
            OK
          </Button>
        }
      >
        <p>Car Wash ended successfully.</p>
      </Modal>
      <li className='orders-item'>
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='orders-item__content'>
            <div className='orders-item__info'>
              <h3>{props.model}</h3>
              <p>
                {props.regno}
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

          {props.userType === 'washer' && props.status === 'Accepted' && (
            <div className='orders-item__carwash'>
              <Button size='small' onClick={startCarWashHandler}>
                Start Car Wash
              </Button>
            </div>
          )}
          {props.userType === 'washer' && props.status === 'In-Process' && (
            <div className='orders-item__carwash'>
              <Button size='small' onClick={endCarWashHandler}>
                End Car Wash
              </Button>
            </div>
          )}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default OrdersItem;
