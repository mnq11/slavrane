// MemberDetails.tsx

import React, { useState } from 'react';
import { Member } from "../../../../../hooks/useMember";
import {Button, Card, CardContent, Grid, Typography} from '@material-ui/core';
import MemberForm from "./ MemberForm";
import {deleteMember, updateMember} from "../../../../../API/api";
import {toast} from "react-toastify";
import {MemberDetailsStyles, MembersCardsViewStyles} from "./AdminMember.Styles";

interface MemberDetailsProps {
    member: Member;
    onBackToFamilyDetails: () => void;

}

const MemberDetails: React.FC<MemberDetailsProps> = ({
                                                         member,
                                                         onBackToFamilyDetails,
                                                     }) => {
    const [editDialogOpen, setUpdateDialogOpen] = useState(false);
    const classes = MemberDetailsStyles   ();

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
                        <Button className={classes.backButton} variant="contained" color="primary" onClick={onBackToFamilyDetails}>Back</Button>
                        <Button className={classes.updateButton} variant="contained" color="primary" onClick={() => setUpdateDialogOpen(true)}>Update</Button>
                        <Button className={classes.deleteButton} variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>

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
    );
};

export default MemberDetails;