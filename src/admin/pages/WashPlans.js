import React, { useContext, useState, useEffect } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import WashPlansList from '../components/WashPlansList';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './WashPlans.css';

const WashPlans = () => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [loadedWashPlans, setLoadedWashPlans] = useState();

  useEffect(() => {
    const fetchWashPlans = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_WASHPLAN_SERVICE,
          undefined,
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        setLoadedWashPlans(responseData.washPlans);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWashPlans();
  }, [sendRequest]);

  const washPlanDeleteHandler = (deletedWashPlanId) => {
    setLoadedWashPlans((prevWashPlans) =>
      prevWashPlans.filter((washPlan) => washPlan._id !== deletedWashPlanId)
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
      {!isLoading && loadedWashPlans && (
        <div className='washplans'>
          <div className='washplans-header'>
            <h2 className='washplans-title'>Wash Plans Management:</h2>
            <Button size='small' to='/admin/washplans/new' washplans>
              Add Wash Plan
            </Button>
          </div>
        </div>
      )}
      {!isLoading && loadedWashPlans && (
        <WashPlansList
          items={loadedWashPlans}
          onDeleteWashPlan={washPlanDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default WashPlans;
