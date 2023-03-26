import React from 'react';
import { render, screen } from '@testing-library/react';
import { Review2 } from './OtherReviews';
import '@testing-library/jest-dom';

describe('Review2 component', () => {

  const reviews = [
    {
      user: 'John Doe',
      title: 'Great Bus!',
      content: 'I really enjoyed this bus ride. It exceeded my expectations.',
      score: [1, 1, 1, 1, 1]
    }
  ];

  it('renders the customer feedback section', () => {
    render(<Review2 reviews={reviews} />);
    expect(screen.getByText(/customer's feedback/i)).toBeInTheDocument();
  });

  it('renders reviews', () => {
    render(<Review2 reviews={reviews} />);
    reviews.forEach((item) => {
      expect(screen.getAllByRole('heading', item));
    });
  });
});
