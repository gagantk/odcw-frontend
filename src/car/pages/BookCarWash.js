import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import CarList from '../components/CarList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useEffect } from 'react';
import { AuthContext } from '../../shared/context/auth-context';

const BookCarWash = () => {
  const [loadedCars, setLoadedCars] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_CAR_DETAILS_SERVICE}/user/${userId}`,
          undefined,
          undefined,
          { Authorization: 'Bearer ' + auth.token }
        );
        console.log(responseData);
        setLoadedCars(responseData.cars);
      } catch (err) {}
    };
    fetchCars();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCars && (
        <h1 className='center'>Select a car to book car wash</h1>
      )}
      {!isLoading && loadedCars && <CarList items={loadedCars} />}
    </React.Fragment>
  );
};

export default BookCarWash;
