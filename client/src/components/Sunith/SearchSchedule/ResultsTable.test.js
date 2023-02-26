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

    expect(screen.getByText('Toronto')).toBeInTheDocument();
    expect(screen.getByText('Waterloo')).toBeInTheDocument();
});