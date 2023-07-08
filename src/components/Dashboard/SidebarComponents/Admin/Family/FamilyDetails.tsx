// FamilyDetails.tsx

import React, {useEffect, useState} from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import {Family, Member} from "../../../../../hooks/useMember";
import {getMembersByFamilyId, updateFamily, deleteFamily} from "../../../../../API/api"; // Import updateFamily and deleteFamily
import MembersCardsView from "../member/MembersCardsView";
import {toast} from "react-toastify";

interface FamilyDetailsProps {
    family: Family | undefined;
    onBackToFamilyList: () => void;
    onSelectMember: (member: Member) => void;
    initialMembers: Member[] | undefined;
    handleDeleteFamily: (familyId: number | undefined) => void;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({
                                                         family,
                                                         onBackToFamilyList,
                                                         onSelectMember,
                                                         initialMembers,
                                                         handleDeleteFamily,
                                                     }) => {
    const [members, setMembers] = useState<Member[]>(initialMembers || []);

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

    const handleUpdateFamily = async (family: Family) => {
        try {
            const updatedFamily = await updateFamily(family);
            toast.success('Family updated successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update family');
        }
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
                    <Button onClick={() => family && handleUpdateFamily(family)}>Update</Button>
                    <Button onClick={() => handleDeleteFamily(family?.FamilyID)}>Delete</Button>
                    <Button onClick={onBackToFamilyList}>Back</Button>
                </CardContent>
            </Card>
            <MembersCardsView
                members={members}
                onSelectMember={onSelectMember}
            />
        </div>
    );
};

export default FamilyDetails;
