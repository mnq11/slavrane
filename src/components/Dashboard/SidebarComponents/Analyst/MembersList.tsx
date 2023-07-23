import React from 'react';
import { Member } from "../../../../hooks/useMember";

interface MembersListProps {
    members: Member[];
}

const MembersList: React.FC<MembersListProps> = ({ members }) => (
    <div>
        <h2>Members List:</h2>
        <ul>
            {members.map(member => (
                <li key={member.MemberID}>
                    <p>Name: {member.MemberName}</p>
                    <p>Role: {member.Role}</p>
                    <p>Email: {member.Email}</p>
                    <p>Contact Number: {member.ContactNumber}</p>
                </li>
            ))}
        </ul>
    </div>
);

export default MembersList;
