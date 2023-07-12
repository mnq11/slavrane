// MemberDetails.tsx

import React, {useState} from 'react';
import {Member} from "../../../../../hooks/useMember";
import {Button, Card, CardContent, Grid, Typography} from '@material-ui/core';
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

interface MemberDetailsProps {
    member: Member;
    onBackToFamilyDetails: () => void;
}


const MemberDetails: React.FC<MemberDetailsProps> = ({
                                                         member,
                                                         onBackToFamilyDetails,
                                                     }) => {
    const [editDialogOpen, setUpdateDialogOpen] = useState(false);
    const [isTaskComponentVisible, setTaskComponentVisible] = useState(false);
    const [isSkillComponentVisible, setSkillComponentVisible] = useState(false);
    const [isExpenseComponentVisible, setExpenseComponentVisible] = useState(false);
    const [isIncomeComponentVisible, setIncomeComponentVisible] = useState(false);
    const [isLoanComponentVisible, setLoanComponentVisible] = useState(false);
    const [isResourceComponentVisible, setResourceComponentVisible] = useState(false);
    const [isSavingsComponentVisible, setSavingsComponentVisible] = useState(false);

    const classes = MemberDetailsStyles();

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

    const handleCheckboxChange = () => {
        setTaskComponentVisible(prev => !prev);
        if (!isTaskComponentVisible) {
            setSkillComponentVisible(false);
            setExpenseComponentVisible(false);
            setIncomeComponentVisible(false);
            setLoanComponentVisible(false);
            setResourceComponentVisible(false);
            setSavingsComponentVisible(false);
        }
    }
    const handleSkillCheckboxChange = () => {
        setSkillComponentVisible(prev => !prev);
        if (!isSkillComponentVisible) {
            setTaskComponentVisible(false);
            setExpenseComponentVisible(false);
            setIncomeComponentVisible(false);
            setLoanComponentVisible(false);
            setResourceComponentVisible(false);
            setSavingsComponentVisible(false);
        }
    };
    const handleExpenseCheckboxChange = () => {
        setExpenseComponentVisible(prev => !prev);
        if (!isExpenseComponentVisible) {
            setTaskComponentVisible(false);
            setSkillComponentVisible(false);
            setIncomeComponentVisible(false);
            setLoanComponentVisible(false);
            setResourceComponentVisible(false);
            setSavingsComponentVisible(false);
        }
    };
    const handleIncomeCheckboxChange = () => {
        setIncomeComponentVisible(prev => !prev);
        if (!isIncomeComponentVisible) {
            setTaskComponentVisible(false);
            setSkillComponentVisible(false);
            setExpenseComponentVisible(false);
            setLoanComponentVisible(false);
            setResourceComponentVisible(false);
            setSavingsComponentVisible(false);
        }
    }
    const handleLoanCheckboxChange = () => {
        setLoanComponentVisible(prev => !prev);
        if (!isLoanComponentVisible) {
            setTaskComponentVisible(false);
            setSkillComponentVisible(false);
            setExpenseComponentVisible(false);
            setIncomeComponentVisible(false);
            setResourceComponentVisible(false);
            setSavingsComponentVisible(false);
        }
    };
    const handleResourceCheckboxChange = () => {
        setResourceComponentVisible(prev => !prev);
        if (!isResourceComponentVisible) {
            setTaskComponentVisible(false);
            setSkillComponentVisible(false);
            setExpenseComponentVisible(false);
            setIncomeComponentVisible(false);
            setLoanComponentVisible(false);
            setSavingsComponentVisible(false);
        }
    };
    const handleSavingsCheckboxChange = () => {
        setSavingsComponentVisible(prev => !prev);
        if (!isSavingsComponentVisible) {
            setTaskComponentVisible(false);
            setSkillComponentVisible(false);
            setExpenseComponentVisible(false);
            setIncomeComponentVisible(false);
            setLoanComponentVisible(false);
            setResourceComponentVisible(false);
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
                            <Button className={classes.backButton} variant="contained" color="primary"
                                    onClick={onBackToFamilyDetails}>Back</Button>
                            <Button className={classes.updateButton} variant="contained" color="primary"
                                    onClick={() => setUpdateDialogOpen(true)}>Update</Button>
                            <Button className={classes.deleteButton} variant="contained" color="secondary"
                                    onClick={handleDelete}>Delete</Button>
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
                checked={isExpenseComponentVisible}
                onChange={handleExpenseCheckboxChange}
                member={member}
            />
            <IncomeBox
                label="Income"
                checked={isIncomeComponentVisible}
                onChange={handleIncomeCheckboxChange}
                member={member}
            />
            <SkillBox
                label="Skill"
                checked={isSkillComponentVisible}
                onChange={handleSkillCheckboxChange}
                member={member}
            />
            <TaskBox
                label="Tasks"
                checked={isTaskComponentVisible}
                onChange={handleCheckboxChange}
                member={member}
            />
            <LoanBox
                label="Loans"
                checked={isLoanComponentVisible}
                onChange={handleLoanCheckboxChange}
                member={member}
            />
            <ResourceBox
                label="Resources"
                checked={isResourceComponentVisible}
                onChange={handleResourceCheckboxChange}
                member={member}
            />
            <SavingsBox
                label="Savings"
                checked={isSavingsComponentVisible}
                onChange={handleSavingsCheckboxChange}
                member={member}
            />
        </div>
    );
};

export default MemberDetails;
