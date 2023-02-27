import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import history from './history';
import SearchSchedule from '../Sunith/SearchSchedule/Search';
import MyProfile from '../Rama/MyProfile/MyProfile';
import Booking from '../Khoi/Booking/Booking';
import Payment from '../Khoi/Payment/Payment';
import FAQ from '../Harry/FAQ/FAQ';
import Location from '../Harry/Location/Location';
import SignInForm from '../Rama/Login/SignIn';
import SignUpForm from '../Rama/Login/SignUp';

export default function PrivateRoute({
  authenticated,
  ...rest
}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/SearchSchedule" exact component={SearchSchedule} />
        <Route path="/SignIn" component={SignInForm} />
        <Route path="/SignUp" component={SignUpForm} />
        <Route
          path="/MyProfile" exact
          {...rest}
          render={props => authenticated === true ?
            (<MyProfile {...props} {...rest} />) : (<SignInForm {...props} {...rest} />)}
        />
        <Route path="/Booking" exact component={Booking} />
        <Route path="/Payment" exact component={Payment} />
        <Route path="/FAQ" exact component={FAQ} />
        <Route path="/Location" exact component={Location} />
      </Switch>
    </Router>
  );
}