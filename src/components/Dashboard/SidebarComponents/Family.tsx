// components/Family.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface FamilyProps {
    member: Member;
}

const Family: React.FC<FamilyProps> = ({ member }) => {
    const family = member.family;

    if (family === undefined) {
        return <div>Error: Family information not available.</div>;
    }

    if (!family) {
        return <div>This member does not have family information.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Family</h1>
            <p>Family ID: {family.id}</p>
            <p>Family Name: {family.FamilyName}</p>
            <p>Address: {family.Address}</p>
            <p>Created At: {family.createdAt}</p>
            <p>Updated At: {family.updatedAt}</p>
        </div>
    );
};

export default Family;
