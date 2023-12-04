// import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CombatPowerCalculator from './App'; // Adjust the import path as needed

describe('CombatPowerCalculator', () => {
  test('renders the calculator and its elements', () => {
    render(<CombatPowerCalculator />);
    expect(screen.getByText('Combat Power Calculator')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByLabelText('Attack')).toBeInTheDocument();
    expect(screen.getByLabelText('Defense')).toBeInTheDocument();
  });

  // Additional tests...
});



// ... (other imports and describe block)

test('updates input fields', async () => {
  render(<CombatPowerCalculator />);
  const attackInput = screen.getByLabelText('Attack') as HTMLInputElement;
  userEvent.type(attackInput, '100');

  await waitFor(() => {
    expect(attackInput.value).toBe('100');
  });

  const defenseInput = screen.getByLabelText('Defense') as HTMLInputElement;
  userEvent.type(defenseInput, '50');

  await waitFor(() => {
    expect(defenseInput.value).toBe('50');
  });
});

test('calculates and displays total CP correctly', async () => {
  render(<CombatPowerCalculator />);
  const attackInput = screen.getByLabelText('Attack') as HTMLInputElement;
  const defenseInput = screen.getByLabelText('Defense') as HTMLInputElement;
  const calculateButton = screen.getByRole('button', { name: 'Calculate' });

  // userEvent.type(attackInput, '2'); // Assuming each point of attack is worth 34.5 CP
  // userEvent.type(defenseInput, '1'); // Assuming each point of defense is worth 21 CP
  // Using fireEvent for more direct control
  fireEvent.change(attackInput, { target: { value: '2' } });
  fireEvent.change(defenseInput, { target: { value: '1' } });

  userEvent.click(calculateButton);

  await waitFor(() => {
    expect(screen.getByText(/Total CP: 90/i)).toBeInTheDocument(); // 2 * 34.5 + 1 * 21
  });
});

test('resets inputs and total CP', () => {
  render(<CombatPowerCalculator />);
  const resetButton = screen.getByRole('button', { name: 'Reset' });

  // Perform some actions or calculations here...
  const attackInput = screen.getByLabelText('Attack') as HTMLInputElement;
  const defenseInput = screen.getByLabelText('Defense') as HTMLInputElement;

  // Simulating user input
  userEvent.type(attackInput, '100');
  userEvent.type(defenseInput, '50');
  
  // Clicking the reset button
  userEvent.click(resetButton);

  // Assertions after reset
  expect(attackInput.value).toBe('');
  expect(defenseInput.value).toBe('');
  expect(screen.getByText('Total CP: 0')).toBeInTheDocument();
});

