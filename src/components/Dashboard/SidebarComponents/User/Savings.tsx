// components/Savings.tsx
import React from 'react';
import { Member } from '../../../../hooks/useMember';

interface SavingsProps {
    member: Member;
}

const Savings: React.FC<SavingsProps> = ({ member }) => {
    const savings = member.Savings;

    if (savings === undefined) {
        return <div>Error: Savings information not available.</div>;
    }

    if (!savings || savings.length === 0) {
        return <div>This member does not have any savings.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Savings</h1>
            {savings.map((Saving) => (
                <div key={Saving.id}>
                    <p>Savings ID: {Saving.id}</p>
                    <p>Savings Amount: {Saving.amount}</p>
                    {/* Uncomment these lines if these properties exist in your Savings model */}
                    {/* <p>Created At: {saving.createdAt}</p> */}
                    {/* <p>Updated At: {saving.updatedAt}</p> */}
                </div>
            ))}
        </div>
    );
};

export default Savings;
