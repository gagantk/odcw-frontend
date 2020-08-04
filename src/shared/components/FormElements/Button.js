import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = (props) => {
  console.log(props.useritem);
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'} ${
          props.useritem && 'button--useritem'
        } ${props.washplan && 'button--washplan'} ${
          props.washplans && 'button--washplans'
        }`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${
        props.inverse && 'button--inverse'
      } ${props.danger && 'button--danger'} ${
        props.useritem && 'button--useritem'
      } ${props.washplan && 'button--washplan'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
