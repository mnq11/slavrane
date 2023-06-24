import {useEffect, useState} from "react";

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const localDarkMode = window.localStorage.getItem('darkMode');
        return localDarkMode !== null ? localDarkMode === 'true' : true; // true is the default value
    });

    useEffect(() => {
        window.localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    return [darkMode, setDarkMode] as const;
};
