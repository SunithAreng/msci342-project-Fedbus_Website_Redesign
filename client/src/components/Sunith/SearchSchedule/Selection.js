import React from 'react';
import { MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core';

export const Selection = ({ objectList, handleChange, classes, elementName, label, idlabel, errorState }) => {
    return (
        <>
            <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id={idlabel}>{label}</InputLabel>
                <Select
                    required
                    labelId={idlabel}
                    id={idlabel}
                    value={elementName}
                >
                    {objectList.map((stop) => {
                        const elements = Object.values(stop);
                        return (
                            <MenuItem key={elements[0]} value={elements[1]} onClick={() => handleChange(stop)}>
                                {elements[1]}
                            </MenuItem>
                        )
                    }
                    )}
                </Select>
                <FormHelperText>{errorState ? "Please make a selection" : ""}</FormHelperText>
            </FormControl>
        </>
    )
}