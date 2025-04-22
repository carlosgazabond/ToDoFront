import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ToDo List header', () => {
  render(<App />);
  const headerElement = screen.getByText(/ToDo List/i);
  expect(headerElement).toBeInTheDocument();
});
