// FamilyDetails.tsx
import React from 'react';
import { Family } from "../../../../hooks/useMember";
import { Button, Card, CardContent, Typography } from '@material-ui/core';

interface FamilyDetailsProps {
    family: Family;
    onUpdateFamily: (family: Family) => void;
    onDeleteFamily: (familyId: number| undefined) => void;
    onBackToFamilyList: () => void;
    onOpenUpdateDialog: (family: Family) => void; // New prop
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({
                                                         family,
                                                         onUpdateFamily,
                                                         onDeleteFamily,
                                                         onBackToFamilyList,
                                                         onOpenUpdateDialog, // New prop
                                                     }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{family.FamilyName}</Typography>
                <Typography variant="body2">{family.Address}</Typography>
                <Typography variant="body2">{family.ContactNumber}</Typography>
                <Button onClick={() => onOpenUpdateDialog(family)}>Update</Button>
                <Button onClick={() => onDeleteFamily(family.FamilyID)}>Delete</Button>
                <Button onClick={onBackToFamilyList}>Back</Button>
            </CardContent>
        </Card>
    );
};

export default FamilyDetails;
