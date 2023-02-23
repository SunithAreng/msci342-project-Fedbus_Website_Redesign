import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import history from './history';
import SearchSchedule from '../Sunith/SearchSchedule';
import Login from '../Rama/Login';
import MyProfile from '../Rama/MyProfile';
import Booking from '../Khoi/Booking';
import Payment from '../Khoi/Payment';
import FAQ from '../Harry/FAQ';
import Location from '../Harry/Location';

export default function PrivateRoute() {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/SearchSchedule" exact component={SearchSchedule} />
      <Route path="/Login" exact component={Login} />
      <Route path="/MyProfile" exact component={MyProfile} />
      <Route path="/Booking" exact component={Booking} />
      <Route path="/Payment" exact component={Payment} />
      <Route path="/FAQ" exact component={FAQ} />
      <Route path="/Location" exact component={Location} />
      </Switch>
    </Router>
  );
}