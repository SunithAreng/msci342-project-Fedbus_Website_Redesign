import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import { Dialog, MenuItem } from '@material-ui/core';
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import history from '../../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';


const opacityValue = 0.9;

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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
        "& > *": {
            margin: theme.spacing(1),
            width: 500,
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500,
        },
    },
    paper: {
        height: 140,
        width: 500,
    },
    control: {
        padding: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 400,
    },
    pos: {
        marginBottom: 100,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const stops = [
    {
      title: 'Kitchener',
      id: 1,
    },
    {
      title: 'Waterloo',
      id: 2,
    },
    {
      title: 'Toronto',
      id: 3,
    },
    {
      title: 'Mississauga',
      id: 4,
    },
    {
      title: 'Union Station',
      id: 5,
    }
  ]

const SearchSchdeule =() => {

    const classes = useStyles();
    const [spacing, setSpacing] = React.useState("");
    const [movieName, setMovieName] = React.useState("");
    const [reviewTitle, setReviewTitle] = React.useState("");
    const [userReview, setUserReview] = React.useState("");
    const [movies, setMovies] = React.useState([]);
    const [initialReviews, setInitialReviews] = React.useState([]);
    const [userID, setUserID] = React.useState(1);
    const [movieID, setMovieID] = React.useState(0);

    // React.useEffect(() => {
    //     getMovies();
    // }, []);

    // const getMovies = () => {
    //     callApiGetMovies()
    //         .then(res => {
    //             var parsed = JSON.parse(res.express);
    //             setMovies(parsed);
    //         })
    // }

    // const callApiGetMovies = async () => {
    //     const url = serverURL + "/api/getMovies";
    //     console.log(url);

    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     const body = await response.json();
    //     if (response.status !== 200) throw Error(body.message);
    //     return body;
    // }

    const handleRatingChange = (event) => {
        setSpacing(event.target.value);
        setErrState3(false);
    };

    const handleMovieChange = (selectedMovie) => {
        setMovieName(selectedMovie.name);
        setMovieID(selectedMovie.id);
        setErrState4(false);
    };

    const handleTitleEntry = (event) => {
        setReviewTitle(event.target.value);
        setErrState1(false);
    }

    const handleReviewEntry = (event) => {
        setUserReview(event.target.value);
        setErrState2(false);
    }

    const [open, setOpen] = React.useState(false);
    const [dummy, setDummy] = React.useState();

    const [errState2, setErrState2] = React.useState(false);
    const [errState1, setErrState1] = React.useState(false);
    const [errState3, setErrState3] = React.useState(false);
    const [errState4, setErrState4] = React.useState(false);

    // const rightSubmission = () => {
    //     setOpen(true);
    //     setDummy(33);
    //     const reviewInfo = {
    //         name: movieName,
    //         movies_id: movieID,
    //         user_userID: userID,
    //         reviewScore: spacing,
    //         reviewTitle: reviewTitle,
    //         reviewContent: userReview,
    //     }
    //     addReview();
    //     var d = [reviewInfo];
    //     setInitialReviews(d);
    //     console.log(reviewInfo);
    // }

    // const addReview = () => {
    //     callApiAddReview()
    // }

    // const callApiAddReview = async () => {

    //     const url = serverURL + "/api/addReview";
    //     console.log(url);

    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             //authorization: `Bearer ${this.state.token}`
    //         },
    //         body: JSON.stringify({
    //             movies_id: movieID,
    //             user_userID: userID,
    //             reviewScore: spacing,
    //             reviewTitle: reviewTitle,
    //             reviewContent: userReview,
    //         })
    //     });
    //     const body = await response.json();
    //     if (response.status !== 200) throw Error(body.message);
    //     return body;
    // }

    const emptyBoxes = () => {
        if (movieName === "") {
            setOpen(true);
            setDummy(4);
            setErrState4(true);
        }

        if (!reviewTitle) {
            setOpen(true);
            setDummy(2);
            setErrState1(true);
        }

        if (spacing === "") {
            setOpen(true);
            setDummy(3);
            setErrState3(true);
        }

        if (!userReview) {
            setOpen(true);
            setDummy(1);
            setErrState2(true);
        }
    }

    // const handleClickSubmit = () => {
    //     userReview && spacing && movieName && reviewTitle ? rightSubmission() : emptyBoxes()
    // }

    const clear = () => {
        setMovieName("");
        setReviewTitle("");
        setUserReview("");
        setSpacing("");
        setMovieID(0);
    }

    const clearAll = () => {
        clear();
        setInitialReviews([]);
    }

    const handleToClose = () => {
        setOpen(false);
        if (dummy === 33) {
            clear();
        }
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    overflow: 'scroll',
                    backgroundImage: `url(https://images.unsplash.com/photo-1638722712332-731b0e338e18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
                    backgroundSize: "cover"
                }}
            >
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Button
                                key='3'
                                onClick={() => history.push('/')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                            <Button
                                key='3'
                                onClick={() => history.push('/FAQ')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                FAQ
                            </Button>
                            <Button
                                key='1'
                                onClick={() => history.push('/MyProfile')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                MyProfile
                            </Button>
                            <Button
                                key='2'
                                onClick={() => history.push('/Payment')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Payment
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
                <MainGridContainer
                    container
                    spacing={5}
                    style={{ maxWidth: '50%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    overflow="scroll"
                >
                    <Typography variant="h3" component="div">
                        Get Schedule
                    </Typography>
                    <Grid container>
                        <MovieSelection
                            handleChange={handleMovieChange}
                            classes={classes}
                            movieName={movieName}
                            label={"Origin"}
                            idlabel={"movies-list"}
                            errState={errState4}
                            movies={stops}
                        />
                        <MovieSelection
                            handleChange={handleMovieChange}
                            classes={classes}
                            movieName={movieName}
                            label={"Destination"}
                            idlabel={"movies-list"}
                            errState={errState4}
                            movies={stops}
                        />
                    </Grid>
                    <br />
                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}


const MovieSelection = ({ movies, handleChange, classes, movieName, label, idlabel, errState }) => {
    return (
        <>
            <FormControl variant='outlined' className={classes.formControl} error={errState}>
                <InputLabel id={idlabel}>{label}</InputLabel>
                <Select
                    required
                    labelId={idlabel}
                    id={idlabel}
                    value={movieName}
                >
                    {movies.map((movie) => {
                        return (
                            <MenuItem key={movie.id} value={movie.title} onClick={() => handleChange(movie)}>
                                {movie.title}
                            </MenuItem>
                        )
                    }
                    )}
                </Select>
                <FormHelperText>{errState ? "Please select a movie for review" : ""}</FormHelperText>
            </FormControl>
        </>
    )
}

export default SearchSchdeule;