import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './CarItem.css';

const CarItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [
    showWashRequestSuccessModal,
    setShowWashRequestSuccessModal,
  ] = useState(false);
  const auth = useContext(AuthContext);

  const showConfirmHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelConfirmHandler = () => {
    setShowConfirmModal(false);
  };

  const closeWashRequestSuccessHandler = () => {
    setShowWashRequestSuccessModal(false);
  };

  const proceedConfirmHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_WASHNOW_SERVICE}/sendWashRequest/${props.id}`,
        'GET',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      setShowWashRequestSuccessModal(true);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        header='Proceed to book?'
        footerClass='car-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmHandler}>
              Cancel
            </Button>
            <Button inverse onClick={proceedConfirmHandler}>
              Proceed
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and book car wash for your car{' '}
          <b>{props.model}</b>?
          <br />
          <i>Note: Clicking Proceed will send wash now request.</i>
        </p>
      </Modal>
      <Modal
        show={showWashRequestSuccessModal}
        header='Success'
        footerClass='car-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={closeWashRequestSuccessHandler} to='/'>
              OK
            </Button>
          </React.Fragment>
        }
      >
        <p>Car wash request sent successfully.</p>
      </Modal>
      <li className='car-item' onClick={showConfirmHandler}>
        <Card className='car-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='car-item__info'>
            <h3>{props.model}</h3>
            <h4>{props.regno}</h4>
          </div>
          <div className='car-item__image'>
            <img
              src={`data:image/jpeg;base64, ${props.image}`}
              alt={props.model}
            />
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CarItem;
