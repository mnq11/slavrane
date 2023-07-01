
// components/Family.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface FamilyProps {
    member: Member;
}

const Family: React.FC<FamilyProps> = ({ member }) => {
    // Assuming the member object has a 'family' property that is an object with 'id' and 'name' properties
    const family = member.family;

    if (!family) {
        return <div>No family information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Family</h1>
            <p>Family ID: {family.id}</p>
            <p>Family Name: {family.name}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default Family;