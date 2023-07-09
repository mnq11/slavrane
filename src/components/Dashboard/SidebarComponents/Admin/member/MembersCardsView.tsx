// MembersCardsView.tsx

import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Member } from "../../../../../hooks/useMember";
import {createNewMember} from "../Provider/adminPanelFunctions";
import MemberForm from "../Forms/ MemberForm";

interface MembersCardsViewProps {
    members: Member[] | undefined;
    onSelectMember: (member: Member) => void;
    selectedFamily: number | undefined;
}

const MembersCardsView: React.FC<MembersCardsViewProps> = ({ members, onSelectMember,selectedFamily }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCreateMember = async (newMember: Member) => {
        const createdMember = await createNewMember(newMember);
        if (createdMember) {
            setDialogOpen(false);
            // Update the members list with the new member...
        } else {
            console.error("Failed to create member.");
        }
    };

    return (
        <div>
            <h1>MembersCardsView</h1>
            <Button onClick={() => setDialogOpen(true)}>Create New Member</Button>
            <Grid container spacing={3}>
                {members?.map((member) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={member.MemberID}>
                        <Card onClick={() => onSelectMember(member)}>
                            <CardContent>
                                <Typography variant="h5">MemberName {member.MemberName}</Typography>
                                <Typography variant="body2">Email {member.Email}</Typography>
                                <Typography variant="body2">ContactNumber {member.ContactNumber}</Typography>
                                <Typography variant="body2">DateOfBirth {member.DateOfBirth}</Typography>
                                <Typography variant="body2">Score {member.score}</Typography>
                                <Typography variant="body2">ContactNumber {member.ContactNumber}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {dialogOpen && (
                <MemberForm
                    title="Create New Member"
                    onSubmit={handleCreateMember}
                    onCancel={() => setDialogOpen(false)}
                    familyId={selectedFamily}
                />
            )}
        </div>
    );
};

export default MembersCardsView;
