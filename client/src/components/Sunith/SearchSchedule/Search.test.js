import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import SearchSchdeule from './Search';
import TimePreference from './Search';

test("blah", () => {
    render(<SearchSchdeule />);
    expect(SearchSchedule.getOrigin()).toHaveBeenCalled();
})