import React from 'react';
import { MuiThemeProvider, createTheme, withStyles } from "@material-ui/core/styles";
import history from '../../Navigation/history';
import { AppBar, Container, Toolbar, Typography, Grid, Button, CssBaseline } from '@material-ui/core';


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

export const AnnoucementsRender = ({ announcements }) => {

    let i = 0;

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
                            onClick={() => history.push('/Review')}
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
            <br />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h3" component="h4">Important Annoucements:</Typography>
                <br />
                {announcements.map((item) => {
                    i++;
                    return (
                        <>
                            <p>
                                <Typography variant="h5" key={item.id}>{i + ". " + item.title}</Typography>
                                {item.content}
                            </p>
                        </>
                    )

                }
                )}
            </Grid>
        </MuiThemeProvider>
    )

}