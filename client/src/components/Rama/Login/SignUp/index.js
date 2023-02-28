import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../../Firebase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

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

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/MyProfile");
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            this.setState({ Errorforemail: true });
            this.setState({ ErrorNote: error.note });
            break;
          case "auth/weak-password":
            this.setState({ Errorforpw: true });
            this.setState({ ErrorNote: error.note });
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
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    return (
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
                />
                <React.Fragment>
                  {this.state.passError ? (
                    <Typography>{this.state.errorMsg}</Typography>
                  ) : (
                    ""
                  )}
                </React.Fragment>

                <React.Fragment>
                  {this.state.emailError ? (
                    <Typography>{this.state.errorMsg}</Typography>
                  ) : (
                    ""
                  )}
                </React.Fragment>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </form>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpForm;