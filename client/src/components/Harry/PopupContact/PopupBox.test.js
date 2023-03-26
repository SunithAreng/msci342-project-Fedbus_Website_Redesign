import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popup } from './PopupBox';
import '@testing-library/jest-dom';

describe('Popup', () => {
    it('should show the popup when the button is clicked', () => {
        const serverURL = 'https://localhost:3000/';
        const { getByText } = render(<Popup serverURL={serverURL} />);

        fireEvent.click(getByText('Any questions ? Contact us !'));

        expect(getByText('The Fedbus Desk.')).toBeInTheDocument();
        const nameInput = screen.getByPlaceholderText('Your Name:');
        const emailInput = screen.getByPlaceholderText('Your Email:');
        const questionInput = screen.getByPlaceholderText('Your Question:');
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(questionInput).toBeInTheDocument();
    });
});
