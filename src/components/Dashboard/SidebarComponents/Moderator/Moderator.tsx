// src/components/Dashboard/SidebarComponents/Moderator/Moderator.tsx

import React, { useEffect, useState } from 'react';
import { Member } from "../../../../hooks/useMember";
import {getMembersByFamilyId} from "../../../../API/api";
import MembersCardsView from "../Admin/member/MembersCardsView";
import MemberDetails from "../Admin/member/MemberDetails";

interface ModeratorProps {
    member: Member;
}

const Moderator: React.FC<ModeratorProps> = ({ member }) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    useEffect(() => {
        // Fetch members by family ID
        getMembersByFamilyId(member.FamilyID).then(setMembers);
    }, [member.FamilyID]);

    const onSelectMember = (member: Member) => {
        // Set the selected member
        setSelectedMember(member);
    };

    return (
        <div>
            <h1>Welcome, {member.MemberName}</h1>
            <p>You are logged in as a moderator.</p>
            {selectedMember ? (
                <MemberDetails
                    member={selectedMember}
                    onBackToFamilyDetails={() => setSelectedMember(null)}
                />
            ) : (
                <MembersCardsView
                    members={members}
                    onSelectMember={onSelectMember}
                    selectedFamily={member.FamilyID}
                />
            )}
        </div>
    );
};

export default Moderator;
