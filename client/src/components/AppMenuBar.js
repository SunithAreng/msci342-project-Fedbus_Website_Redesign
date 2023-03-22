import React from 'react';
import history from './Navigation/history';
import { Button, CssBaseline, Container, Toolbar, AppBar } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

export const AppMenuBar = () => {

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
            <CssBaseline />
        </MuiThemeProvider>
    )
}