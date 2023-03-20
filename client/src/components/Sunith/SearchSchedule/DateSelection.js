import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export const DateSelection = ({ onChange, date, label }) => {

    const disableUnusedDates = (date) => {
        const day = date.getDay();
        return day === 1 || day === 2 || day === 3 || day === 4 || day === 6;
    };

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label={label}
                    value={date}
                    onChange={onChange}
                    disablePast
                    shouldDisableDate={disableUnusedDates}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </>
    )
}