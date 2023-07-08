// FamilyDetails.tsx

import React, {useEffect, useState} from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import {Family, Member} from "../../../../../hooks/useMember";
import {getMembersByFamilyId} from "../../../../../API/api";
import MembersCardsView from "../member/MembersCardsView"; // Import MembersCardsView

interface FamilyDetailsProps {
    family: Family | undefined;
    onUpdateFamily: (family: Family) => void;
    onDeleteFamily: (familyId: number| undefined) => void;
    onBackToFamilyList: () => void;
    onOpenUpdateDialog: (family: Family) => void;
    onSelectMember: (member: Member) => void;
    initialMembers: Member[] | undefined;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({
                                                         family,
                                                         onDeleteFamily,
                                                         onBackToFamilyList,
                                                         onOpenUpdateDialog,
                                                         onSelectMember,
                                                         initialMembers,

                                                     }) => {
    const [members, setMembers] = useState<Member[]>(initialMembers || []); // Use initialMembers here

    useEffect(() => {
        if (family) {
            getMembersByFamilyId(family.FamilyID)
                .then((data) => setMembers(data))
                .catch(console.error);
        }
    }, [family]);

    useEffect(() => {
        if (family === null) {
            onBackToFamilyList();
        }
    }, [family, onBackToFamilyList]);

    if (family === null) {
        return null;
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5">Name : {family?.FamilyName}</Typography>
                    <Typography variant="body2">Address : {family?.Address}</Typography>
                    <Typography variant="body2">ContactNumber : {family?.ContactNumber}</Typography>
                    <Button onClick={() => family && onOpenUpdateDialog(family)}>Update</Button>
                    <Button onClick={() => onDeleteFamily(family?.FamilyID)}>Delete</Button>
                    <Button onClick={onBackToFamilyList}>Back</Button>
                </CardContent>
            </Card>
            <MembersCardsView // Add MembersCardsView here
                members={members}
                onSelectMember={onSelectMember}
            />
        </div>
    );
};

export default FamilyDetails;
