import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import OrdersList from '../components/OrdersList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './MyOrders.css';

const MyOrders = () => {
  const [loadedOrders, setLoadedOrders] = useState();
  const [orders, setOrders] = useState();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_ORDERS_SERVICE,
          'GET',
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        setOrders(responseData.orders);
        setLoadedOrders(filterCurrentOrders(responseData.orders));
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  const filterCurrentOrders = (data) => {
    const currentOrders = data.filter(
      (order) =>
        order.status === 'Accepted' ||
        order.status === 'Pending' ||
        order.status === 'In-Process'
    );
    return { orders: currentOrders, userType: auth.userType };
  };

  const currentOrdersHandler = () => {
    const currentOrders = filterCurrentOrders(orders);
    setLoadedOrders(currentOrders);
  };

  const pastOrdersHandler = () => {
    const pastOrders = orders.filter(
      (order) => order.status === 'Completed' || order.status === 'Cancelled'
    );
    setLoadedOrders({ orders: pastOrders, userType: auth.userType });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      <div className='myorders-buttons'>
        <Button size='small' onClick={currentOrdersHandler}>
          Current Orders
        </Button>
        <Button size='small' onClick={pastOrdersHandler}>
          Past Orders
        </Button>
      </div>
      <hr />
      {!isLoading && loadedOrders && <OrdersList items={loadedOrders} />}
    </React.Fragment>
  );
};

export default MyOrders;
