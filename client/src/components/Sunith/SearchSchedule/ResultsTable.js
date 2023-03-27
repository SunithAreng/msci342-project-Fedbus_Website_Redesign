import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            display: "none"
        }
    }
}));

export const ResultsTable = ({ results, selectionModel, setSelectionModel, pref }) => {
    const classes = useStyles();
    const columns = [
        {
            field: 'origin',
            headerName: 'Origin',
            width: 250,
        },
        {
            field: 'destination',
            headerName: 'Destination',
            width: 250,
        },
        {
            field: 'departure_time',
            headerName: 'Departure Time',
            type: 'time',
            width: 180,
        },
        {
            field: 'arrival_time',
            headerName: 'Arrival Time',
            type: 'time',
            width: 150,
        },
        {
            field: 'duration',
            headerName: 'Duration',
            type: 'time',
            width: 110,
        },
        {
            field: 'trip_date',
            headerName: 'Date',
            type: 'date',
            width: 110,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
        },
        {
            field: 'seats',
            headerName: 'Seats',
            type: 'number',
            width: 150,
        },
    ];

    return (
        <div style={{ height: 500 }}>
            <DataGrid
                className={classes.root}
                rows={results}
                columns={columns}
                getRowId={(results) => results.trip_id}
                checkboxSelection
                disableSelectionOnClick
                selectionModel={selectionModel}
                pageSize={5}
                rowsPerPageOptions={[5]}
                rowHeight={50}
                isRowSelectable={(params) => params.row.seats > 0}
                onSelectionModelChange={pref == '1' ?
                    (selection) => {
                        const newSelectionModel = [...selection];
                        if (newSelectionModel.length > 1) {
                            const selectionSet = new Set(selectionModel);
                            const result = newSelectionModel.filter(
                                (s) => !selectionSet.has(s)
                            );
                            setSelectionModel(result);
                        } else {
                            setSelectionModel(newSelectionModel);
                        }
                    }
                    :
                    (selection) => setSelectionModel(selection)}
            />
        </div>
    )
}
