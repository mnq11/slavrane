// hooks/useMember.ts
import {useEffect, useState} from 'react';

// Define interfaces for related models


export interface Expense {
    ExpenseID: number;
    FamilyID: number;
    MemberID: number;
    Category: string;
    Amount: number;
    Date: string;
    Recurring: string;
    Frequency: string;

}

export interface Family {
    FamilyID?: number;
    FamilyName: string;
    ContactNumber: string;
    Address: string;
    createdAt?: string;
    updatedAt?: string;
    members?: Member[];

}


export interface Income {
    IncomeID: number;
    FamilyID: number;
    MemberID: number;
    Source: string;
    Amount: string;
    Date: string;
    Recurring: string;
    Frequency: string;
    createdAt: string;
    updatedAt: string;

}

export interface Lones {

    LoanID: number;
    FamilyID: number;
    Amount: number;
    Interest: number;
    StartDate: string;
    DUEDate: string;
    Lender: string;
    LoanPurpose: string;
    RepaymentStatus: string;
    createdAt: string;
    updatedAt: string;

}


export interface Member {
    MemberID?: number;
    FamilyID: number;
    MemberName: string;
    Role?: 'normal' | 'moderator' | 'admin' | 'analyst';
    score?: number;
    DateOfBirth: string;
    Gender: string;
    Email: string;
    Password: string;
    ContactNumber: string;
    createdAt?: string;
    updatedAt?: string;
    expenses?: Expense[];
    incomes?: Income[];
    resources?: Resource[];
    savings?: Savings[];
    skills?: Skill[];
    tasks?: Tasks[];


}
export interface Resource {
    ResourceID: number;
    FamilyID: string;
    ResourceName: string;
    ResourceValue: number;
    ResourceDescription: string;
    DateAcquired: string;
    createdAt: string;
    updatedAt: string;
}
export interface Savings {
    SavingsID: number;
    FamilyID: number;
    Amount: number;
    Date: string;
    SavingsGoal: string;
    TargetDate: string;
    createdAt: string;
    updatedAt: string;
}


export interface Skill {
    SkillID: number;
    MemberID: number;
    SkillName: string;
    SkillLevel: string;
    DateAcquired: string;
    Certification: string;
    createdAt: string;
    updatedAt: string;
}
export interface Tasks {
    TaskID: number;
    MemberID: number;
    TaskName: string;
    TaskStatus: string;
    DueDate: string;
    Priority: string;
    Description: string;
    createdAt: string;
    updatedAt: string;

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
