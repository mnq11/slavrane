// hooks/useMember.ts
import {useEffect, useState} from 'react';

// Define interfaces for related models
interface Task {
    id: number;
    name: string;
    // Include other task properties here
}

interface Resource {
    id: number;
    name: string;
    // Include other resource properties here
}

interface Expense {
    id: number;
    amount: number;
    // Include other expense properties here
}

interface Family {
    id: number;
    name: string;
    // Include other family properties here
}

interface Income {
    id: number;
    amount: number;
    // Include other income properties here
}

interface Role {
    id: number;
    name: string;
    // Include other role properties here
}

interface Savings {
    id: number;
    amount: number;
    // Include other savings properties here
}

interface Skill {
    id: number;
    name: string;
    // Include other skill properties here
}

export interface Member {
    id: number;
    FullName: string;
    email: string;
    tasks: Task[]; // Add a tasks property to the Member interface
    resources: Resource[]; // Add a resources property to the Member interface
    expenses: Expense[]; // Add an expenses property to the Member interface
    family: Family; // Add a family property to the Member interface
    incomes: Income[]; // Add an incomes property to the Member interface
    roles: Role[]; // Add a roles property to the Member interface
    savings: Savings[]; // Add a savings property to the Member interface
    skills: Skill[]; // Add a skills property to the Member interface
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
