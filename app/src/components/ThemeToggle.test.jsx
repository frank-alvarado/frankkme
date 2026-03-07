import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

// Spy on localStorage.setItem to verify persistence
beforeAll(() => {
  jest.spyOn(Storage.prototype, 'setItem');
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('defaults to system preference when no localStorage value', () => {
    // Simulate system dark mode preference
    window.matchMedia.mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    render(<ThemeToggle />);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeChecked();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('toggles theme and persists to localStorage', () => {
    render(<ThemeToggle />);
    const toggle = screen.getByRole('checkbox');
    // Toggle to dark mode
    fireEvent.change(toggle, { target: { checked: true } });
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('theme', 'dark');
    // Toggle back to light mode
    fireEvent.change(toggle, { target: { checked: false } });
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('theme', 'light');
  });
});