import React from 'react';
import './style.css';
import logo from './logo.png';
import history from '../../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

const Location = () => {
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
                        </Toolbar>
                    </Container>
                </AppBar>
    <br/>
    <img src={logo} alt=""/>
    <br/><br/>
<hr style= {{backgroundColor: 'black',height:'4px', border: '0px'}}/>

    <title>FedBus Bus Stops</title>
    <h1>Bus Stops</h1>

  <h3>McCowan (Scarborough)</h3>
  <h5>The McCowan Subway stop at the corner of Bushby and McCowan.</h5>

  
    <iframe style= {{width:"80%", height:"40%", borderRadius: '14px'}}src="https://maps.google.com/maps?q=43.774835,-79.251452&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    <br /><br />

    <h3>York Mills - New Stop</h3>
  <h5>Old York Mills Road - near the Shell gas station and York Mills Station Kiss n' Ride.</h5>
  <iframe style= {{width:"80%", height:"40%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.743558,%20-79.405683&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" ></iframe>
    <br /><br />

    <h3>Richmond Hill</h3>
  <h5>The York Region Transit and Viva terminal on 8675 Yonge Street. It was built near the ramp that connects Highway 7
    and Yonge Street.</h5>
  <div id="richmondhill"></div>
  <iframe style= {{width:"80%", height:"40%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.839636,%20%20-79.425580&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>


  <br /><br />

  

  <h3>London</h3>
  <h5>At the bus terminal in CF Masonville Place at the corner of Richmond and Fanshawe.</h5>
  <div id="london"></div>

  <iframe style= {{width:"80%", height:"40%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.025950,%20-81.281260&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
<br /><br />

  <h3>Hamilton</h3>
  <h5>Sheraton Hotel entrance at Jackson Square.</h5>
  <div id="hamilton"></div>

  <iframe style= {{width:"80%", height:"40%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.257651,%20%20-79.872418&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

  <br /><br />
  

  <h3>Burlington</h3>
  <h5>Aldershot GO Station, South Parking Lot on Masonry Court.</h5>
  <div id="burlington"></div>

  <iframe style= {{width:"80%", height:"40%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.312100,%20-79.851843&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

  <br /><br />

  <h3>Markham</h3>
  <h5>CF Markville - outlying mall parking off of Bullock Drive - near Best Buy / Pickel Barrel but in outlying parking lots.</h5>

  <iframe style= {{width:"80%", height:"40%", borderRadius: '14px'}} src="https://maps.google.com/maps?q=43.868462,%20-79.291938&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

    <br /><br /><br />
    <hr style={{ height: '2px', backgroundColor: 'black', border:'0'}}/>
    <h3>Useful Information</h3>
  <h5>1. The Fed Bus is a school bus. Only baggage that will fit on your lap or under your seat will be accommodated.
    <br/>
    2. Tickets are limited, please purchase early!
    <br/>
    3. You must show your Watcard for every ticket purchase and upon boarding.
    <br/>
    4. The Fed Bus does not run during examination periods. When classes finish, so does the Fed Bus.
    <br/>
    5. No refunds on ticket purchases. Please arrive 15 minutes prior to your departure time.
  </h5>

  
  <hr style={{ height: '2px', backgroundColor: 'black',border:'0'}}/>
  <h3>Contact</h3>
  <h5>Student Life Centre - Turnkey Desk:
    <br />
    200 University Ave West
    <br/ >
    Waterloo, ON N2L 3G1
    <br/>
    519-888-4434
    <br/ >
    turnkeys@uwaterloo.ca <br/>
  </h5>
  
  <h5>Fed Bus Email:
  <br />
    fedbus@wusa.ca
  </h5>

  <br/>
    
    </>

  );
}

export default Location;
