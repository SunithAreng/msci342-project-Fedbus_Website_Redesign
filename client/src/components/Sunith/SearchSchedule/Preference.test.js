import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { Preference } from './Preference';

describe('Preference', () => {
    const mockClasses = { root: 'mock-root' };
    const mockObject = [
        { option1: 'value1' },
        { option2: 'value2' },
        { option3: 'value3' },
    ];

    let handleChange;

    function renderComponent() {
        handleChange = jest.fn();

        render(
            <Preference
                classes={mockClasses}
                spacing=""
                handleChange={handleChange}
                object={mockObject}
            />,
        );
    }


    it('renders radio buttons for each object in the array', () => {
        renderComponent();

        mockObject.forEach((item) => {
            const elements = Object.values(item);
            expect(screen.getAllByRole('radio', item));
        });
    });

});
