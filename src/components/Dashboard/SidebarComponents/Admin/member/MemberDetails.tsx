// MemberDetails.tsx

import React from 'react';
import { Member } from "../../../../../hooks/useMember";
import { Button, Card, CardContent, Typography } from '@material-ui/core';

interface MemberDetailsProps {
    member: Member;
    onBackToFamilyDetails: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({
                                                         member,
                                                         onBackToFamilyDetails,
                                                     }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">MemberName : {member.MemberName}</Typography>
                <Typography variant="body2">Email : {member.Email}</Typography>
                <Typography variant="body2">ContactNumber : {member.ContactNumber}</Typography>
                <Button onClick={onBackToFamilyDetails}>Back</Button>
            </CardContent>
        </Card>
    );
};

export default MemberDetails;
