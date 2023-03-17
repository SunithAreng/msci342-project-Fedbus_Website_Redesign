import React from 'react';
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
          </Toolbar>
        </Container>
      </AppBar>

      <title>FedBus Bus Stops</title>
      <h1>Fedbus Bus Stops</h1>

      <h3>McCowan (Scarborough)</h3>
      <h5>The McCowan Subway stop at the corner of Bushby and McCowan.</h5>
      <iframe title='McCowan' style={{ width: "80%", height: "40%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.774835,-79.251452&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

      <br /><br />

      <h3>York Mills - New Stop</h3>
      <h5>Old York Mills Road - near the Shell gas station and York Mills Station Kiss n' Ride.</h5>
      <iframe title='York Mills' style={{ width: "80%", height: "40%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.743558,%20-79.405683&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" ></iframe>

      <br /><br />

      <h3>Richmond Hill</h3>
      <h5>The York Region Transit and Viva terminal on 8675 Yonge Street. It was built near the ramp that connects Highway 7
        and Yonge Street.</h5>
      <div id="richmondhill"></div>
      <iframe title='Richmond Hill' style={{ width: "80%", height: "40%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.839636,%20%20-79.425580&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

      <br /><br />

      <h3>London</h3>
      <h5>At the bus terminal in CF Masonville Place at the corner of Richmond and Fanshawe.</h5>
      <div id="london"></div>
      <iframe title='London' style={{ width: "80%", height: "40%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.025950,%20-81.281260&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

      <br /><br />

      <h3>Hamilton</h3>
      <h5>Sheraton Hotel entrance at Jackson Square.</h5>
      <div id="hamilton"></div>

      <iframe title='Hamilton' style={{ width: "80%", height: "40%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.257651,%20%20-79.872418&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

      <br /><br />


      <h3>Burlington</h3>
      <h5>Aldershot GO Station, South Parking Lot on Masonry Court.</h5>
      <div id="burlington">
        <iframe title='Burlington' style={{ width: "80%", height: "40%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.312100,%20-79.851843&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
      </div>

      <br /><br />

      <h3>Markham</h3>
      <h5>CF Markville - outlying mall parking off of Bullock Drive - near Best Buy / Pickel Barrel but in outlying parking lots.</h5>

      <iframe title='Markham' style={{ width: "80%", height: "40%", borderRadius: '14px' }} src="https://maps.google.com/maps?q=43.868462,%20-79.291938&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

      <br /><br /><br />
      <hr style={{ height: '2px', backgroundColor: 'orange', border: '0' }} />
      

      <br />

    </>

  );
}

export default Location;
