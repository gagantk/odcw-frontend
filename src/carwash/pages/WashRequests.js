import React, { useEffect, useContext, useState } from 'react';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import WashRequestList from '../components/WashRequestList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './WashRequests.css';

const WashRequests = () => {
  const [loadedRequests, setLoadedRequests] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_WASHNOW_SERVICE}/washrequests`,
          'GET',
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        setLoadedRequests(responseData);
      } catch (err) {}
    };
    fetchRequests();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedRequests && (
        <h2 className='center washrequests-title'>Wash Requests:</h2>
      )}
      {!isLoading && loadedRequests && (
        <WashRequestList items={loadedRequests.washRequests} />
      )}
    </React.Fragment>
  );
};

export default WashRequests;
