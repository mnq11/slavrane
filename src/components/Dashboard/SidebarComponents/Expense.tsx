// components/Expense.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface ExpenseProps {
    member: Member;
}

const Expense: React.FC<ExpenseProps> = ({ member }) => {
    // Assuming the member object has a 'expenses' property that is an array of expense objects
    const expenses = member.expenses;

    if (!expenses || expenses.length === 0) {
        return <div>No expense information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Expenses</h1>
            {expenses.map((expense) => (
                <div key={expense.id}>
                    <p>Expense ID: {expense.id}</p>
                    <p>Expense Amount: {expense.amount}</p>
                </div>
            ))}
        </div>
    );
};

export default Expense;