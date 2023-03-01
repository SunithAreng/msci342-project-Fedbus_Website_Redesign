import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import FrequentlyAskedQuestions from './FAQ';


  it('renders FAQ component', () => {
     render(<FrequentlyAskedQuestions />);
    //const signInTitle = getByText(/Sign In/i);
   expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });
