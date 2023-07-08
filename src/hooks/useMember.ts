// hooks/useMember.ts
import {useEffect, useState} from 'react';

// Define interfaces for related models
export interface MemberTask {
    id: number;
    MemberID?: number;
    TaskID?: number;
}

export interface Task {
    TaskID: number;
    Description: string;
    DueDate: string;
    Status: string;
    createdAt: string;
    updatedAt: string;
    MemberTask: MemberTask;
}


export interface Expense {
    ExpenseID: number;
    Category: string;
    Amount: number;
    Frequency: string;
    StartDate: string;
    EndDate: string;
    createdAt: string;
    updatedAt: string;
    MemberExpense: {
        id: number;
        MemberID: number;
        ExpenseID: number;
    }
}

export interface Family {
    FamilyID?: number;
    FamilyName: string;
    ContactNumber: string;
    Address: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface Income {
    IncomeID: number;
    Source: string;
    Amount: string;
    Frequency: string;
    StartDate: string;
    EndDate: string;
    createdAt: string;
    updatedAt: string;
    MemberIncome: {
        id: number;
        MemberID: number;
        IncomeID: number;
    }
}


export interface Savings {
    id: number;
    amount: number;
    memberId: number;
    familyId: number;
    date: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}



export interface Member {
    MemberID?: number;
    FullName: string;
    Email: string;
    PhoneNumber: string;
    FamilyID:number;
    Password: string;
    Role?: 'normal' | 'moderator' | 'admin' | 'analyst';
    DateOfBirth: string;
    Tasks?: Task[];
    Resources?: Resource[];
    Expenses?: Expense[];
    Family?: Family;
    Incomes?: Income[];
    Savings?: Savings[];
    Skills?: Skill[];
}
export interface Resource {
    ResourceID: number;
    ResourceType: string;
    ResourceName: string;
    createdAt: string;
    updatedAt: string;
    MemberResource: {
        id: number;
        MemberID: number;
        ResourceID: number;
    }
}


export interface Skill {
    SkillID: number;
    SkillName: string;
    createdAt: string;
    updatedAt: string;
    MemberSkill: {
        id: number;
        MemberID: number;
        SkillID: number;
    }
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
