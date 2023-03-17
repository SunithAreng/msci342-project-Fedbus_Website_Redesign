import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import { AppBar, Button, Container, Toolbar, Box, TextField, Snackbar, Grid } from '@material-ui/core';
import history from '../../Navigation/history';
import logo from './logo.png';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from "react-redux";

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

const opacityValue = 0.9;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function mapStateToProps(state) {
    const serverURL = state.serverURL.value;
    return {
        serverURL
    };
}

class MyProfileBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            userID: '',
            mode: 0,
            firstName: '',
            lastName: '',
            phone: null,
            email: '',
            newEmail: '',
            admin: 0,
            open: false,
            currentPassword: '',
            newPassword: '',
            errAuth: false,
            passwordChanged: false,
            errPw: false,
            emailChanged: false,
            errEmail: false,
            errMsg: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }


    async componentDidMount() {
        if (this.props.authUser.uid !== null) {
            this.setState({ userID: this.props.authUser.uid });
            // this.setState({ pw: this.props.authUser.password });
            await this.getToken();
            this.loadUserSettings();
        }
    }

    getToken = async () => {
        var serverURL = this.props.serverURL;
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

    loadUserSettings() {
        this.callApiLoadUserSettings()
            .then(res => {
                var parsed = JSON.parse(res.express);
                this.setState({ mode: parsed[0].mode });
                this.setState({ firstName: parsed[0].firstName });
                this.setState({ lastName: parsed[0].lastName });
                this.setState({ email: parsed[0].email });
                this.setState({ phone: parsed[0].phone });
                this.setState({ admin: parsed[0].admin });
            });
    }

    callApiLoadUserSettings = async () => {
        var serverURL = this.props.serverURL;
        const url = serverURL + "/api/loadUserDetails";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify(this.state)
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("User settings: ", body);
        return body;
    }

    signOut() {
        this.setState({ mobileMoreAnchorEl: null });
        this.props.firebase.doSignOut();
        this.props.history.push("/");
    }


    changeFname = (event) => this.setState({ firstName: event.target.value })
    changeLname = (event) => this.setState({ lastName: event.target.value })
    changePhone = (event) => {
        if (event.target.value.toString().length <= 10) {
            this.setState({ phone: event.target.value })
        }
    }

    onSubmit = () => {
        const callApiUpdateUser = () => {
            var serverURL = this.props.serverURL;
            const url = serverURL + "/api/updateUser";

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // authorization: `Bearer ${this.state.token}`
                },
                body: JSON.stringify({
                    userID: this.state.userID,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phone: this.state.phone
                })
            });
        }
        callApiUpdateUser();
        this.setState({ open: true })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ emailChanged: false });
        this.setState({ passwordChanged: false });
        this.setState({ open: false });
        this.setState({ errAuth: false });
    };

    onChangeNewPw = (event) => this.setState({ newPassword: event.target.value });
    onChangeCurrPw = (event) => this.setState({ currentPassword: event.target.value });
    onChangeNewEmail = (event) => this.setState({ newEmail: event.target.value })

    changePassword = () => {
        this.props.firebase.doReAuthenticateUser(this.state.currentPassword).then((data) => {
            this.props.firebase.doPasswordUpdate(this.state.newPassword).then(() => {
                console.log("success")
                this.setState({ passwordChanged: true });
            }).catch((error) => {
                console.log("Unsucessful to change pw")
                this.setState({ errPw: true })
                this.setState({ errMsg: error.message })
                this.setState({ errEmail: false })
            })
        }).catch((error) => {
            this.setState({ errMsg: error.message })
            this.setState({ errAuth: true })
        });
    }

    changeEmail = () => {
        this.props.firebase.doReAuthenticateUser(this.state.currentPassword).then(() => {
            this.props.firebase.doEmailUpdate(this.state.newEmail).then(() => {
                const callApiUpdateUserEmail = () => {
                    var serverURL = this.props.serverURL;
                    const url = serverURL + "/api/updateEmail";
                    fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            // authorization: `Bearer ${this.state.token}`
                        },
                        body: JSON.stringify({
                            userID: this.state.userID,
                            newEmail: this.state.newEmail
                        })
                    });
                }
                callApiUpdateUserEmail();
                this.setState({ emailChanged: true });
            }).catch((error) => {
                console.log("Unsucessful to change email")
                this.setState({ errPw: false })
                this.setState({ errMsg: error.message })
                this.setState({ errEmail: true })
            })
        }).catch((error) => {
            this.setState({ errMsg: error.message })
            this.setState({ errAuth: true })
        });
    }

    render() {
        return (
            <ThemeProvider theme={lightTheme}>
                <Box
                    sx={{
                        height: '100vh',
                        opacity: opacityValue,
                        overflow: 'scroll',
                        backgroundSize: "cover"
                    }}
                >
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
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={this.signOut.bind(this)}
                                >
                                    Sign Out
                                </Button>
                                <Button
                  key='10'
                  onClick={() => history.push('/OtherReviews')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Reviews
                </Button>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <br />
                    <img src={logo} alt="" />
                    <br /><br />
                    {this.state.admin == 1 ?
                        (<Link to={{
                            pathname: '/Admin', state: {
                                stuff: this.state.admin
                            }
                        }} style={{ textDecoration: 'none', marginLeft: '10px' }}>
                            <Button variant="contained" color="secondary">
                                Admin
                            </Button> <br /><br />
                        </Link>) : ""}
                    <hr style={{ backgroundColor: 'black', height: '4px', border: '0px' }} />
                    <MainGridContainer
                        container
                        spacing={5}
                        style={{ maxWidth: '50%' }}
                        direction="column"
                        justify="flex-start"
                        alignItems="stretch"
                        overflow="scroll"
                    >
                        <div className="Personal Info">
                            <h2>Personal Info</h2>
                            <h3>First Name</h3>
                            <TextField
                                variant="outlined"
                                type="text"
                                style={{ width: '250px' }}
                                className="input"
                                value={this.state.firstName}
                                onChange={this.changeFname} />
                            <h3>Last Name</h3>
                            <TextField
                                variant="outlined"
                                type="text"
                                style={{ width: '250px' }}
                                className="input"
                                value={this.state.lastName}
                                onChange={this.changeLname} />
                            <h3>Phone</h3>
                            <TextField
                                variant="outlined"
                                type="number"
                                style={{ width: '250px' }}
                                className="input"
                                value={this.state.phone}
                                onChange={this.changePhone} />
                            <br /><br />
                            <Button variant="contained" color="secondary" onClick={this.onSubmit}>
                                Update Personal Info
                            </Button>
                            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="success">
                                    Your changes have been saved!
                                </Alert>
                            </Snackbar>
                        </div>
                        <div className="Credential Change">
                            <h2>User Credentials</h2>
                            <div className="Email Change">
                                <h3>Current Credentials</h3>
                                <TextField
                                    variant="outlined"
                                    type="email"
                                    style={{ width: '250px' }}
                                    className="input"
                                    value={this.state.email}
                                    label={"Current Email"}
                                    idlabel={"current-email"}
                                />
                                <br /> <br />
                                <TextField
                                    variant="outlined"
                                    type="password"
                                    label={"Current Password"}
                                    idlabel={"current-password"}
                                    style={{ width: '250px' }}
                                    className="input"
                                    value={this.state.currentPassword}
                                    onChange={this.onChangeCurrPw}
                                />

                            </div>
                            <div className="Password Change">
                                <h3>New Credentials</h3>
                                <TextField
                                    variant="outlined"
                                    label={"New Email"}
                                    idlabel={"new-email"}
                                    type="email"
                                    style={{ width: '250px' }}
                                    className="input"
                                    value={this.state.newEmail}
                                    onChange={this.onChangeNewEmail}
                                    helperText={this.state.errEmail ? this.state.errMsg : ""}
                                />
                                <br /><br />
                                <Button variant="contained" color="secondary" onClick={this.changeEmail.bind(this)}>
                                    Update Email
                                </Button>
                                <Snackbar open={this.state.emailChanged} autoHideDuration={6000} onClose={this.handleClose}>
                                    <Alert onClose={this.handleClose} severity="success">
                                        Your email has been updated!
                                    </Alert>
                                </Snackbar>
                                <br /> <br /> <br />
                                <TextField
                                    variant="outlined"
                                    type="password"
                                    label={"New Password"}
                                    idlabel={"new-password"}
                                    style={{ width: '250px' }}
                                    className="input"
                                    value={this.state.newPassword}
                                    onChange={this.onChangeNewPw}
                                    helperText={this.state.errPw ? this.state.errMsg : ""}
                                />
                                <br /><br />
                                <Button variant="contained" color="secondary" onClick={this.changePassword.bind(this)}>
                                    Update Password
                                </Button>
                                <Snackbar open={this.state.errAuth} autoHideDuration={6000} onClose={this.handleClose}>
                                    <Alert onClose={this.handleClose} severity="error">{this.state.errMsg}</Alert>
                                </Snackbar>
                                <Snackbar open={this.state.passwordChanged} autoHideDuration={6000} onClose={this.handleClose}>
                                    <Alert onClose={this.handleClose} severity="success">
                                        Your password has been changed!
                                    </Alert>
                                </Snackbar>
                            </div>
                            <br /> <br />
                            <hr style={{ backgroundColor: 'black', height: '3px', border: '0px' }} />
                        </div>
                        <div className="Payment Method">
                            <form>
                                <h2>Payment Info</h2>
                                <h3>Payment Method</h3>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    style={{ width: '250px' }}
                                    className="input"
                                    defaultValue="Visa - 0919 **** **** 1413" />
                                <h3>Billing Address</h3>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    style={{ width: '250px' }}
                                    className="input"
                                    defaultValue="XXX St, Waterloo, ON" />
                                <h3>Postal Code</h3>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    style={{ width: '250px' }}
                                    className="input"
                                    defaultValue="N2L XXX" />
                                <br /><br />
                                <Button variant="contained" color="secondary">
                                    Update Payment Method
                                </Button>
                                <br /><br />
                                <hr style={{ backgroundColor: 'black', height: '3px', border: '0px' }} />
                            </form>
                        </div>
                        <div className="History & Settings">
                            <h2>History & Settings</h2>
                            <p />
                            <h3>Trips History</h3>
                            <p />
                            <h3>Favorite Trips</h3>
                            <p />
                            <h3>Route Watchlist</h3>
                            <p />
                            <h3>My Reviews</h3>
                            <p />

                            <br />
                        </div>
                    </MainGridContainer>
                </Box>
            </ThemeProvider>
        );
    }
}

const MyProfile = compose(
    withRouter,
    withFirebase,
)(MyProfileBase);

export default connect(mapStateToProps)(MyProfile);
