import React from 'react';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Typography, Grid } from '@material-ui/core';
import { AppMenuBar } from '../../AppMenuBar';


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
            <AppMenuBar />
            <br />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h3" component="h4">Important Annoucements:</Typography>
            </Grid>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <br />
                {announcements.map((item) => {
                    i++;
                    return (
                        < div key={item.id}>
                            <ul>
                                <Typography variant="h5" key={item.id}>{i + ". " + item.title}</Typography>
                                {item.content}
                            </ul>
                        </div>
                    )

                }
                )}
            </Grid>
        </MuiThemeProvider>
    )

}