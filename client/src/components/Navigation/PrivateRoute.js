import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import history from './history';
import SignInForm from '../SignIn';
import LandingPage from '../Landing';
import HomePage from '../Home';

export default function PrivateRoute({
  authenticated,
  ...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact {...rest}
render={props =>
authenticated === true ? (
<HomePage {...props} {...rest} />
) : (
<LandingPage {...props} {...rest} />
)
}
/>
<Route path="/SignIn" component={SignInForm}  />
      </Switch>
    </Router>
  );
}