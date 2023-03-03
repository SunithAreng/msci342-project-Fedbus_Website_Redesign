import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export const ResultsTable = ({ results, selectionModel, setSelectionModel }) => {
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
        <>
            <DataGrid
                rows={results}
                columns={columns}
                getRowId={(results) => results.trip_id}
                checkboxSelection
                disableSelectionOnClick
                selectionModel={selectionModel}
                onSelectionModelChange={(selection) => {
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
                }}
            />
        </>
    )
}
