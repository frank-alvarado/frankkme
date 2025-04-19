// test-utils.js
import React from 'react';
import { render } from '@testing-library/react';

// Custom render function to work better with Next.js components
const customRender = (ui, options) => {
  const rendered = render(ui, { ...options });
  
  // Add a helper method for text content matching
  const findByTextContent = (text) => {
    const textContent = rendered.container.textContent;
    return textContent.includes(text);
  };
  
  return {
    ...rendered,
    findByTextContent,
  };
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
