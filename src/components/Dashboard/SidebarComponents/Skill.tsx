// components/Skill.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface SkillProps {
    member: Member;
}

const Skill: React.FC<SkillProps> = ({ member }) => {
    const skills = member.skills;

    if (skills === undefined) {
        return <div>Error: Skill information not available.</div>;
    }

    if (!skills || skills.length === 0) {
        return <div>This member does not have any skills.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Skills</h1>
            {skills.map((skill) => (
                <div key={skill.id}>
                    <p>Skill ID: {skill.id}</p>
                    <p>Skill Name: {skill.name}</p>
                    {/* Uncomment these lines if these properties exist in your Skill model */}
                    {/* <p>Created At: {skill.createdAt}</p> */}
                    {/* <p>Updated At: {skill.updatedAt}</p> */}
                </div>
            ))}
        </div>
    );
};

export default Skill;
