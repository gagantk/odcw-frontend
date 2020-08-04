import React, { useState, useEffect, useContext } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import OrdersList from '../components/OrdersList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Orders.css';

const Orders = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [loadedOrders, setLoadedOrders] = useState();
  const [loadedWashers, setLoadedWashers] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_ORDERS_SERVICE}/all`,
          undefined,
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        setLoadedOrders(responseData.orders);
        console.log(responseData.orders);
      } catch (err) {
        console.log(err);
      }

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_WASHNOW_SERVICE}/getWashers`,
          undefined,
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        setLoadedWashers(responseData.washers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedOrders && (
        <OrdersList items={loadedOrders} washers={loadedWashers} />
      )}
    </React.Fragment>
  );
};

export default Orders;
