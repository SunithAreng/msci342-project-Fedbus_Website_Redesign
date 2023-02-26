import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import TimePreference from './Search';

it("Radio group change value and new value updated and last value no more checked", () => {
    const { container, getByTestId } = render(<TimePreference {...props} />);

    // Before change selection
    const allValueRadioButton = getByTestId('radio-button-all');
    expect(allValueRadioButton.checked).toEqual(true);

    // Change selection
    const withValueRadioButton = getByTestId('radio-button-with');
    fireEvent.click(withValueRadioButton, { target: { checked: true } });
    expect(withValueRadioButton.checked).toEqual(true);

    // Old value is no more checked
    expect(allValueRadioButton.checked).toEqual(false);
});