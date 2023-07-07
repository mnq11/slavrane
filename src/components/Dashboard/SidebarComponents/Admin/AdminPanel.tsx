import React, {useCallback, useEffect, useState} from 'react';
import {Family, Member} from "../../../../hooks/useMember";
import {
    getAllFamilies,
    createFamily,
    updateFamily,
    deleteFamily,
} from "../../../../API/api";
import FamiliesView from './FamiliesView';
import {CircularProgress, Container, Typography} from '@material-ui/core';

interface AdminPanelProps {
    member: Member;
}

const AdminPanel: React.FC<AdminPanelProps> = ({member}) => {
    const [families, setFamilies] = useState<Family[]>([]);
    const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null)

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


    const handleSelectFamily = useCallback((family: Family | null) => { // Allow null
        setSelectedFamily(family);
    }, []);

    const handleCreateFamily = async (family: Family) => {
        try {
            const newFamily = await createFamily(family);
            setFamilies(prevFamilies => [...prevFamilies, newFamily]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteFamily = async (familyId: number) => {
        try {
            await deleteFamily(familyId);
            setFamilies(prevFamilies => prevFamilies.filter(family => family.FamilyID !== familyId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateFamily = async (family: Family) => {
        try {
            const updatedFamily = await updateFamily(family);
            setFamilies(prevFamilies => prevFamilies.map(f => f.FamilyID === updatedFamily.FamilyID ? updatedFamily : f));
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
            <Typography variant="h4" component="h1">Welcome, {member.FullName}</Typography>
            <FamiliesView
                families={families}
                onSelectFamily={handleSelectFamily}
                selectedFamily={selectedFamily}
                onCreateFamily={handleCreateFamily}
                onUpdateFamily={handleUpdateFamily}
                onDeleteFamily={handleDeleteFamily}
                setLoading={setLoading}
            />
        </Container>
    );
};

export default AdminPanel;
