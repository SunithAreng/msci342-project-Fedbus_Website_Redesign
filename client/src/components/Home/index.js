import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";
//Dev mode
const serverURL = ""; //enable for dev mode
class HomeBase extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
  token:'',
  userID: ''
  };
  }
  async componentDidMount() {
  if (this.props.authUser.uid !== null) {
  this.setState({ userID: this.props.authUser.uid });
  await this.getToken();
  }
  }
  getToken = async () => {
  const url = serverURL + "/login";
  await this.props.firebase.doGetIdToken(true).then(async idToken => {
  const response = await fetch(url, {
  method: "POST",
  headers: {
  "Content-Type": "application/json"
  },
  body: JSON.stringify({ token: idToken })
  });
  const body = await response.json();
  if (response.status !== 200) {
  this.setState({ token: null });
  throw Error(body.message);
  } else {
  this.setState({ token: body.token });
  }
  });
  };
  signOut() {
  this.setState({ mobileMoreAnchorEl: null });
  };
  signOut() {
  this.setState({ mobileMoreAnchorEl: null });
  this.props.firebase.doSignOut();
  this.props.history.push("/");
  }
  render() {
  return (
  <Grid
  container
  spacing={0}
  direction="column"
  justify="flex-end"
  alignItems="center">
  <Grid>
  <Typography variant='h6'>This is Home Page</Typography>
  </Grid>
  <Grid>
  <Button
  color="primary"
  variant="outlined"
  onClick={this.signOut.bind(this)}
  >
  Sign Out
  </Button>
  </Grid>
  </Grid>
  );
  }
  }
  const Home = compose(
  withRouter,
  withFirebase,
  )(HomeBase);
 

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
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


// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userID: 1,
//       mode: 0
//     }
//   };

//   componentDidMount() {
//     //this.loadUserSettings();
//   }


//   loadUserSettings() {
//     this.callApiLoadUserSettings()
//       .then(res => {
//         //console.log("loadUserSettings returned: ", res)
//         var parsed = JSON.parse(res.express);
//         console.log("loadUserSettings parsed: ", parsed[0].mode)
//         this.setState({ mode: parsed[0].mode });
//       });
//   }

//   callApiLoadUserSettings = async () => {
//     const url = serverURL + "/api/loadUserSettings";

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         //authorization: `Bearer ${this.state.token}`
//       },
//       body: JSON.stringify({
//         userID: this.state.userID
//       })
//     });
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);
//     console.log("User settings: ", body);
//     return body;
//   }

//   render() {
//     const { classes } = this.props;



//     const mainMessage = (
//       <Grid
//         container
//         spacing={0}
//         direction="column"
//         justify="flex-start"
//         alignItems="flex-start"
//         style={{ minHeight: '100vh' }}
//         className={classes.mainMessageContainer}
//       >
//         <Grid item>

//           <Typography
//             variant={"h3"}
//             className={classes.mainMessage}
//             align="flex-start"
//           >
//             {this.state.mode === 0 ? (
//               <React.Fragment>
//                 Hello World!
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 Welcome back!
//               </React.Fragment>
//             )}
//           </Typography>

//         </Grid>
//       </Grid>
//     )


//     return (
//       <MuiThemeProvider theme={theme}>
//         <div className={classes.root}>
//           <CssBaseline />
//           <Paper
//             className={classes.paper}
//           >
//             {mainMessage}
//           </Paper>

//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }

// Home.propTypes = {
//   classes: PropTypes.object.isRequired
// };

//export default withStyles(styles)(Home);
export default Home;