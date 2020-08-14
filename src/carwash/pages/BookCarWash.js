import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import CarList from '../components/CarList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useEffect } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import './BookCarWash.css';

const BookCarWash = () => {
  const [loadedCars, setLoadedCars] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
  const auth = useContext(AuthContext);
  const [washPlan, setWashPlan] = useState();
  // const [washPlans, setWashPlans] = useState([]);
  const [price, setPrice] = useState(0);
  let washPlans;

  useEffect(() => {
    const washPlansHandler = async () => {
      try {
        const washPlansData = await sendRequest(
          process.env.REACT_APP_WASHPLAN_SERVICE,
          undefined,
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        washPlans = washPlansData.washPlans;
        setWashPlan(washPlansData.washPlans[0].id);
        setPrice(washPlansData.washPlans[0].price);
      } catch (err) {
        console.log(err);
      }

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_CAR_DETAILS_SERVICE}/user/${userId}`,
          undefined,
          undefined,
          { Authorization: 'Bearer ' + auth.token }
        );
        setLoadedCars({
          cars: responseData.cars,
          washPlans: washPlans,
        });
      } catch (err) {
        console.log(err);
      }
    };
    washPlansHandler();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedCars && (
        <h1 className='carwash-title'>Select a car to book car wash</h1>
      )}
      {!isLoading && loadedCars && <CarList items={loadedCars} />}
    </React.Fragment>
  );
};

export default BookCarWash;
