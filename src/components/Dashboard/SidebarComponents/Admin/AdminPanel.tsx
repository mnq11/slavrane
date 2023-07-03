// AdminPanel.tsx
import React, {useEffect, useState} from 'react';
import {Family, Member} from "../../../../hooks/useMember";
import {getAllFamilies, getMembersByFamilyId, getMemberTasks, getMemberResources, getMemberIncomes,getMemberExpenses ,getMemberFamily,getMemberRoles ,getMemberSavings ,getMemberSkills} from "../../../../API/api";
import FamiliesView from './FamiliesView';
import MembersView from './MembersView';
import MemberDetailsView from './MemberDetailsView';
import {CircularProgress, Container, Typography} from '@material-ui/core';


interface AdminPanelProps {
    member: Member;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ member }) => {
    const [families, setFamilies] = useState<Family[]>([]); // new state variable to hold families
    const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [members, setMembers] = useState<Member[]>([]); // new state variable to hold members
    const [tasks, setTasks] = useState([]); // new state variable to hold tasks
    const [resources, setResources] = useState([]); // new state variable to hold resources
    const [incomes, setIncomes] = useState([]); // new state variable to hold incomes
    const [expenses, setExpenses] = useState([]); // new state variable to hold expenses
    const [family, setFamily] = useState(null); // new state variable to hold family
    const [roles, setRoles] = useState([]); // new state variable to hold roles
    const [savings, setSavings] = useState([]); // new state variable to hold savings
    const [skills, setSkills] = useState([]); // new state variable to hold skills
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    // Fetch all families when the component mounts
    useEffect(() => {
        setLoading(true);
        getAllFamilies()
            .then((fetchedData) => {
                setFamilies(fetchedData.families);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
                setLoading(false);
            });
    }, []);

    // Fetch members when a family is selected
    useEffect(() => {
        if (selectedFamily) {
            getMembersByFamilyId(selectedFamily.FamilyID)
                .then((fetchedData) => {
                    setMembers(fetchedData.members);
                })
                .catch(console.error);
        }
    }, [selectedFamily]);

    // Fetch member data when a member is selected
// Fetch member data when a member is selected
    useEffect(() => {
        if (selectedMember) {
            getMemberTasks(selectedMember.MemberID)
                .then((fetchedData) => {
                    setTasks(fetchedData.tasks);
                })
                .catch(console.error);
            getMemberResources(selectedMember.MemberID)
                .then((fetchedData) => {
                    setResources(fetchedData.resources);
                })
                .catch(console.error);
            getMemberIncomes(selectedMember.MemberID)
                .then((fetchedData) => {
                    setIncomes(fetchedData.incomes);
                })
                .catch(console.error);
            getMemberExpenses(selectedMember.MemberID)
                .then((fetchedData) => {
                    setExpenses(fetchedData.expenses);
                })
                .catch(console.error);
            getMemberFamily(selectedMember.MemberID)
                .then((fetchedData) => {
                    setFamily(fetchedData.family);
                })
                .catch(console.error);
            getMemberRoles(selectedMember.MemberID)
                .then((fetchedData) => {
                    setRoles(fetchedData.roles);
                })
                .catch(console.error);
            getMemberSavings(selectedMember.MemberID)
                .then((fetchedData) => {
                    setSavings(fetchedData.savings);
                })
                .catch(console.error);
            getMemberSkills(selectedMember.MemberID)
                .then((fetchedData) => {
                    setSkills(fetchedData.skills);
                })
                .catch(console.error);
        }
    }, [selectedMember]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <Container>
            <Typography variant="h4" component="h1">Welcome, {member.FullName}</Typography>
            <FamiliesView families={families} onSelectFamily={setSelectedFamily} />
            {selectedFamily && <MembersView family={selectedFamily} onSelectMember={setSelectedMember} members={members} />}
            {selectedMember && <MemberDetailsView member={selectedMember} tasks={tasks} resources={resources} incomes={incomes} expenses={expenses} family={family} roles={roles} savings={savings} skills={skills} />}
        </Container>
    );
};

export default AdminPanel;