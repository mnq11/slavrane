import React from 'react';
import { Savings } from "../../../../hooks/useMember";

interface SavingsListProps {
    savings: Savings[];
}

const SavingsList: React.FC<SavingsListProps> = ({ savings }) => (
    <div>
        <h2>Savings List:</h2>
        <ul>
            {savings.map(saving => (
                <li key={saving.SavingsID}>
                    <p>Savings Goal: {saving.SavingsGoal}</p>
                    <p>Amount: {saving.Amount}</p>
                    <p>Target Date: {saving.TargetDate}</p>
                </li>
            ))}
        </ul>
    </div>
);

export default SavingsList;
