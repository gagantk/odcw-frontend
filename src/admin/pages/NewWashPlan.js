import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import './WashPlanForm.css';

const NewWashPlan = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
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

  const history = useHistory();

  const washPlanSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_WASHPLAN_SERVICE}/add`,
        'POST',
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='washplan-form' onSubmit={washPlanSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='name'
          element='input'
          type='text'
          label='Name'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid name.'
          onInput={inputHandler}
        />
        <Input
          id='price'
          element='input'
          type='number'
          label='Price'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid price.'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description (at least 5 characters).'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD WASH PLAN
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewWashPlan;
