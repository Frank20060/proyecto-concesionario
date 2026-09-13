'use client';

import { useEffect, useState } from 'react';

const storageKey = 'grand-motors-theme';

type Theme = 'dark' | 'light';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey) as Theme | null;
    const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
    const nextTheme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : preferredTheme;

    document.documentElement.dataset.theme = nextTheme;
    window.requestAnimationFrame(() => setTheme(nextTheme));
  }, []);

  function handleChange() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  return (
    <div className="theme-switch">
      <input
        id="theme-checkbox"
        type="checkbox"
        checked={theme === 'light'}
        onChange={handleChange}
        aria-label="Cambiar entre tema claro y oscuro"
      />
      <label htmlFor="theme-checkbox" title="Cambiar tema">
        <span aria-hidden="true" className="theme-switch-track" />
        <span aria-hidden="true" className="theme-switch-icon theme-switch-moon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162z" clipRule="evenodd" />
          </svg>
        </span>
        <span aria-hidden="true" className="theme-switch-icon theme-switch-sun">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75zm0 13.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5zm7.5-3.75a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75zM5.25 12a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1 0-1.5H4.5a.75.75 0 0 1 .75.75z" />
            <path fillRule="evenodd" d="M17.303 5.636a.75.75 0 0 1 1.06 0l.001.001a.75.75 0 0 1-1.061 1.06l-.001-.001a.75.75 0 0 1 0-1.06zM6.697 17.303a.75.75 0 0 1 1.06 0l.001.001a.75.75 0 1 1-1.061 1.06l-.001-.001a.75.75 0 0 1 0-1.06zM17.303 18.364a.75.75 0 0 1 1.06-1.06l.001.001a.75.75 0 1 1-1.061 1.06l-.001-.001a.75.75 0 0 1 0 1.06zM6.697 6.697a.75.75 0 0 1 1.06-1.06l.001.001a.75.75 0 1 1-1.061 1.06l-.001-.001a.75.75 0 0 1 0 1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </label>
    </div>
  );
}
