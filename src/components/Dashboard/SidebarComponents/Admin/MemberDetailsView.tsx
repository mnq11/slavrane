// MemberDetailsView.tsx
import React, { useState } from 'react';
import {Expense, Family, Income, Member, Resource, Role, Savings, Skill, Task} from "../../../../hooks/useMember";
import {Typography, Card, Button, CircularProgress} from '@material-ui/core';
import { MemberDetailsViewStyles } from './AdminPanel.Styles';
import TasksTabel from './TasksTabel';

interface MemberDetailsViewProps {
    member: Member;
    tasks: Task[];
    resources: Resource[];
    incomes: Income[];
    expenses: Expense[];
    family: Family | null;
    roles: Role[];
    savings: Savings[];
    skills: Skill[];
}

const MemberDetailsView: React.FC<MemberDetailsViewProps> = ({ member, tasks, resources, incomes, expenses, family, roles, savings, skills }) => {
    const classes = MemberDetailsViewStyles();
    const [showAll, setShowAll] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    const [showTables, setShowTables] = useState({
        family: false,
        tasks: false,
        resources: false,
        incomes: false,
        expenses: false,
        roles: false,
        savings: false,
        skills: false
    });

    // Function to toggle the visibility of a specific table
    const toggleTable = (table: keyof typeof showTables) => {
        setShowTables(prevState => ({...prevState, [table]: !prevState[table]}));
    };

    // Function to toggle the visibility of all tables
    const toggleAll = () => {
        const newState = !showAll;
        setShowAll(newState);
        setShowTables({
            family: newState,
            tasks: newState,
            resources: newState,
            incomes: newState,
            expenses: newState,
            roles: newState,
            savings: newState,
            skills: newState
        });
    };



    // If the member data is not available, show a loading spinner
    if (!member) {
        return <CircularProgress />;
    }

    // IfApologies for the cut-off in the previous message. Here's the continuation:

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Render the member details view
    return (
        <div className={classes.root}>
            <Typography variant="h4" component="h2" className={classes.title}>{member.FullName}</Typography>
            <Card className={classes.toggleAllCard}>
                <Button className={classes.toggleAllButton} onClick={toggleAll} disabled={loading}>
                    {showAll ? 'Hide All' : 'Show All'}
                </Button>
            </Card>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <TasksTabel
                        label="Tasks"
                        tasks={tasks}
                        show={showTables.tasks}
                        toggleShow={() => toggleTable('tasks')}
                    />



                </>
            )}
        </div>
    );
};

export default MemberDetailsView;
