import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../../Firebase";
import { TextField, Grid, Link, Button, Typography, Container } from "@material-ui/core";
import { connect } from "react-redux";
import history from '../../../Navigation/history';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";


const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

function mapStateToProps(state) {
  const serverURL = state.serverURL.value;
  return {
    serverURL
  };
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      ErrorNote: "",
      browserType: "",
      Errorforemail: false,
      passwordResetEmailSent: false,
      errorPasswordResetEmailSent: false,
      Errorforpw: false,
    };
  }

  componentDidMount() {
    //
  }

  callApiInsertNewUser = async (userID, email) => {
    var serverURL = this.props.serverURL;
    const url = serverURL + "/api/addNewuser";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        user: userID,
        email: email
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/MyProfile");
        var user = userCredential.user.uid;
        localStorage.setItem('userid',user)
        console.log(user);
        this.callApiInsertNewUser(user, email);
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            this.setState({ Errorforemail: true });
            this.setState({ ErrorNote: "Email is already in use" });
            this.setState({ Errorforpw: false });
            break;
          case "auth/invalid-email":
            this.setState({ Errorforemail: true });
            this.setState({ ErrorNote: "Invalid Email" });
            this.setState({ Errorforpw: false });
            break;
          case "auth/weak-password":
            this.setState({ Errorforpw: true });
            this.setState({ ErrorNote: "Weak Password: Must be 6 characters" });
            this.setState({ Errorforemail: false });
            break;
        }
        console.log(this.state.Errorforemail); //for testing
        console.log(this.state.Errorforpw); //for testing
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;
    const isInvalid = password === "" || email === "";
    
    const theme = createTheme({
      palette: {
        type: 'light',
        background: {
          default: "#fff5e6"
        },
        primary: {
          main: "#ffa089",
        },
        secondary: {
          main: "#ffa089",
        },
      },
    });

    return (
      <MuiThemeProvider theme={theme}> 
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Container maxWidth="xs">
              <form noValidate onSubmit={this.onSubmit}>
                <p></p>
                <div>
                  <Typography component="h1" variant="h10" color="primary">
                    Sign Up
                  </Typography>
                </div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={this.onChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                  helperText={this.state.Errorforemail ? this.state.ErrorNote : ""}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputLabelProps={{ shrink: true }}
                  helperText={this.state.Errorforpw ? this.state.ErrorNote : ""}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </form>
              <br />
              <Typography>Have an account?&nbsp;
                <Link key='9' underline='always'
                  onClick={() => history.push('/SignIn')}>Log in!
                </Link>
              </Typography>
            </Container>
          </Grid>
        </Grid>
        <Button
  key='9'
  onClick={() => history.push('/')}
  type="submit"
  halfWidth
  variant="contained"
  color="secondary"
  style={{ position: 'absolute', top: 30, left: 30 }}
>
  Go back
</Button>
      </div>
      </MuiThemeProvider>
    );
  }
}

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default connect(mapStateToProps)(SignUpForm);
