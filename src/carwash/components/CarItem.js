import React, { useState, useContext, useEffect } from 'react';

import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './CarItem.css';

const CarItem = (props) => {
  console.log(props.image);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [
    showWashRequestSuccessModal,
    setShowWashRequestSuccessModal,
  ] = useState(false);
  console.log('Here2');
  console.log(props.washPlans);

  const auth = useContext(AuthContext);

  const showConfirmHandler = async () => {
    console.log('Here');
    console.log(props.washPlans);
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
    console.log(
      JSON.stringify({
        washPlan: props.washPlans.filter(
          (plan) => plan.price === props.price
        )[0].id,
      })
    );
    try {
      const resp = await sendRequest(
        `${process.env.REACT_APP_WASHNOW_SERVICE}/sendWashRequest/${
          props.id
        }?washplan=${
          props.washPlans.filter((plan) => plan.price === props.price)[0].name
        }&price=${props.price}`,
        undefined,
        undefined,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      console.log(resp);
      setShowWashRequestSuccessModal(true);
    } catch (err) {
      console.log(err);
    }
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
        <label htmlFor=''>
          Pick your car wash plan:
          <select
            name='washplan'
            value={props.washPlan}
            onChange={props.changed}
          >
            {props.washPlans.map((plan) => (
              <option value={plan.id} key={plan.id}>
                {plan.name} - ₹{plan.price}
              </option>
            ))}
          </select>
        </label>
        <p>
          Do you want to proceed and book car wash for your car{' '}
          <b>{props.model}</b>?
          <br />
          <i>
            Note: Clicking Proceed will send wash now request and payment will
            be assumed to completed.
          </i>
        </p>
        <h2 className='price'>Price: ₹{props.price}</h2>
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
