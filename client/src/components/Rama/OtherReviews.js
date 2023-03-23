import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, Card, CardContent } from '@material-ui/core';
import history from '../Navigation/history';
import { AppMenuBar } from '../AppMenuBar';
import { useSelector } from 'react-redux';

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "FFEFD5"
    },
    primary: {
      main: '#FFEFD5',
      light: '#ffcccb',
      dark: '#ffa089 ',
      background: '#eeeeee'
    },
    secondary: {
      main: "#ffa089 ",
      light: '#ffa089 ',
      dark: '#ffa089 '
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
    marginLeft: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(3),
    },
  },
  paper: {
    overflow: "hidden"
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },
});


export const Review2 = ({ reviews }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppMenuBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5" component="h5">
          <p></p>
          <div></div>
          <div></div>
          <div></div>
          <i> Customer's Feedback! </i>
          <p></p>
        </Typography>
        <Button
          key='9'
          onClick={() => history.push('/Review')}
          type="submit"
          halfWidth
          variant="contained"
          color="primary"
        >
          Add your review
        </Button>
        <div></div>
        <p></p>
        <div>
        </div>
        <p></p>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {reviews.map((data) => {
          return (
            <>
             <Card style={{ backgroundColor: '#fffff', width: '800px', border: '1px solid #ffe0ae', borderRadius: '5px' }}>
  <CardContent>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <big> <b> {data.user}</b></big>
        <hr style={{ height: '1px', backgroundColor: '#ccc', border: '0', width: '600px' }} />
        <p> <b> Title: </b>{data.title} </p>
        <p><b>Review: </b> {data.content}  </p>
      </div>
      <div>
        <h4> Rating: {<ReviewStars arr={data.score} />}</h4>
      </div>
    </div>
  </CardContent>
</Card>
            </>
          )
        })}
      </Grid>
      <CardContent />
    </MuiThemeProvider>

  )
}

const ReviewStars = ({ arr }) => {
  let a = "⭐"
  for (let i = 1; i < arr; i++) {
    a = a + "⭐"
  }
  return a;
}


const GetReviewsAPI = () => {
  const serverURL = useSelector((state) => state.serverURL.value);

  React.useEffect(() => {
    getReviews();
  }, []);

  const [reviews, setReviews] = React.useState([]);

  const getReviews = () => {
    callApigetReviews()
      .then(res => {
        console.log("callApigetReviews returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApigetReviews parsed: ", parsed);
        setReviews(parsed);
        console.log(reviews);
      })
  }

  const callApigetReviews = async () => {

    const url = serverURL + "/api/getReviews";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  return reviews;
}

const OtherReviews = () => {
  const reviews = GetReviewsAPI();
  return (
    <Review2 reviews={reviews} />
  );
}

export default OtherReviews;