
// components/Savings.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface SavingsProps {
    member: Member;
}

const Savings: React.FC<SavingsProps> = ({ member }) => {
    // Assuming the member object has a 'savings' property that is an array of savings objects
    const savings = member.savings;

    if (!savings || savings.length === 0) {
        return <div>No savings information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Savings</h1>
            {savings.map((saving) => (
                <div key={saving.id}>
                    <p>Savings ID: {saving.id}</p>
                    <p>Savings Amount: {saving.amount}</p>
                </div>
            ))}
        </div>
    );
};

export default Savings;
