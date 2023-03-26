import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from '@material-ui/core';
import { FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import history from '../../Navigation/history';
import { connect } from 'react-redux';
import { AppMenuBar } from '../../AppMenuBar';

const fetch = require("node-fetch");

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
      light: '#fffff ',
      dark: '#ffa089 '
    },
  },
});


const Review2 = ({ serverURL }) => {

  const [submitClick, setMessage] = React.useState(false);
  const [enteredTitle, setReviewTitle] = React.useState('');
  const [enteredReview, setReviewBody] = React.useState('');
  const [selectedRating, setReviewRating] = React.useState('');
  const [submittedReviews, setSubmittedReviews] = React.useState([]);
  //const [PrevSubmittedReviews, setPrevSubmittedReviews] = React.useState('')
  const [enteredName, setReviewName] = React.useState('')


  const callApiaddReview = async () => {
    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
      , body: JSON.stringify({
        content: enteredReview,
        title: enteredTitle,
        rating: selectedRating,
        name: enteredName
      })
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
  }

  const updateReviewBody = (event) => {
    setReviewBody(event.target.value)
    // console.log(enteredReview)

  }
  const updateReviewTitle = (event) => {
    setReviewTitle(event.target.value)

    // console.log(enteredTitle)
  }
  const updateReviewRating = (event) => {
    setReviewRating(event.target.value)
    // console.log(selectedRating)
  }
  const updateReviewName = (event) => {
    setReviewName(event.target.value)
    // console.log(selectedRating)
  }
  const submitButton = (event) => {
    setMessage(true);

    if (enteredTitle.length > 0 && enteredReview.length > 0 && selectedRating > 0 && enteredName.length > 0) {
      let review = {
        //movie: selectedMovie,
        body: enteredReview,
        title: enteredTitle,
        rating: selectedRating,
        name: enteredName,
      }

      let copy = [...submittedReviews];
      copy.push(review);
      setSubmittedReviews(copy);
      callApiaddReview()
        .then(res => {

          console.log(res);
        })

    }
  }

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
          <i> Add your Bus Review! </i>
          <p></p>
        </Typography>
        <ReviewName currentValue={enteredName} updateReviewName={updateReviewName} submitClick={submitClick}></ReviewName>
        <ReviewTitle currentValue={enteredTitle} updateReviewTitle={updateReviewTitle} submitClick={submitClick}></ReviewTitle>
        <ReviewBody currentValue={enteredReview} updateReviewBody={updateReviewBody} submitClick={submitClick}></ReviewBody>
        <ReviewRating currentValue={selectedRating} updateReviewRating={updateReviewRating} submitClick={submitClick}></ReviewRating>
        <p></p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button variant="contained" color="primary" onClick={submitButton}>
            Submit
          </Button>
          <Button
            key='9'
            onClick={() => history.push('/OtherReviews')}
            type="submit"
            halfWidth
            variant="contained"
            color="secondary"
          >
            Go back
          </Button>
          <div></div>
          <p></p>
        </div>
        <p></p>
        <SubmittedReviews list={submittedReviews} limit={5} />
      </Grid>
      <div></div>
    </MuiThemeProvider>
  )
}


const SubmittedReviews = (props) => {
  return (

    props.list.map((review) => {
      return (
        <>
          <big> <b> {"Your feedback is submitted and under review now!"} </b></big>
        </>
      );

    })
  )
}


const ReviewName = (props) => {
  return (
    <>
      <FormControl style={{ width: "40vw" }}>
        <TextField label="Enter Your Name"
          variant="outlined"
          color="secondary"
          value={props.currentValue}
          onChange={props.updateReviewName} />

      </FormControl>
      {props.currentValue === '' && props.submitClick ? (
        <p><b>Please Enter A Name</b></p>

      ) : (
        <div></div>

      )}
    </>
  )
}

const ReviewTitle = (props) => {
  return (
    <>
      <FormControl style={{ width: "40vw" }}>
        <TextField label="Enter Your Bus Review Title"
          variant="outlined"
          color="secondary"
          value={props.currentValue}
          onChange={props.updateReviewTitle} />

      </FormControl>
      {props.currentValue === '' && props.submitClick ? (
        <p><b>Please Enter A Title</b></p>

      ) : (
        <div></div>

      )}
    </>
  )
}

const ReviewBody = (props) => {
  return (
    <>
      <FormControl style={{ width: "40vw" }}>
        <TextField
          label="Enter Your Bus Review"
          multiline rows={4}
          inputProps={{ maxLength: 200 }} variant="outlined" color="secondary"
          value={props.currentValue}
          onChange={props.updateReviewBody} />

      </FormControl>
      {props.currentValue === '' && props.submitClick ? (
        <p><b> Please Enter Your Review</b></p>

      ) : (
        <div></div>
      )}
    </>
  )
}

const ReviewRating = (props) => {
  return (
    <>
      <p></p>
      <FormControl component="fieldset"
        value={props.currentValue}
        onChange={props.updateReviewRating}>

        <FormLabel color="secondary">Bus Review Rating</FormLabel>

        <RadioGroup row>

          <FormControlLabel value="1" control={<Radio />} label="1/5" />  <FormControlLabel value="2" control={<Radio />} label="2/5" />
          <FormControlLabel value="3" control={<Radio />} label="3/5" />  <FormControlLabel value="4" control={<Radio />} label="4/5" />
          <FormControlLabel value="5" control={<Radio />} label="5/5" />
        </RadioGroup>
      </FormControl>

      {props.currentValue === '' && props.submitClick ? (
        <p><b> Please Select A Rating</b></p>

      ) : (
        <div></div>
      )}

    </>
  )
}

function mapStateToProps(state) {
  const serverURL = state.serverURL.value;
  return {
    serverURL
  };
}

export default connect(mapStateToProps)(Review2);