import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';

export const StopSelection = ({ stations, handleChange, classes, stopName, label, idlabel }) => {
    return (
        <>
            <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id={idlabel}>{label}</InputLabel>
                <Select
                    required
                    labelId={idlabel}
                    id={idlabel}
                    value={stopName}
                >
                    {stations.map((stop) => {
                        return (
                            <MenuItem key={stop.id} value={stop.station_name} onClick={() => handleChange(stop)}>
                                {stop.station_name}
                            </MenuItem>
                        )
                    }
                    )}
                </Select>
            </FormControl>
        </>
    )
}