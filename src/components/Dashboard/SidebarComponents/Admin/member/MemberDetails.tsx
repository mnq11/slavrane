// MemberDetails.tsx

import React, {useState} from 'react';
import {Member} from "../../../../../hooks/useMember";
import { Card, CardContent, Grid, IconButton, Typography} from '@material-ui/core';
import MemberForm from "./ MemberForm";
import {deleteMember, updateMember} from "../../../../../API/api";
import {toast} from "react-toastify";
import TaskBox from './Task/TaskBox';
import {MemberDetailsStyles} from "./Styling/AdminMember.Styles";
import SkillBox from "./Skill/SkillBox";
import ExpenseBox from "./Expenses/ExpenseBox";
import IncomeBox from "./Incomes/IncomeBox";
import LoanBox from "./Lone/LoanBox";
import ResourceBox from "./Resource/ResourceBox";
import SavingsBox from "./Savings/SavingsBox";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface MemberDetailsProps {
    member: Member;
    onBackToFamilyDetails: () => void;
}

const BOXES = {
    TASK: 'task',
    SKILL: 'skill',
    EXPENSE: 'expense',
    INCOME: 'income',
    LOAN: 'loan',
    RESOURCE: 'resource',
    SAVINGS: 'savings',
};
const MemberDetails: React.FC<MemberDetailsProps> = ({
                                                         member,
                                                         onBackToFamilyDetails,
                                                     }) => {
    const [editDialogOpen, setUpdateDialogOpen] = useState(false);
    const [activeBox, setActiveBox] = useState<string | null>(null);

    const classes = MemberDetailsStyles();
    const handleCheckboxChange = (box: string) => {
        setActiveBox(prev => prev !== box ? box : null);
    };

    const handleDelete = async () => {
        try {
            await deleteMember(member.MemberID);
            toast.success('Member deleted successfully');
            onBackToFamilyDetails();
        } catch (error) {
            console.error("Failed to delete member: ", error);
            toast.error('Failed to delete member');
        }
    };

    const handleUpdate = async (updatedMember: Member) => {
        try {
            const updatedMemberWithId = {...updatedMember, MemberID: member.MemberID};
            await updateMember(updatedMemberWithId);
            setUpdateDialogOpen(false);
            toast.success('Member updated successfully');
            onBackToFamilyDetails();
        } catch (error) {
            console.error("Failed to update member: ", error);
            toast.error('Failed to update member');
        }
    };



    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5">MemberName: {member.MemberName}</Typography>
                            <Typography variant="body2">Email: {member.Email}</Typography>
                            <Typography variant="body2">ContactNumber: {member.ContactNumber}</Typography>
                            <Typography variant="body2">DateOfBirth: {member.DateOfBirth}</Typography>
                            <Typography variant="body2">Score: {member.score}</Typography>
                            <Typography variant="body2">ContactNumber: {member.ContactNumber}</Typography>

                        </Grid>
                        <Grid item xs={12}>
                            <IconButton className={classes.backButton} onClick={onBackToFamilyDetails}>
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                            <IconButton className={classes.updateButton} onClick={() => setUpdateDialogOpen(true)}>
                                <EditIcon fontSize="large" />
                            </IconButton>
                            <IconButton className={classes.deleteButton} onClick={handleDelete}>
                                <DeleteIcon fontSize="large" />
                            </IconButton>

                        </Grid>
                    </Grid>

                </CardContent>
                {editDialogOpen && (
                    <MemberForm
                        title="Update Member"
                        onSubmit={handleUpdate}
                        onCancel={() => setUpdateDialogOpen(false)}
                        member={member}
                    />
                )}
            </Card>
            <ExpenseBox
                label="Expenses"
                checked={activeBox === BOXES.EXPENSE}
                onChange={() => handleCheckboxChange(BOXES.EXPENSE)}
                member={member}
            />
            <IncomeBox
                label="Income"
                checked={activeBox === BOXES.INCOME}
                onChange={() => handleCheckboxChange(BOXES.INCOME)}
                member={member}
            />
            <SkillBox
                label="Skill"
                checked={activeBox === BOXES.SKILL}
                onChange={() => handleCheckboxChange(BOXES.SKILL)}
                member={member}
            />
            <TaskBox
                label="Tasks"
                checked={activeBox === BOXES.TASK}
                onChange={() => handleCheckboxChange(BOXES.TASK)}
                member={member}
            />

            <ResourceBox
                label="Resources"
                checked={activeBox === BOXES.RESOURCE}
                onChange={() => handleCheckboxChange(BOXES.RESOURCE)}
                member={member}
            />
            <SavingsBox
                label="Savings"
                checked={activeBox === BOXES.SAVINGS}
                onChange={() => handleCheckboxChange(BOXES.SAVINGS)}
                member={member}
            />
            <LoanBox
                label="Loans"
                checked={activeBox === BOXES.LOAN}
                onChange={() => handleCheckboxChange(BOXES.LOAN)}
                member={member}
            />
        </div>
    );
};

export default MemberDetails;
