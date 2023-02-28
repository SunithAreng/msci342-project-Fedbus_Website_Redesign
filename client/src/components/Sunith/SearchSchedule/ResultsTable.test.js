import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { ResultsTable } from './ResultsTable';

it("displays the results", () => {
    const results = [
        {
            trip_id: 1,
            origin: 'Waterloo',
            destination: 'Toronto',
            departure_time: '11:00:00',
            arrival_time: '13:00:00',
            duration: '02:00:00',
            trip_date: '2023-03-05',
            price: '21',
            seats: '44'
        }
    ];

    render(<ResultsTable results={results} />);
    expect(screen.getAllByRole('columnheader', { trip_id: 1 }));
    expect(screen.getAllByRole('columnheader', { origin: 'Waterloo' }));
    expect(screen.getAllByRole('columnheader', { destination: 'Toronto', }));
    expect(screen.getAllByRole('columnheader', { departure_time: '11:00:00' }));
    expect(screen.getAllByRole('columnheader', { arrival_time: '13:00:00' }));
    expect(screen.getAllByRole('columnheader', { duration: '02:00:00' }));
    expect(screen.getAllByRole('columnheader', { trip_date: '2023-03-05' }));
    expect(screen.getAllByRole('columnheader', { price: 21 }));
    expect(screen.getAllByRole('columnheader', { seats: 44 }));
});