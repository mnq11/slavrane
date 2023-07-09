// FamilyDetails.tsx

import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import {Family, Member} from "../../../../../hooks/useMember";
import {getMembersByFamilyId} from "../../../../../API/api";
import MembersCardsView from "../member/MembersCardsView";
import {FamilyForm} from "../Forms/FamilyForm";
import {modifyFamily, removeFamily} from '../Provider/adminPanelFunctions';  // add this

interface FamilyDetailsProps {
    family: Family | undefined;
    onBackToFamilyList: () => void;
    onSelectMember: (member: Member) => void;
    initialMembers: Member[] | undefined;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({
                                                         family,
                                                         onBackToFamilyList,
                                                         onSelectMember,
                                                         initialMembers,
                                                     }) => {

    const [members, setMembers] = useState<Member[]>(initialMembers || []);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [familyData, setFamilyData] = useState<Family | undefined>(family);

    // add these functions
    const handleUpdateFamily = async (updatedFamily: Family) => {
        const modifiedFamily = await modifyFamily(updatedFamily);
        if (updatedFamily) {
            // @ts-ignore
            setFamilyData(modifiedFamily);
            setDialogOpen(false);
        } else {
            console.error("Failed to update family.");
        }
    };


    const handleDeleteFamily = async (familyId: number | undefined) => {
        await removeFamily(familyId);
    };

    useEffect(() => {
        if (family) {
            getMembersByFamilyId(family.FamilyID)
                .then((data) => setMembers(data))
                .catch(console.error);
        }
    }, [family]);
    useEffect(() => {
        setFamilyData(family);
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
                    <Button onClick={onBackToFamilyList}>Back</Button>
                    <Button onClick={() => setDialogOpen(true)}>Update Family</Button>
                    <Button onClick={() => handleDeleteFamily(family?.FamilyID)}>Delete</Button>

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
                    onSubmit={handleUpdateFamily}
                    onCancel={() => setDialogOpen(false)}
                />
            )}
        </div>
    );
};

export default FamilyDetails;
