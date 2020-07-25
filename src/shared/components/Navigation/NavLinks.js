import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className='nav-links'>
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth' exact>
            LOGIN
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.userType === 'customer' && (
        <li>
          <NavLink to={`/${auth.userId}/bookcarwash`} exact>
            BOOK CAR WASH
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.userType === 'customer' && (
        <li>
          <NavLink to='/cars/new' exact>
            ADD CAR
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.userType === 'washer' && (
        <li>
          <NavLink to='#' exact>
            WASH REQUESTS
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
