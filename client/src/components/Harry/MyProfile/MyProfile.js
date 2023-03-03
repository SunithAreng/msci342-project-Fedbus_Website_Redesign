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

// const serverURL = "";

const serverURL = "http://localhost:8081";

class MyProfileBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            userID: '',
            mode: 0
        };
    }

    async componentDidMount() {
        if (this.props.authUser.uid !== null) {
            this.setState({ userID: this.props.authUser.uid });
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
        console.log("called load user settings");

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
                authorization: `Bearer ${this.state.token}`
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


    signOut() {
        this.setState({ mobileMoreAnchorEl: null });
        this.props.firebase.doSignOut();
        this.props.history.push("/");
    }


    render() {
        return (
            <>
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
                <div className="rightbox">
                    <div className="Personal Info">

                        <h2>Personal Info</h2>
                        <h3>Full Name</h3>
                        <input type="text" style={{ width: '100px' }} className="input" defaultValue="Harry Yao" />
                        <h3>Birthday</h3>
                        <input type="text" style={{ width: '140px' }} className="input" defaultValue="January 1, 2000" />
                        <h3>Gender</h3>
                        <input type="text" style={{ width: '60px' }} className="input" defaultValue="Male" />
                        <h3>Email</h3>
                        <input type="text" style={{ width: '200px' }} className="input" defaultValue="example@example.com" />
                        <h3>Password</h3>
                        <input type="password" style={{ width: '100px' }} className="input" defaultValue="brightcode" />
                        <br /><br />
                        <button className="btn">Update Personal Info</button>
                        <br /><br />
                        <hr style={{ backgroundColor: 'black', height: '3px', border: '0px' }} />

                    </div>

                    <div className="Payment Method">
                        <h2>Payment Info</h2>
                        <h3>Payment Method</h3>
                        <input type="text" style={{ width: '200px' }} className="input" defaultValue="Visa - 0919 **** **** 1413" />
                        <h3>Billing Address</h3>
                        <input type="text" style={{ width: '180px' }} className="input" defaultValue="XXX St, Waterloo, ON" />
                        <h3>Postal Code</h3>
                        <input type="text" style={{ width: '80px' }} className="input" defaultValue="N2L XXX" />
                        <br /><br />
                        <button className="btn">Update Payment Method</button>
                        <br /><br />
                        <hr style={{ backgroundColor: 'black', height: '3px', border: '0px' }} />

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
                </div>
            </>
        );
    }
}



const MyProfile = compose(
    withRouter,
    withFirebase,
)(MyProfileBase);

export default MyProfile;
