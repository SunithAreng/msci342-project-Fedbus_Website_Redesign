import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Grid, Button, Link } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import history from '../../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

// import Link from "@material-ui/core"

//Dev mode
// const serverURL = ""; //enable for dev mode

// const fetch = require("node-fetch");
const opacityValue = 0.1;

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#FFEFD5"
    },
    primary: {
      main: "#FFEFD5",
    },
    secondary: {
      main: "#FFDAB9",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#FFDAB9",
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

const useStyles = makeStyles({
  root: {
    minWidth: 1000,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  expandedCard: {
    height: 'auto',
    transition: 'height 0.5s',
  },
  cardContent: {
    overflow: 'auto',
  },
});

const FAQ = (props) => {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  //const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);
  const [expanded5, setExpanded5] = React.useState(false);
  const [expanded6, setExpanded6] = React.useState(false);
  const [expanded7, setExpanded7] = React.useState(false);
  const [expanded8, setExpanded8] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };
  const handleExpandClick4 = () => {
    setExpanded4(!expanded4);
  };
  const handleExpandClick5 = () => {
    setExpanded5(!expanded5);
  };
  const handleExpandClick6 = () => {
    setExpanded6(!expanded6);
  };
  const handleExpandClick7 = () => {
    setExpanded7(!expanded7);
  };
  const handleExpandClick8 = () => {
    setExpanded8(!expanded8);
  };



  return (
    <MuiThemeProvider theme={theme}>
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
            <Button
              key='11'
              onClick={() => history.push('/Annoucements')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Annoucements
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        
      >
        <Typography variant="h4" component="h4">
          <p> </p>
          <i> Frequently Asked Questions </i>
        </Typography>
        <div>
        </div>
        <p> </p>

        <Card className={classes.root} variant="outlined" style={{ backgroundColor: '#fff5e6' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" style={{ marginRight: 'auto', }}>
                How can I book?
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography> Head over to&nbsp;
                  <Link key='9' underline='none' onClick={() => history.push('/SearchSchedule')}>
                    <span style={{ textDecoration: 'underline', color: 'blue' }}>Schedule Page</span>
                  </Link> and choose your desired date and location
                </Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>
    

        <Card className={classes.root} variant="outlined" style={{ backgroundColor: '#fff5e6' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" style={{ marginRight: 'auto' }}>
                How can I pay?
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded2,
                })}
                onClick={handleExpandClick2}
                aria-expanded={expanded2}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Collapse in={expanded2} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography> Head over to&nbsp;
                  <Link key='9' underline='none' onClick={() => history.push('/SearchSchedule')}>
                    <span style={{ textDecoration: 'underline', color: 'blue' }}>Schedule Page</span>
                  </Link> and choose your desired date and location, choose a trip, then proceed to payment!
                </Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>

        <Card className={classes.root} variant="outlined" style={{ backgroundColor: '#fff5e6' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" style={{ marginRight: 'auto' }}>
                Does the fedbus run during reading week & examination week?
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded2,
                })}
                onClick={handleExpandClick4}
                aria-expanded={expanded4}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Collapse in={expanded4} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography> No the fedbus does not run during reading week & examination weeks.
                </Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>
    
        <Card className={classes.root} variant="outlined" style={{ backgroundColor: '#fff5e6' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" style={{ marginRight: 'auto' }}>
                How much luggage can I get?
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded3,
                })}
                onClick={handleExpandClick3}
                aria-expanded={expanded3}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Collapse in={expanded3} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography>Luggage is Limited to anything that fits on your lap </Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>

        <Card className={classes.root} variant="outlined" style={{ backgroundColor: '#fff5e6' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" style={{ marginRight: 'auto' }}>
                When should I arrive to my bus' pickup location?
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded5,
                })}
                onClick={handleExpandClick5}
                aria-expanded={expanded5}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Collapse in={expanded5} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography>Arrive 15 minutes before your departure time.</Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>

        <Card className={classes.root} variant="outlined" style={{ backgroundColor: '#fff5e6' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" style={{ marginRight: 'auto' }}>
                Where can I see any announcements about the bus?
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded7,
                })}
                onClick={handleExpandClick7}
                aria-expanded={expanded7}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Collapse in={expanded7} timeout="auto" unmountOnExit>
              <CardContent>

              <Typography> Head over to&nbsp;
                  <Link key='9' underline='none' onClick={() => history.push('/Annoucements')}>
                    <span style={{ textDecoration: 'underline', color: 'blue' }}>Announcements Page</span>
                  </Link> by navigating to the top bar.
                  </Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>

        <Card className={classes.root} variant="outlined" style={{ backgroundColor: '#fff5e6' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" style={{ marginRight: 'auto' }}>
               Can I use the fedbus during the week?
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded8,
                })}
                onClick={handleExpandClick8}
                aria-expanded={expanded8}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Collapse in={expanded8} timeout="auto" unmountOnExit>
              <CardContent>

              <Typography> The fedbus is only available on Friday & Sunday
                  </Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>



        <Card className={classes.root} variant="contained" style={{ backgroundColor: '#fff5e6' }}>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" style={{ marginRight: 'auto' }}>
                Do I need to bring my WatCard?
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded6,
                })}
                onClick={handleExpandClick6}
                aria-expanded={expanded6}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <Collapse in={expanded6} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>You must bring your Watcard when you buy your Fed Bus tickets and when boarding the bus!</Typography>
              </CardContent>
            </Collapse>
          </CardContent>
        </Card>


        <Typography>
          <p></p>
          <b> If you have more questions about the Fedbus, Get in touch:  </b>
          <div> <b>📩 Email:  </b> <a href="mailto:turnkeys@uwaterloo.ca">turnkeys@uwaterloo.ca</a>.  </div>
          <div> <b>📲 Phone Number: </b> <a href="tel:+15198884434">519-888-4434</a> </div>
        </Typography>
      </Grid>
    </MuiThemeProvider>

  )

}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FAQ);
