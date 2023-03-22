import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, TextField, Card, CardContent } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import history from '../Navigation/history';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

//Dev mode
const serverURL = ""; //enable for dev mode

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "FFEFD5"
    },
    primary: {
      main: '#FFEFD5',
      light: '#ffcccb',
      dark: '#ffa089 ',
      background: '#eeeeee'
    },
    secondary: {
      main: "#ffa089 ",
      light: '#ffa089 ',
      dark: '#ffa089 '
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(3),
    },
  },
  paper: {
    overflow: "hidden"
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },
});


const Review2 = () => {
  React.useEffect(() => {
    getReviews();
  }, []);
  
  const callApigetReviews = async () => {
    const url = serverURL + "/api/getReviews";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }
    
    const getReviews = () => {
      callApigetReviews()
        .then(res => {
          console.log("callApigetReviews returned: ", res)
          var parsed = JSON.parse(res.express);
          console.log("callApigetReviews parsed: ", parsed);
          setReviews(parsed);
          console.log(reviews);
        })
    }
  
    const [reviews, setReviews] = React.useState([]);

    
  

  return (
    <MuiThemeProvider theme={theme}>

      <CssBaseline />
      <Review />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5" component="h5">
          <p></p>
          <div></div>
          <div></div>
          <div></div>
          <i> Customer's Feedback! </i>
          <p></p>
        </Typography>
        <Button
          key='9'
          onClick={() => history.push('/Review')}
          type="submit"
          halfWidth
          variant="contained"
          color="primary"
        >
          Add your review
        </Button>
        <div></div>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {reviews.map((data)=> { 
          return(
            <>
          <Card style={{ backgroundColor: '#fffff', width: '800px' }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {/* <p> {"1."} </p> */}
                <big> <b> Name: {data.user}</b></big>
                <hr style={{ height: '1px', backgroundColor: '#ffe0ae', border: '0', width: '600px' }} />
                <p> <b> Title: </b>{data.title} </p>
                <p><b>Review: </b> {data.content}  </p>
              </div>
              <div>
                <h2> Rating: </h2> 
              </div>
            </div>
          </CardContent>
        </Card>
          </>
          )
         })}
       
        <Card style={{ backgroundColor: '#FFEFD5', width: '800px' }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {/* <p> {"2."} </p> */}
                <big> <b> {"Alex E"}</b></big>
                <hr style={{ height: '2px', backgroundColor: 'black', border: '0', width: '600px' }} />
                <p> <b> Title: </b>{"Great experience"} </p>
                <p><b>Review: </b> {"good bus"}  </p>
              </div>
              <div>
                <h2> {"⭐⭐⭐⭐⭐"}  </h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#fffff', width: '800px' }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {/* <p> {"3."} </p> */}
                <big> <b> {"Sarah M"}</b></big>
                <hr style={{ height: '2px', backgroundColor: '#ffe0ae', border: '0', width: '600px' }} />
                <p> <b> Title: </b>{"okay experience"} </p>
                <p><b>Review: </b> {"it was okay"}  </p>
              </div>
              <div>
                <h2> {"⭐⭐⭐"}  </h2>
              </div>
            </div>
          </CardContent>
        </Card>

      </Grid>
      <CardContent />
    </MuiThemeProvider>

  )
}


const Review = (props) => {
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
            <Button
              key='10'
              onClick={() => history.push('/OtherReviews')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Reviews
            </Button>
            <Button
              key='11'
              onClick={() => history.push('/Annoucements')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Annoucements
            </Button>
          </Toolbar>

        </Container>
      </AppBar>
      <CssBaseline />
    </MuiThemeProvider>
  )
}

export default Review2;