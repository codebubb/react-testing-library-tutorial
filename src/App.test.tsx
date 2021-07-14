import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders the header', () => {
  render(<App />);
  const linkElement = screen.getByText(/bug tracker/i);
  expect(linkElement).toBeInTheDocument();
});

test('it creates a new bug', () => {
  render(<App />);
  const inputEl = screen.getByTestId("newbug-description");
  userEvent.type(inputEl, "test bug");
  fireEvent.click(screen.getByTestId('add-bug'))
  expect(screen.getByText(/test bug/i)).toBeInTheDocument();
});