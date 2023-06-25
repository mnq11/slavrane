// hooks/useUser.ts
import {useEffect, useState} from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

export const useUser = () => {
    const userFromStorage = window.localStorage.getItem('user');
    const initialUser = userFromStorage ? JSON.parse(userFromStorage) : null;
    const [user, setUser] = useState<User | null>(initialUser);

    useEffect(() => {
        const userFromStorage = window.localStorage.getItem('user');
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

    return [user, setUser] as const;
};
