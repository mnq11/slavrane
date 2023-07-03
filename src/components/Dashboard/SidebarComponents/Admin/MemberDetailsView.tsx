import React, { useState } from 'react';
import {Expense, Family, Income, Member, Resource, Role, Savings, Skill, Task} from "../../../../hooks/useMember";
import {Typography, Card, CardContent, Switch, FormControlLabel, Button, CircularProgress} from '@material-ui/core';
import DetailTable from './DetailTable';
import { MemberDetailsViewStyles } from './AdminPanel.Styles';

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

    const toggleTable = (table: keyof typeof showTables) => {
        setShowTables(prevState => ({...prevState, [table]: !prevState[table]}));
    };

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

    if (!member) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4" component="h2" className={classes.title}>{member.FullName}</Typography>
            <Card className={classes.toggleAllCard}>
                <Button className={classes.toggleAllButton} onClick={toggleAll}>
                    {showAll ? 'Hide All' : 'Show All'}
                </Button>
            </Card>
            <Card>
                <CardContent>
                    <FormControlLabel
                        control={<Switch checked={showTables.family} onChange={() => toggleTable('family')} />}
                        label="Family"
                    />
                    {showTables.family && family && <DetailTable data={[family]} />}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <FormControlLabel
                        control={<Switch checked={showTables.tasks} onChange={() => toggleTable('tasks')} />}
                        label="Tasks"
                    />
                    {showTables.tasks && <DetailTable data={tasks} />}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <FormControlLabel
                        control={<Switch checked={showTables.resources} onChange={() => toggleTable('resources')} />}
                        label="Resources"
                    />
                    {showTables.resources && <DetailTable data={resources} />}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <FormControlLabel
                        control={<Switch checked={showTables.incomes} onChange={() => toggleTable('incomes')} />}
                        label="Incomes"
                    />
                    {showTables.incomes && <DetailTable data={incomes} />}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <FormControlLabel
                        control={<Switch checked={showTables.expenses} onChange={() => toggleTable('expenses')} />}
                        label="Expenses"
                    />
                    {showTables.expenses && <DetailTable data={expenses} />}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <FormControlLabel
                        control={<Switch checked={showTables.roles} onChange={() => toggleTable('roles')} />}
                        label="Roles"
                    />
                    {showTables.roles && <DetailTable data={roles} />}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <FormControlLabel
                        control={<Switch checked={showTables.savings} onChange={() => toggleTable('savings')} />}
                        label="Savings"
                    />
                    {showTables.savings && <DetailTable data={savings}/>}
                </CardContent>
            </Card>
        </div>
    );
};

export default MemberDetailsView;
