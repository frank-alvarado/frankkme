// Test utilities
import React from 'react';
import { render as rtlRender } from '@testing-library/react';

// Custom render function if you need to wrap providers
function render(ui, options) {
  return rtlRender(ui, { wrapper: ({ children }) => <>{children}</>, ...options });
}

// Re-export everything
export * from '@testing-library/react';
export { render };
