// AdminPanel.tsx

import React, { useState } from 'react';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import FamiliesCardsView from './Family/FamiliesCardsView';
import FamilyDetails from './Family/FamilyDetails';
import MemberDetails from './member/MemberDetails';
import {Family, Member} from "../../../../hooks/useMember";

interface AdminPanelProps {
    member: Member;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ member }) => {
    const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
    const [loading, setLoading] = useState(false);
    const [error] = useState<{ message: string } | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <Typography variant="h4" component="h1">
                Welcome, {member.MemberName}
            </Typography>
            {selectedMember ? (
                <MemberDetails
                    member={selectedMember}
                    onBackToFamilyDetails={() => setSelectedMember(null)}
                />

            ) : selectedFamily ? (
                <>
                    <FamilyDetails
                        family={selectedFamily}
                        onBackToFamilyList={() => setSelectedFamily(null)}
                        onSelectMember={setSelectedMember}
                        initialMembers={selectedFamily.members}
                    />
                </>
            ) : (
                <FamiliesCardsView
                    onSelectFamily={setSelectedFamily}
                    setLoading={setLoading}
                />
            )}
        </Container>
    );
};

export default AdminPanel;
