// src/components/Dashboard/SidebarComponents/Analyst/Analyst.tsx

import React from 'react';
import { Member } from "../../../../hooks/useMember";
interface AnalystProps {
    member: Member;
}

const Analyst: React.FC<AnalystProps> = ({ member }) => {
    return (
        <div>
            <h1>Welcome, {member.MemberName}</h1>
            <p>You are logged in as an analyst.</p>
            {/* Add more functionality here */}
        </div>
    );
};

export default Analyst;
