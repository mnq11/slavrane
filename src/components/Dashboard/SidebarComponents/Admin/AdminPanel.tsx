import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import FamiliesCardsView from './Family/FamiliesCardsView';
import FamilyDetails from './Family/FamilyDetails';
import MemberDetails from './member/MemberDetails';
import {Family, Member} from "../../../../hooks/useMember";
import {createNewFamily, fetchAllFamilies, modifyFamily, removeFamily} from "./Provider/adminPanelFunctions";

interface AdminPanelProps {
    member: Member;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ member }) => {
    const [families, setFamilies] = useState<Family[]>([]);
    const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);


    useEffect(() => {
        fetchAllFamilies(setFamilies, setLoading, setError);
    }, []);

    const handleCreateFamily = async (family: Family) => {
        await createNewFamily(family, setFamilies);
    };

    const handleUpdateFamily = async (updatedFamily: Family) => {
        await modifyFamily(updatedFamily, setFamilies, setSelectedFamily);
    };

    const handleDeleteFamily = async (familyId: number | undefined) => {
        await removeFamily(familyId, setFamilies, setSelectedFamily);
    };

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
                        handleDeleteFamily={handleDeleteFamily}
                        handleUpdateFamily={handleUpdateFamily}
                    />

                </>
            ) : (
                <FamiliesCardsView
                    families={families}
                    onSelectFamily={setSelectedFamily}
                    onCreateFamily={handleCreateFamily}
                    setLoading={setLoading}
                />
            )}
        </Container>
    );
};

export default AdminPanel;
