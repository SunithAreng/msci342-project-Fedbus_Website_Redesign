import React, {useEffect} from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import { AppBar, Button, Container, Toolbar, Box, TextField, Snackbar, Grid, Typography,} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
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
            balance : 0,
            pastTrips : '',
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
    };

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
                this.setState({balance : parseInt(parsed[0].balance)})
                this.setState({pastTrips : parsed[0].pastTrips })
                localStorage.setItem('token',this.state.token)
                localStorage.setItem('userURL',this.props.serverURL)
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
        localStorage.clear()
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
                                    key='12'
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
                        <Payment userId = {this.state.userID} serverUrl = {this.props.serverURL} currentBalance = {this.state.balance}/>
                        <div className="History & Settings">
                            <h2>History & Settings</h2>
                            <p />
                            <h3>Trips History</h3>
                            <TripHistory pastTrips = {this.state.pastTrips} serverUrl = {this.props.serverURL}/>
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
const TripHistory = (props) => {
    let tripsArray = []
    let pastTrips = props.pastTrips.split(" ")
    let serverURL = props.serverUrl
    let finalPastTrips = [...new Set(pastTrips)]
    let getPastTrips = (pastTrip) => {
        callGetPastTrips(pastTrip).then((res)=>{
            let parsed = JSON.parse(res.express)
            tripsArray.push(parsed[0])
            console.log(tripsArray)
        }).catch((err)=>{
            console.log(err)
        })
    }

  const callGetPastTrips = async (pastTrip) => {
    const url = serverURL + "/api/getPastTrips";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        pastTrips: pastTrip,
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

    const handleSubmit = () =>{
        finalPastTrips.forEach((val)=>{
            console.log(val)
            getPastTrips(val);
        })
    }
    let columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'destination', headerName: 'destination', width: 70 },
        { field: 'origin', headerName: 'origin', width: 70 },
        { field: 'price', headerName: 'price', width: 70 },
        { field: 'tripDate', headerName: 'tripDate', width: 70 },
        { field: 'tripID', headerName: 'tripID', width: 70 },
    ]
    return (
        <div>
            <Button onClick = {(()=>handleSubmit())}>Hi click me to show results table(not working but check DevTools console )</Button>
            <DataGrid
                rows={tripsArray}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}
const Payment = (props) => {
  let [name, setName] = React.useState('')
  let [number, setNumber] = React.useState('')
  let [mmyy, setMmyy] = React.useState('')
  let [cvv, setCvv] = React.useState('')
  let [money, setMoney] = React.useState()
  let [errorMessage, setErrorMessage] = React.useState('')
  let [successMessage, setSuccessMessage] = React.useState('')
  const regexNumber = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  const regexMMYY =  /^(?:0[1-9]|1[0-2])(\d{2})$/;
  const regexCVV = /^[0-9]{3,4}$/;

  const serverUrl = props.serverUrl;
  const userId = props.userId;
  const currentBalance = props.currentBalance;
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleMoneyChange = (e) => {
    setMoney(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }
  const handleMmyyChange = (e) => {
    setMmyy(e.target.value)
  }
  const handleCvvChange = (e) => {
    setCvv(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccessMessage("")
    if (!name || !number || !mmyy || !cvv){
      setErrorMessage("Please fill out all credit card information")
      return;
    }
    if (!money){
        setErrorMessage("Please enter the amount of money you would like to load into your account")
        return;
    }
    if (!regexNumber.test(number)){
      setErrorMessage("Please enter correct credit card number")
      return;
    }
    if (!regexMMYY.test(mmyy)){
      setErrorMessage("Please enter correct MMYY")
      return;
    }
    if (!regexCVV.test(cvv)){
      setErrorMessage("Please enter correct CVV")
      return;
    }
    const changeMoney = () => {
        var serverURL = serverUrl;
        const url = serverURL + "/api/updateUserBalance";
        console.log("This is the url"+url)
        let newBalance = parseInt(money) + parseInt(currentBalance);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                userID: userId,
                balance : newBalance,
            })
        }).then(() => {
            setErrorMessage("")
            setSuccessMessage ("Money successfully loaded ! Please refresh to see your new updated balance")
            setName("")
            setMoney("")
            setMmyy("")
            setCvv("")
            setNumber("")
        }).catch((error)=>{
            setErrorMessage(error)
        });
    }
    changeMoney();
  }
    return(
    <div className="Payment Method">
        <form>
            <h2>Load money into your balance </h2>
            <h4>Current Balance : {currentBalance}</h4>
            <h3>Cardholder Name</h3>
            <TextField
                variant="outlined"
                type="text"
                style={{ width: '250px' }}
                value={name} onChange={handleNameChange}/>
            <h3>Cardholder Number</h3>
            <TextField
                variant="outlined"
                type="number"
                style={{ width: '250px' }} 
                value={number} onChange={handleNumberChange}/>
            <h3>MMYY</h3>
            <TextField
                variant="outlined"
                type="number"
                value={mmyy}
                style={{ width: '250px' }} onChange={handleMmyyChange}/>
            <h3>CVV</h3>
            <TextField
                variant="outlined"
                type="number"
                style={{ width: '250px' }} value={cvv} onChange={handleCvvChange}/>
            <h3>Amount of money you would like to load in</h3>
            <TextField
                variant="outlined"
                type="number"
                value={money}
                style={{ width: '250px' }} onChange={handleMoneyChange}/>
            <br /><br />
            <Button variant="contained" color="secondary" onClick = {handleSubmit}>
                Confirm payment
            </Button>
            <Typography  variant="subtitle2" color = "secondary">{errorMessage}</Typography>
            <Typography variant="h6" style = {{color : "green"}}>{successMessage}</Typography>
            <br /><br />
            <hr style={{ backgroundColor: 'black', height: '3px', border: '0px' }} />
        </form>
    </div>)}
const MyProfile = compose(
    withRouter,
    withFirebase,
)(MyProfileBase);

export default connect(mapStateToProps)(MyProfile);
