import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  let element;

  if (props.element === 'input') {
    if (props.type === 'radio') {
      element = (
        <input
          type='radio'
          className='radio'
          name={props.name}
          value={props.value}
          checked={value === props.value}
          onChange={changeHandler}
        />
      );
    } else {
      element = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          checked={props.checked}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
    }
  } else if (props.element === 'select') {
    element = (
      <select
        name={props.name}
        value={inputState.value}
        onChange={changeHandler}
      >
        {props.options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  }

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      } ${props.type === 'radio' && 'form-control--radio'}`}
    >
      {props.label ? (
        <label htmlFor={props.id}>{props.label}</label>
      ) : (
        <span>{props.value}</span>
      )}
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
