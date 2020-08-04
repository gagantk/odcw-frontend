import React, { useContext, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './UserItem.css';

const UserItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
        `${process.env.REACT_APP_USER_SERVICE}/${props.id}`,
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
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={showConfirmModal}
        onCanel={cancelDeleteHandler}
        header='Are you sure?'
        footerClass='user-item__modal-actions'
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
        <p>Do you want to proceed and delete this user?</p>
      </Modal>
      <tr className='user-item__row'>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.age}</td>
        <td>{props.userType}</td>
        <td className='td-button'>
          <Button size='small' to={`/admin/users/${props.id}`} useritem>
            Edit
          </Button>
        </td>
        <td className='td-button'>
          <Button
            size='small'
            danger
            useritem
            onClick={showDeleteWarningHandler}
          >
            Delete
          </Button>
        </td>
      </tr>
      {/* <div className='user-item__info'>
            <p>
              <b>Name:</b>
            </p>
            <p>{props.name}</p>
            <p>
              <b>Email:</b>
            </p>
            <p>{props.email}</p>
            <p>
              <b>Age:</b>
            </p>
            <p>{props.age}</p>
            <p>
              <b>User Type:</b>
            </p>
            <p>{props.userType}</p>
          </div> */}
      {/* <div className='user-item__actions'>
            <Button to='#'>Edit</Button>
            <Button danger>Delete</Button>
          </div> */}
    </React.Fragment>
  );
};

export default UserItem;
