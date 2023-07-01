
// components/Role.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface RoleProps {
    member: Member;
}

const Role: React.FC<RoleProps> = ({ member }) => {
    // Assuming the member object has a 'roles' property that is an array of role objects
    const roles = member.roles;

    if (!roles || roles.length === 0) {
        return <div>No role information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Roles</h1>
            {roles.map((role) => (
                <div key={role.id}>
                    <p>Role ID: {role.id}</p>
                    <p>Role Name: {role.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Role;