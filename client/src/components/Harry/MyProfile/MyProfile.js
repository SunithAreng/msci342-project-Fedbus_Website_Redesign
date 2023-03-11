import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import history from '../../Navigation/history';
import logo from './logo.png';
import Box from "@material-ui/core/Box";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const serverURL = "";

// const serverURL = "http://localhost:8081";

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

class MyProfileBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            userID: '',
            mode: 0,
            firstName: '',
            lastName: '',
            phone: 0,
            email: '',
            pw: ''
        };
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
            });
    }

    callApiLoadUserSettings = async () => {
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

    // onSubmit = () => {
    //     const callApiUpdateUser = () => {
    //         const url = serverURL + "/api/updateUser";

    //         const response = fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 // authorization: `Bearer ${this.state.token}`
    //             },
    //             body: JSON.stringify(this.state)
    //         });
    //     }
    //     callApiUpdateUser();
    //     console.log("success")
    // }

    render() {
        return (
            <ThemeProvider theme={lightTheme}>
                <Box
                    sx={{
                        height: '100vh',
                        opacity: opacityValue,
                        overflow: 'scroll',
                        // backgroundImage: `url(https://images.unsplash.com/photo-1638722712332-731b0e338e18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
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
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <br />
                    <img src={logo} alt="" />
                    <br /><br />
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
                            <br />
                            <br />
                            <Button variant="contained" color="secondary">
                                Update Personal Info
                            </Button>
                            <h3>Email</h3>
                            <TextField
                                variant="outlined"
                                type="text"
                                style={{ width: '250px' }}
                                className="input"
                                value={this.state.email}
                            />
                            <h3>Password</h3>
                            <TextField
                                variant="outlined"
                                type="password"
                                style={{ width: '250px' }}
                                className="input"
                                defaultValue="brightcode" />
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

export default MyProfile;
