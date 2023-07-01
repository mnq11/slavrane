// components/Expense.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface ExpenseProps {
    member: Member;
}

const Expense: React.FC<ExpenseProps> = ({ member }) => {
    const expenses = member.expenses;

    if (expenses === undefined) {
        return <div>Error: Expense information not available.</div>;
    }

    if (!expenses || expenses.length === 0) {
        return <div>This member does not have any expenses.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Expenses</h1>
            {expenses.map((expense) => (
                <div key={expense.id}>
                    <p>Expense ID: {expense.id}</p>
                    <p>Expense Category: {expense.Category}</p>
                    <p>Expense Amount: {expense.amount}</p>
                    <p>Expense Frequency: {expense.Frequency}</p>
                    <p>Expense Start Date: {expense.StartDate}</p>
                    <p>Expense End Date: {expense.EndDate}</p>
                    <p>Created At: {expense.createdAt}</p>
                    <p>Updated At: {expense.updatedAt}</p>
                </div>
            ))}
        </div>
    );
};

export default Expense;
