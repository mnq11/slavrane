// components/Resource.tsx
import React from 'react';
import { Member } from '../../../../hooks/useMember';

interface ResourceProps {
    member: Member;
}

const Resource: React.FC<ResourceProps> = ({ member }) => {
    const resources = member.Resources;

    if (resources === undefined) {
        return <div>Error: Resource information not available.</div>;
    }

    if (!resources || resources.length === 0) {
        return <div>This member does not have any resources.</div>;
    }

    return (
        <div>
            <h1>{member.MemberName}'s Resources</h1>
            {resources.map((Resource) => (
                <div key={Resource.ResourceID}>
                    <p>Resource ID: {Resource.ResourceID}</p>
                    <p>Resource Type: {Resource.ResourceType}</p>
                    <p>Resource Name: {Resource.ResourceName}</p>
                    <p>Created At: {Resource.createdAt}</p>
                </div>
            ))}
        </div>
    );
};

export default Resource;
