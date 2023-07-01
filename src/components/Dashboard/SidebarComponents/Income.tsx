// components/Income.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface IncomeProps {
    member: Member;
}

const Income: React.FC<IncomeProps> = ({ member }) => {
    const incomes = member.incomes;

    if (incomes === undefined) {
        return <div>Error: Income information not available.</div>;
    }

    if (!incomes || incomes.length === 0) {
        return <div>This member does not have any income information.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Incomes</h1>
            {incomes.map((income) => (
                <div key={income.id}>
                    <p>Income ID: {income.id}</p>
                    <p>Income Source: {income.Source}</p>
                    <p>Income Amount: {income.amount}</p>
                    <p>Income Frequency: {income.Frequency}</p>
                    <p>Income Start Date: {income.StartDate}</p>
                    <p>Income End Date: {income.EndDate}</p>
                    <p>Created At: {income.createdAt}</p>
                    <p>Updated At: {income.updatedAt}</p>
                </div>
            ))}
        </div>
    );
};

export default Income;
