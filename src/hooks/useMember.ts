// hooks/useMember.ts
import {useEffect, useState} from 'react';

export interface Member {
    id: number;
    FullName: string;
    email: string;
}

export const useMember = () => {
    const userFromStorage = window.localStorage.getItem('member');
    const initialUser = userFromStorage ? JSON.parse(userFromStorage) : null;
    const [user, setUser] = useState<Member | null>(initialUser);

    useEffect(() => {
        const handleStorageChange = () => {
            const userFromStorage = window.localStorage.getItem('member');
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
