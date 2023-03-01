import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import history from '../../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

//Dev mode
const serverURL = ""; //enable for dev mode

const fetch = require("node-fetch");

const opacityValue = 0.1;

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#FFEFD5"
    },
    primary: {
      main: "#FFEFD5",
    },
    secondary: {
      main: "#FFDAB9",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#52f1ff",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});

const FAQ = (props) => {

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Button
              key='1'
              onClick={() => history.push('/')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              key='2'
              onClick={() => history.push('/SearchSchedule')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Schedule
            </Button>
            <Button
              key='3'
              onClick={() => history.push('/SignIn')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Sign In
            </Button>
            <Button
              key='9'
              onClick={() => history.push('/SignUp')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Sign Up
            </Button>
            <Button
              key='4'
              onClick={() => history.push('/MyProfile')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              MyProfile
            </Button>
            <Button
              key='5'
              onClick={() => history.push('/Booking')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Booking
            </Button>
            <Button
              key='6'
              onClick={() => history.push('/Payment')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Payment
            </Button>
            <Button
              key='7'
              onClick={() => history.push('/FAQ')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              FAQ
            </Button>
            <Button
              key='8'
              onClick={() => history.push('/Location')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Location
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" component="h4">
          <p> </p>
          <u> Frequently Asked Questions </u>
        </Typography>
        <div>
        </div>
        <p> </p>
        <Typography>
          <b><big> How can I book? </big></b>
          <p> </p>
          Head over to the booking page and choose your desired date and locations.
          <p> </p>
          <div> <big><b> How can I pay? </b> </big> </div>
          <p> </p>
          Head over to the payments page!
          <p> <b> <big> How much luggage can I get? </big> </b> </p>
          <p> </p>
          <p> Luggage is Limited to anything that fits on your lap</p>
          <b> <big> Are Masks required? </big></b>
          <p> </p>
          Although Masks are not required, they are still recommended when travelling Fed Bus.
          <p> </p>
          <b> <big> When should I arrive to my bus' pickup location? </big> </b>
          <p></p>
          Arrive 15 minutes before your departure time
          <p> </p>
          <b> <big> Do I need to bring my WatCard? </big></b>
          <p> </p>
          You must bring your Watcard when you buy your Fed Bus tickets and when boarding the bus!
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p>
          <b> If you have more questions about the Fedbus, get in touch:  </b>
          <div> <b> Email: </b>turnkeys@uwaterloo.ca. </div>
          <div> <b> Phone Number: </b> 519-888-4434 </div>
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p>
          <b> If you have more questions about the GoBus, get in touch:  </b>
          <div> <b> Customer Comment Form: </b>https://www.gotransit.com/en/contact-us/customer-comment-form </div>
          <div> <b> Phone Number: </b> 416-869-3600 </div>
          {/* <Button variant="contained" color="secondary">
          Contact Us
        </Button> */}
        </Typography>
      </Grid>
    </MuiThemeProvider>
  )

}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FAQ);

