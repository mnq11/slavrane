
// components/Skill.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface SkillProps {
    member: Member;
}

const Skill: React.FC<SkillProps> = ({ member }) => {
    // Assuming the member object has a 'skills' property that is an array of skill objects
    const skills = member.skills;

    if (!skills || skills.length === 0) {
        return <div>No skill information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Skills</h1>
            {skills.map((skill) => (
                <div key={skill.id}>
                    <p>Skill ID: {skill.id}</p>
                    <p>Skill Name: {skill.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Skill;