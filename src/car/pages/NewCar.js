import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { useForm } from '../../shared/hooks/form-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PAYMENTMODE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import './NewCar.css';

const CarDetails = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      regno: {
        value: '',
        isValid: false,
      },
      model: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const carSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      console.log(formState.inputs);
      formData.append('regno', formState.inputs.regno.value);
      formData.append('model', formState.inputs.model.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('address', formState.inputs.address.value);
      console.log(formData);
      await sendRequest(
        `${process.env.REACT_APP_CAR_DETAILS_SERVICE}/new`,
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <form className='cardetails-form' onSubmit={carSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
      <h2 className='newcar-title'>Add Car Details</h2>
      <hr />
      <Input
        id='regno'
        element='input'
        type='text'
        label='Car Reg. No.'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter car registration number.'
        onInput={inputHandler}
      />
      <Input
        id='model'
        element='input'
        type='text'
        label='Car Model'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter car model name.'
        onInput={inputHandler}
      />
      <ImageUpload
        id='image'
        onInput={inputHandler}
        errorText='Please add an image.'
      />
      <Input
        id='address'
        element='input'
        type='text'
        label='Address'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter an address.'
        onInput={inputHandler}
      />
      {/* <span>
        <b>Preferred Payment</b>
      </span>
      <br /> */}
      {/* <Input
        element='input'
        type='radio'
        id='preferredpayment'
        name='preferredpayment'
        value='Pay Online'
        onInput={inputHandler}
        validators={[VALIDATOR_PAYMENTMODE()]}
        errorText='Please enter either "Pay Online" or "Pay On Delivery".'
      />
      <Input
        element='input'
        type='radio'
        id='preferredpayment'
        name='preferredpayment'
        value='Pay On Delivery'
        onInput={inputHandler}
        validators={[VALIDATOR_PAYMENTMODE()]}
        errorText='Please enter either "Pay Online" or "Pay On Delivery".'
      /> */}
      {/* <Input
        id='preferredpayment'
        element='input'
        type='text'
        label='Preferred Payment'
        validators={[VALIDATOR_PAYMENTMODE()]}
        errorText='Please enter either "Pay Online" or "Pay On Delivery".'
        onInput={inputHandler}
      /> */}
      <br />
      <Button type='submit' disabled={!formState.isValid}>
        ADD CAR
      </Button>
    </form>
  );
};

export default CarDetails;
