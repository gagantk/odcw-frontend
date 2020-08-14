import React, { useContext, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './WashRequestItem.css';

const WashRequestItem = (props) => {
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseHeader, setResponseHeader] = useState();
  const [response, setResponse] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const closeResponseHandler = () => setShowResponseModal(false);

  const acceptRequestHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_WASHNOW_SERVICE}/respondWashRequest/${props.id}/approve`,
        undefined,
        undefined,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setResponse('approve');
      setResponseHeader('Wash Request Approved');
      setShowResponseModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const declineRequestHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_WASHNOW_SERVICE}/respondWashRequest/${props.id}/decline`,
        undefined,
        undefined,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setResponse('decline');
      setResponseHeader('Wash Request Declined');
      setShowResponseModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showResponseModal}
        header={responseHeader}
        footerClass='washrequest-item__modal-actions'
        footer={
          <Button inverse onClick={closeResponseHandler} to='/'>
            OK
          </Button>
        }
      >
        <p>
          Car wash request {response}d for {props.carModel}.
        </p>
      </Modal>
      <li className='washrequest-item'>
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='washrequest-item__content'>
            <div className='washrequest-item__info'>
              <h3>{props.carModel}</h3>
              <h4>{props.carRegNo}</h4>
            </div>
            <div className='washrequest-item__image'>
              <img
                src={`data:image/jpeg;base64, ${props.carImage}`}
                alt={props.model}
              />
            </div>
          </div>
          <div className='washrequest-item__footer'>
            <Button inverse onClick={acceptRequestHandler}>
              Approve
            </Button>
            <Button inverse onClick={declineRequestHandler}>
              Decline
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default WashRequestItem;
