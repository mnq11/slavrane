// components/Expense.tsx
import React from 'react';
import { Member } from '../../../../hooks/useMember';

interface ExpenseProps {
    member: Member;
}

const Expense: React.FC<ExpenseProps> = ({ member }) => {
    const expenses = member.Expenses;

    if (expenses === undefined) {
        return <div>Error: Expense information not available.</div>;
    }

    if (!expenses || expenses.length === 0) {
        return <div>This member does not have any expenses.</div>;
    }

    return (
        <div>
            <h1>{member.MemberName}'s Expenses</h1>
            {expenses.map((Expense) => (
                <div key={Expense.ExpenseID}>
                    <p>Expense ID: {Expense.ExpenseID}</p>
                    <p>Expense Category: {Expense.Category}</p>
                    <p>Expense Amount: {Expense.Amount}</p>
                    <p>Expense Frequency: {Expense.Frequency}</p>
                    <p>Expense Start Date: {Expense.StartDate}</p>
                    <p>Expense End Date: {Expense.EndDate}</p>
                </div>
            ))}
        </div>
    );
};

export default Expense;
