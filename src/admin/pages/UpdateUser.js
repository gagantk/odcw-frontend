import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_POSITIVENUMBER,
  VALIDATOR_USERTYPE,
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import './UpdateUser.css';

const UpdateUser = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const userId = useParams().uid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      age: {
        value: 0,
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_USER_SERVICE}/${userId}`,
          undefined,
          undefined,
          { Authorization: `Bearer ${auth.token}` }
        );
        setLoadedUser(responseData.user);
        setFormData(
          {
            name: {
              value: responseData.user.name,
              isValid: true,
            },
            email: {
              value: responseData.user.email,
              isValid: true,
            },
            age: {
              value: responseData.user.age,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [sendRequest, userId, setFormData]);

  const userUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_USER_SERVICE}/${userId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          age: formState.inputs.age.value,
          userType: formState.inputs.userType.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push('/admin/users');
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

  if (!isLoading && !loadedUser && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find user!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && (
        <form className='user-form' onSubmit={userUpdateSubmitHandler}>
          <Input
            element='input'
            id='name'
            type='text'
            label='Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name'
            onInput={inputHandler}
            initialValue={loadedUser.name}
            initialValid={true}
          />
          <Input
            element='input'
            id='email'
            type='email'
            label='E-Mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputHandler}
            initialValue={loadedUser.email}
            initialValid={true}
          />
          <Input
            element='input'
            id='age'
            type='number'
            label='Age'
            validators={[VALIDATOR_POSITIVENUMBER()]}
            errorText='Please enter a valid age.'
            onInput={inputHandler}
            initialValue={loadedUser.age}
            initialValid={true}
          />
          <Input
            element='select'
            id='userType'
            name='userType'
            label='User Type'
            validators={[VALIDATOR_USERTYPE()]}
            errorText='Please select either "customer" or "washer".'
            onInput={inputHandler}
            options={['customer', 'washer']}
            initialValue={loadedUser.userType}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE USER
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateUser;
