import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = (e) => {
    const next = e.target.checked;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <label htmlFor="themeToggle" className="fixed top-4 right-4 z-50 inline-block">
      <input
        id="themeToggle"
        type="checkbox"
        checked={dark}
        onChange={toggle}
        className="sr-only peer"
      />
      <div className="relative w-14 h-8 bg-gray-200 dark:bg-black rounded-full flex items-center px-1 transition-colors duration-300">
        {/* Sun icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 peer-checked:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8-9h1M3 12H2m15.364-6.364l.707.707M6.929 17.071l-.707.707m12.728 0l-.707-.707M6.929 6.929l-.707-.707M12 8a4 4 0 110 8 4 4 0 010-8z" />
        </svg>
        {/* Moon icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-1 w-5 h-5 text-gray-500 peer-checked:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
        <div className="absolute left-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-6"></div>
      </div>
    </label>
  );
}
