import { render, screen, fireEvent } from '../utils/test-utils';
import ThemeToggle from '../../components/ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockReturnValue({ matches: false }),
  });
});

describe('ThemeToggle', () => {
  it('renders a checkbox input', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('defaults to light mode when no stored theme and no system preference', () => {
    render(<ThemeToggle />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('defaults to dark mode when system prefers dark', () => {
    window.matchMedia.mockReturnValue({ matches: true });

    render(<ThemeToggle />);

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('respects stored "dark" theme over system preference', () => {
    localStorage.setItem('theme', 'dark');

    render(<ThemeToggle />);

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('respects stored "light" theme over system preference', () => {
    localStorage.setItem('theme', 'light');
    window.matchMedia.mockReturnValue({ matches: true });

    render(<ThemeToggle />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles to dark mode when checkbox is clicked', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggles back to light mode when checkbox is clicked twice', () => {
    render(<ThemeToggle />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('has a labeled checkbox', () => {
    render(<ThemeToggle />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.id).toBe('themeToggle');
    expect(checkbox.closest('label')).not.toBeNull();
  });
});
