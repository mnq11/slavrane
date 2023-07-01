// components/Income.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface IncomeProps {
    member: Member;
}

const Income: React.FC<IncomeProps> = ({ member }) => {
    // Assuming the member object has a 'incomes' property that is an array of income objects
    const incomes = member.incomes;

    if (!incomes || incomes.length === 0) {
        return <div>No income information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Incomes</h1>
            {incomes.map((income) => (
                <div key={income.id}>
                    <p>Income ID: {income.id}</p>
                    <p>Income Amount: {income.amount}</p>
                </div>
            ))}
        </div>
    );
};

export default Income;