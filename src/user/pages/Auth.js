import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_POSITIVENUMBER,
  VALIDATOR_USERTYPE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_USER_SERVICE}/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.userType
        );
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_USER_SERVICE}/signup`,
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            age: formState.inputs.age.value,
            userType: formState.inputs.userType.value.toLowerCase(),
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.userType
        );
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          age: undefined,
          userType: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          age: {
            value: '',
            isValid: false,
          },
          userType: {
            value: 'customer',
            isValid: true,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className='login-title'>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element='input'
              id='name'
              type='text'
              label='Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name'
              onInput={inputHandler}
            />
          )}
          <Input
            element='input'
            id='email'
            type='email'
            label='E-Mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText='Please enter a valid password, atleast 8 characters.'
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              element='input'
              id='age'
              type='number'
              label='Age'
              validators={[VALIDATOR_POSITIVENUMBER()]}
              errorText='Please enter a valid age.'
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element='select'
              id='userType'
              name='userType'
              label='User Type'
              validators={[VALIDATOR_USERTYPE()]}
              errorText='Please select either "customer" or "washer".'
              onInput={inputHandler}
              options={['customer', 'washer']}
              initialValue='customer'
              initialValid={true}
            />
          )}
          {/* {!isLoginMode && (
            <Input
              element='input'
              id='userType'
              name='userType'
              type='radio'
              value='Customer'
              validators={[VALIDATOR_USERTYPE()]}
              errorText='Please enter either "customer" or "washer".'
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element='input'
              id='userType'
              name='userType'
              type='radio'
              value='Washer'
              validators={[VALIDATOR_USERTYPE()]}
              errorText='Please enter either "customer" or "washer".'
              onInput={inputHandler}
            />
          )} */}
          <br />
          {/* {!isLoginMode && (
            <Input
              element='input'
              id='userType'
              type='text'
              label='User Type'
              validators={[VALIDATOR_USERTYPE()]}
              errorText='Please enter either "customer" or "washer".'
              onInput={inputHandler}
            />
          )} */}
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <hr />
        <h4>{isLoginMode ? "Don't" : 'Already'} have an account?</h4>
        <Button inverse onClick={switchModeHandler}>
          Click to {isLoginMode ? 'Signup' : 'Login'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
