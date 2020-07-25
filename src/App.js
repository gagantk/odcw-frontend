import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import Homepage from '../src/homepage/pages/Homepage';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import NewCar from './car/pages/NewCar';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import './App.css';
import BookCarWash from './car/pages/BookCarWash';

const App = () => {
  const { token, login, logout, userId, userType } = useAuth();

  let routes;

  if (token) {
    if (userType === 'customer') {
      routes = (
        <Switch>
          <Route path='/cars/new' exact>
            <NewCar />
          </Route>
          <Route path='/:userId/bookcarwash' exact>
            <BookCarWash />
          </Route>
          <Redirect to='/' />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='#' exact></Route>
          <Redirect to='/' />
        </Switch>
      );
    }
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Homepage />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId,
        userType,
        login,
        logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
