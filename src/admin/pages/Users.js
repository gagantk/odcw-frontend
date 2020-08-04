import React, { useContext, useEffect, useState } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import UsersList from '../components/UsersList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Users.css';

const Users = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_USER_SERVICE}`,
          undefined,
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(responseData.users);
        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  const userDeletedHandler = (deletedUserId) => {
    setLoadedUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== deletedUserId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && (
        <h2 className='users-title'>User Management:</h2>
      )}
      {!isLoading && loadedUsers && (
        <UsersList items={loadedUsers} onDeleteUser={userDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default Users;
