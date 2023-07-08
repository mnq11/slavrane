// AdminPanel.tsx
import React, { useEffect, useState} from 'react';
import {Family, Member} from "../../../../hooks/useMember";
import {
    getAllFamilies,
    createFamily, deleteFamily, updateFamily,
} from "../../../../API/api";
import {CircularProgress, Container, Typography} from '@material-ui/core';
import FamiliesCardsView from './Family/FamiliesCardsView';
import {toast} from "react-toastify";
import FamilyDetails from "./Family/FamilyDetails";
import MemberDetails from "./member/MemberDetails";
import MembersCardsView from "./member/MembersCardsView";

interface AdminPanelProps {
    member: Member;
}

const AdminPanel: React.FC<AdminPanelProps> = ({member}) => {
    const [families, setFamilies] = useState<Family[]>([]);
    const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null)
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    useEffect(() => {
        setLoading(true);
        getAllFamilies()
            .then((fetchedData) => {
                setFamilies(fetchedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleCreateFamily = async (family: Family) => {
        try {

            const newFamily = await createFamily(family);
            setFamilies(prevFamilies => [...prevFamilies, newFamily]);
            toast.success('Family created successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to create family');
        }
    };
    const handleUpdateFamily = async (updatedFamily: Family) => {
        try {
            const response = await updateFamily(updatedFamily);

            if (response.status === 200) {
                setFamilies(prevFamilies => prevFamilies.map(family => family.FamilyID === updatedFamily.FamilyID ? updatedFamily : family));
                toast.success('Family updated successfully');
                setSelectedFamily(null);

            } else {
                toast.error('Failed to update family');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update family');
        }
    };

    const handleDeleteFamily = async (familyId: number | undefined) => {
        if (familyId === undefined) {
            toast.error('Family ID is undefined');
            return;
        }

        try {
            const response = await deleteFamily(familyId);
            if (response.status !== 200) {


            setFamilies(prevFamilies => prevFamilies.filter(family => family.FamilyID !== familyId));
            setSelectedFamily(null);
            toast.success('Family deleted successfully');
            } else {
                toast.error('Failed to delete family');
            }
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <Typography variant="h4" component="h1">Welcome, {member.MemberName}</Typography>
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


                    <MembersCardsView
                        members={selectedFamily.members}
                        onSelectMember={(member) => setSelectedMember(member)}
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
