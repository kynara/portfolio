import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Smoke test — verifies the app mounts without crashing
test('renders without crashing', () => {
  render(<App />);
});
