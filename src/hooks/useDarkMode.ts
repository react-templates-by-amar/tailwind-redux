import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const darkMode =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    console.log('Initial dark mode state:', darkMode);
    return darkMode;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    console.log('Dark mode changed:', isDark);

    if (isDark) {
      console.log('Adding dark class to HTML element');
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      console.log('Removing dark class from HTML element');
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }

    // Log the current state of the HTML element
    console.log('HTML element classes:', root.classList.toString());
  }, [isDark]);

  const toggle = () => {
    console.log('Toggle clicked, current isDark:', isDark);
    setIsDark(!isDark);
  };

  return { isDark, toggle };
}
