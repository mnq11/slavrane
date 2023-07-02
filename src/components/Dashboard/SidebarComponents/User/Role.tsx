// components/Role.tsx
import React from 'react';
import { Member } from '../../../../hooks/useMember';

interface RoleProps {
    member: Member;
}

const Role: React.FC<RoleProps> = ({ member }) => {
    const roles = member.Roles;

    if (roles === undefined) {
        return <div>Error: Role information not available.</div>;
    }

    if (!roles || roles.length === 0) {
        return <div>This member does not have any role information.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Roles</h1>
            {roles.map((Role) => (
                <div key={Role.RoleID}>
                    <p>Role ID: {Role.RoleID}</p>
                    <p>Role Name: {Role.RoleName}</p>
                </div>

            ))}
        </div>
    );
};

export default Role;
