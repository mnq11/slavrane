// components/Resource.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface ResourceProps {
    member: Member;
}

const Resource: React.FC<ResourceProps> = ({ member }) => {
    // Assuming the member object has a 'resources' property that is an array of resource objects
    const resources = member.resources;

    if (!resources || resources.length === 0) {
        return <div>No resource information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Resources</h1>
            {resources.map((resource) => (
                <div key={resource.id}>
                    <p>Resource ID: {resource.id}</p>
                    <p>Resource Name: {resource.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Resource;