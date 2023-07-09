// FamilyDetails.tsx

import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { Family, Member } from "../../../../../hooks/useMember";
import { getMembersByFamilyId } from "../../../../../API/api";
import MembersCardsView from "../member/MembersCardsView";
import {FamilyForm} from "../Forms/FamilyForm";

interface FamilyDetailsProps {
    family: Family | undefined;
    onBackToFamilyList: () => void;
    onSelectMember: (member: Member) => void;
    initialMembers: Member[] | undefined;
    handleDeleteFamily: (familyId: number | undefined) => void;
    handleUpdateFamily: (family: Family) => void;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({
                                                         family,
                                                         onBackToFamilyList,
                                                         onSelectMember,
                                                         initialMembers,
                                                         handleDeleteFamily,
                                                         handleUpdateFamily,
                                                     }) => {

    const [members, setMembers] = useState<Member[]>(initialMembers || []);
    const [dialogOpen, setDialogOpen] = useState(false);

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

    const handleConfirmUpdate = (updatedFamily: Family) => {
        handleUpdateFamily(updatedFamily);
        setDialogOpen(false);
    };

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
                    <Button onClick={() => setDialogOpen(true)}>Update</Button>
                    <Button onClick={() => handleDeleteFamily(family?.FamilyID)}>Delete</Button>
                    <Button onClick={onBackToFamilyList}>Back</Button>
                </CardContent>
            </Card>
            <MembersCardsView
                members={members}
                onSelectMember={onSelectMember}
            />
            {dialogOpen && (
                <FamilyForm
                    title="Update Family"
                    family={family}
                    onSubmit={handleConfirmUpdate}
                    onCancel={() => setDialogOpen(false)}
                />
            )}
        </div>
    );
};

export default FamilyDetails;
