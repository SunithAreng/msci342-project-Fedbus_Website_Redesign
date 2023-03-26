
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Location from './Location';

it('renders Location', () => {
  render(<Location />);
  expect(screen.getByText("Fedbus Bus Stops")).toBeInTheDocument();
});
