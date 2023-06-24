// useDarkMode.ts
import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const localDarkMode = window.localStorage.getItem('darkMode') === 'true';
        setDarkMode(localDarkMode);
    }, []);

    useEffect(() => {
        window.localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    return [darkMode, setDarkMode] as const;
};
