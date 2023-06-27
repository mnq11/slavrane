// hooks/useUser.ts
import {useEffect, useState} from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
}

export const useUser = () => {
    const userFromStorage = window.localStorage.getItem('user');
    const initialUser = userFromStorage ? JSON.parse(userFromStorage) : null;
    const [user, setUser] = useState<User | null>(initialUser);

    useEffect(() => {
        const handleStorageChange = () => {
            const userFromStorage = window.localStorage.getItem('user');
            if (userFromStorage) {
                setUser(JSON.parse(userFromStorage));
            } else {
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return [user, setUser] as const;
};
