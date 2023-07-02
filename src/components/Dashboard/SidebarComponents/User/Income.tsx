// components/Income.tsx
import React from 'react';
import { Member } from '../../../../hooks/useMember';

interface IncomeProps {
    member: Member;
}

const Income: React.FC<IncomeProps> = ({ member }) => {
    const incomes = member.Incomes;

    if (incomes === undefined) {
        return <div>Error: Income information not available.</div>;
    }

    if (!incomes || incomes.length === 0) {
        return <div>This member does not have any income information.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Incomes</h1>
            {incomes.map((Income) => (
                <div key={Income.IncomeID}>
                    <p>Income ID: {Income.IncomeID}</p>
                    <p>Income Source: {Income.Source}</p>
                    <p>Income Amount: {Income.Amount}</p>
                    <p>Income Frequency: {Income.Frequency}</p>
                    <p>Income Start Date: {Income.StartDate}</p>
                    <p>Income End Date: {Income.EndDate}</p>
                </div>

            ))}
        </div>
    );
};

export default Income;
