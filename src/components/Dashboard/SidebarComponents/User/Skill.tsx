// components/Skill.tsx
import React from 'react';
import { Member } from '../../../../hooks/useMember';

interface SkillProps {
    member: Member;
}

const Skill: React.FC<SkillProps> = ({ member }) => {
    // const skills = member.Skills;

    // if (skills === undefined) {
    //     return <div>Error: Skill information not available.</div>;
    // }
    //
    // if (!skills || skills.length === 0) {
    //     return <div>This member does not have any skills.</div>;
    // }

    return (
        <div>
            {/*<h1>{member.FullName}'s Skills</h1>*/}
            {/*{skills.map((Skill) => (*/}
            {/*    <div key={Skill.SkillID}>*/}
            {/*        <p>Skill ID: {Skill.SkillID}</p>*/}
            {/*        <p>Skill Name: {Skill.SkillName}</p>*/}
            {/*    </div>*/}

            {/*))}*/}
        </div>
    );
};

export default Skill;
