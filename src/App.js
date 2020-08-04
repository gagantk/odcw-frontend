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
import BookCarWash from './carwash/pages/BookCarWash';
import WashRequests from './carwash/pages/WashRequests';
import MyOrders from './myorders/pages/MyOrders';
import Profile from './user/pages/Profile';
import Users from './admin/pages/Users';
import UpdateUser from './admin/pages/UpdateUser';
import WashPlans from './admin/pages/WashPlans';
import NewWashPlan from './admin/pages/NewWashPlan';
import UpdateWashPlan from './admin/pages/UpdateWashPlan';
import Orders from './admin/pages/Orders';

const App = () => {
  const { token, login, logout, userId, userType } = useAuth();

  let routes;

  if (token) {
    if (userType === 'customer') {
      routes = (
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
          <Route path='/cars/new' exact>
            <NewCar />
          </Route>
          <Route path='/:userId/bookcarwash' exact>
            <BookCarWash />
          </Route>
          <Route path='/orders' exact>
            <MyOrders />
          </Route>
          <Route path='/profile' exact>
            <Profile />
          </Route>
          <Redirect to='/' />
        </Switch>
      );
    } else if (userType === 'washer') {
      routes = (
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
          <Route path='/washrequests' exact>
            <WashRequests />
          </Route>
          <Route path='/orders' exact>
            <MyOrders />
          </Route>
          <Route path='/profile' exact>
            <Profile />
          </Route>
          <Redirect to='/' />
        </Switch>
      );
    } else if (userType === 'admin') {
      routes = (
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
          <Route path='/admin/users' exact>
            <Users />
          </Route>
          <Route path='/admin/users/:uid'>
            <UpdateUser />
          </Route>
          <Route path='/admin/washplans' exact>
            <WashPlans />
          </Route>
          <Route path='/admin/washplans/new'>
            <NewWashPlan />
          </Route>
          <Route path='/admin/washplans/:wid'>
            <UpdateWashPlan />
          </Route>
          <Route path='/admin/orders' exact>
            <Orders />
          </Route>
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
