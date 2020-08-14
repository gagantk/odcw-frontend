import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './WashPlanForm.css';

const UpdateWashPlan = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedWashPlan, setLoadedWashPlan] = useState();
  const washPlanId = useParams().wid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      price: {
        value: 0,
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchWashPlan = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_WASHPLAN_SERVICE}/${washPlanId}`,
          undefined,
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        setLoadedWashPlan(responseData.washPlan);
        setFormData(
          {
            name: {
              value: responseData.washPlan.name,
              isValid: true,
            },
            price: {
              value: responseData.washPlan.price,
              isValid: true,
            },
            description: {
              value: responseData.washPlan.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchWashPlan();
  }, [sendRequest, washPlanId, setFormData]);

  const washPlanUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_WASHPLAN_SERVICE}/${washPlanId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          price: formState.inputs.price.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push('/admin/washplans');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!isLoading && !loadedWashPlan && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find wash plan!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedWashPlan && (
        <form className='washplan-form' onSubmit={washPlanUpdateSubmitHandler}>
          <Input
            id='name'
            element='input'
            type='text'
            label='Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid name.'
            onInput={inputHandler}
            initialValue={loadedWashPlan.name}
            initialValid={true}
          />
          <Input
            id='price'
            element='input'
            type='number'
            label='Price'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid price.'
            onInput={inputHandler}
            initialValue={loadedWashPlan.price}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (at least 5 characters).'
            onInput={inputHandler}
            initialValue={loadedWashPlan.description}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            Update Wash Plan
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateWashPlan;
