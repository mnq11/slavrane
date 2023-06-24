// hooks/useUser.ts
import { useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;
    // add other properties as needed
}

export const useUser = () => {
    const userFromStorage = window.localStorage.getItem('user');
    const initialUser = userFromStorage ? JSON.parse(userFromStorage) : null;
    const [user, setUser] = useState<User | null>(initialUser);

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return [user, setUser] as const;
};
