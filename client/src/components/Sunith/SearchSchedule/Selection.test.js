import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import { Selection } from './Selection';

it("displays the stop", () => {
    const handleOriginChange = jest.fn();
    const noop = () => { };
    var x = 'Waterloo';
    const s = [{
        id: 1,
        station_name: 'Waterloo'
    }, {
        id: 2,
        station_name: 'Toronto'
    }]

    render(<Selection handleChange={handleOriginChange} classes={noop} elementName={x} label={"Origin"} idlabel={"origin-list"}
        objectList={s} />)
    expect(screen.getByRole('button', { id: 1, station_name: 'Waterloo' }));
    expect(screen.getByRole('button', { id: 2, station_name: 'Toronto' }));

})