import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createTheme, styled } from "@material-ui/core/styles";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import history from '../Navigation/history';
import { AppMenuBar } from '../AppMenuBar';
import { Popup } from './PopupBox';

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: '#ef9a9a',
      light: '#ffcccb',
      dark: '#ba6b6c',
      background: '#eeeeee'
    },
    secondary: {
      main: "#b71c1c",
      light: '#f05545',
      dark: '#7f0000'
    },
  },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
}))

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    return (
      <MuiThemeProvider theme={lightTheme}>
        <Box
          sx={{
            height: '100vh',
            opacity: opacityValue,
            overflow: 'scroll',
            backgroundImage: `url(https://images.unsplash.com/photo-1581277868137-9dc9f38abc2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80)`,
            backgroundSize: "cover"
          }}
        >
          <AppMenuBar />
          <MainGridContainer
            container
            spacing={5}
            style={{ maxWidth: '50%' }}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            overflow="scroll"
          >

            <br />
            <Typography variant="h3" color="inherit">
              Make Commuting Easy
            </Typography>
            <p></p>
            <Typography variant="h5" color="inherit">
              Find your most convenient bus ride!
            </Typography>
            <br />
            <Grid container>
              <Button
                variant='contained'
                key='1'
                onClick={() => history.push('/SearchSchedule')}
                sx={{ my: 2, color: 'white', display: 'block' }}
                color='secondary'
              >
                Let's go
              </Button>
            </Grid>
            <Popup serverURL = {serverURL}/>
          </MainGridContainer>
        </Box>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (Home);
