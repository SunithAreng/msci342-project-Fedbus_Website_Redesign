import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Payment } from './Payment';

describe('Payment', () => {
    const mockProps = {
        serverUrl: 'http://localhost:8080',
        userId: '123',
        currentBalance: 100,
    };

    it('should display error message if not all fields are filled out', () => {
        render(<Payment {...mockProps} />);
        const button = screen.getByRole('button', { name: /confirm payment/i });
        fireEvent.click(button);
        expect(screen.getByText(/please fill out all credit card information/i)).toBeInTheDocument();
    });
});