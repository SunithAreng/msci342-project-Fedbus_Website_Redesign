import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Grid } from '@material-ui/core';


export const Preference = ({ classes, spacing, handleChange, object }) => {
    return (
        <>
            <FormControl className={classes.root} noValidate autoComplete="off">
                <Grid item>
                    <RadioGroup
                        value={spacing}
                        onChange={handleChange}
                        row
                    >
                        {object.map((item) => {
                            const elements = Object.values(item);
                            return (
                                <FormControlLabel key={elements[0]} value={elements[0]} control={<Radio />} label={elements[1]} />
                            )
                        })}
                    </RadioGroup>
                </Grid>
            </FormControl>

        </>
    )
}
