// Family.ts
// AdminPanel.tsx
import React, {useEffect, useState} from 'react';
import {Family, Member} from "../../../../hooks/useMember";
import {getAllFamilies, getMembersByFamilyId} from "../../../../API/api";
import FamilyTable from './FamilyTable';
import MemberTable from './MemberTable'; // new component to display members
import { useStyles } from './AdminPanel.Styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface AdminPanelProps {
    member: Member;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ member }) => {
    const classes = useStyles();
    const [families, setFamilies] = useState<Family[]>([]);
    const [members, setMembers] = useState<Member[]>([]); // new state variable to hold members
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchFamilyMembers = (familyId: number) => {
        getMembersByFamilyId(familyId)
            .then((fetchedData) => {
                setMembers(fetchedData.members);
            })
            .catch(console.error);
    };

    useEffect(() => {
        setLoading(true);
        getAllFamilies()
            .then((fetchedData) => {
                setFamilies(fetchedData.families);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className={classes.root}>
            <h1>Welcome to the admin page , {member.FullName}</h1>
            <h2>Families</h2>
            <FamilyTable families={families} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} fetchFamilyMembers={fetchFamilyMembers} />
            <h2>Members of Selected Family</h2>
            <MemberTable members={members} />
        </div>
    );
};

export default AdminPanel;
