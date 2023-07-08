// MembersCardsView.tsx
import React from 'react';
import {Member} from "../../../../../hooks/useMember";
import {Card, CardContent, Grid, Typography} from '@material-ui/core';

interface MembersCardsViewProps {
    members: Member[] | undefined;
    onSelectMember: (member: Member) => void;
}

const MembersCardsView: React.FC<MembersCardsViewProps> = ({members, onSelectMember}) => {
    return (
        <div>
            <h1>MembersCardsView</h1>

        <Grid container spacing={3}>
            {members?.map((member) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={member.MemberID}>
                    <Card onClick={() => onSelectMember(member)}>
                        <CardContent>
                            <Typography variant="h5">MemberName {member.MemberName}</Typography>
                            <Typography variant="body2">Email {member.Email}</Typography>
                            <Typography variant="body2">ContactNumber {member.ContactNumber}</Typography>
                            <Typography variant="body2">DateOfBirth {member.DateOfBirth}</Typography>
                            <Typography variant="body2">score {member.score}</Typography>
                            <Typography variant="body2">ContactNumber {member.ContactNumber}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </div>
    );
};

export default MembersCardsView;
