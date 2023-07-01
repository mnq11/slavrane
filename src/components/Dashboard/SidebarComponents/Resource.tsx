// components/Resource.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface ResourceProps {
    member: Member;
}

const Resource: React.FC<ResourceProps> = ({ member }) => {
    const resources = member.resources;

    if (resources === undefined) {
        return <div>Error: Resource information not available.</div>;
    }

    if (!resources || resources.length === 0) {
        return <div>This member does not have any resources.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Resources</h1>
            {resources.map((resource) => (
                <div key={resource.id}>
                    <p>Resource ID: {resource.id}</p>
                    <p>Resource Type: {resource.ResourceType}</p>
                    <p>Resource Name: {resource.ResourceName}</p>
                    <p>Created At: {resource.createdAt}</p>
                    <p>Updated At: {resource.updatedAt}</p>
                </div>
            ))}
        </div>
    );
};

export default Resource;
