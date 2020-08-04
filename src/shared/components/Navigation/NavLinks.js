import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import { FaUser } from 'react-icons/fa';
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
          <NavLink to='/washrequests' exact>
            WASH REQUESTS
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.userType !== 'admin' && (
        <li>
          <NavLink to='/orders' exact>
            MY ORDERS
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.userType !== 'admin' && (
        <li>
          <NavLink to='/profile' exact>
            <FaUser />
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.userType === 'admin' && (
        <li>
          <NavLink to='/admin/orders' exact>
            ORDERS
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.userType === 'admin' && (
        <li>
          <NavLink to='/admin/washplans' exact>
            WASH PLANS
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && auth.userType === 'admin' && (
        <li>
          <NavLink to='/admin/users' exact>
            USERS
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
