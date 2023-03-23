import React from 'react';
import { render, screen } from '@testing-library/react';
import { Review2 } from './OtherReviews';
import '@testing-library/jest-dom';

describe('Review2 component', () => {
  it('renders the customer feedback section', () => {
    const reviews = [
      {
        user: 'John Doe',
        title: 'Great Bus!',
        content: 'I really enjoyed this bus ride. It exceeded my expectations.',
        score: [1, 1, 1, 1, 1]
      }
    ];

    render(<Review2 reviews={reviews} />);

    expect(screen.getByText(/customer's feedback/i)).toBeInTheDocument();
  });
});
