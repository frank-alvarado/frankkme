// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Next.js Head component
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      // When head is used, update the document title from the title element
      if (children && Array.isArray(children)) {
        const title = children.find(child => child.type === 'title');
        if (title && title.props && title.props.children) {
          document.title = title.props.children;
        }
      }
      return null;
    },
  };
});
