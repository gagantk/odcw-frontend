import React, { useContext, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './WashPlanItem.css';

const WashPlanItem = (props) => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_WASHPLAN_SERVICE}/${props.id}`,
        'DELETE',
        undefined,
        { Authorization: `Bearer ${auth.token}` }
      );
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footerClass='washplan-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this wash plan?</p>
      </Modal>
      <li className='washplan-item'>
        <Card className='washplan-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='washplan-item__info'>
            <h3>{props.name}</h3>
            <h4>₹{props.price}</h4>
            <p className='washplan-item__description'>{props.description}</p>
          </div>
          <div className='washplan-item__actions'>
            <Button size='small' to={`/admin/washplans/${props.id}`} washplan>
              EDIT
            </Button>
            <Button
              danger
              size='small'
              onClick={showDeleteWarningHandler}
              washplan
            >
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default WashPlanItem;
