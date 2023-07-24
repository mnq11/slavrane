// FamilyDetails.tsx
import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { Family, Member } from "../../../../../hooks/useMember";
import { getMembersByFamilyId } from "../../../../../API/api";
import MembersCardsView from "../member/MembersCardsView";
import { FamilyForm } from "./FamilyForm";
import { modifyFamily, removeFamily } from '../Provider/adminPanelFunctions';
import { FamilyDetailsStyles } from "./AdminFamily.Styles";
import { useMember } from '../../../../../hooks/useMember';

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
    const [, setFamilyData] = useState<Family | undefined>(family);
    const [user] = useMember();

    const classes = FamilyDetailsStyles();

    // add these functions
    const handleUpdateFamily = async (updatedFamily: Family) => {
        const modifiedFamily = await modifyFamily(updatedFamily);
        if (updatedFamily) {
            // @ts-ignore
            setFamilyData(modifiedFamily);
            setDialogOpen(false);
            onBackToFamilyList();
        } else {
            console.error("Failed to update family.");
        }
    };

    const handleDeleteFamily = async (familyId: number | undefined) => {
        await removeFamily(familyId);
        onBackToFamilyList();
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
        <div dir="rtl"> {/* Set the text direction to right-to-left */}
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5">الاسم: {family?.FamilyName}</Typography>
                    <Typography variant="body2">العنوان: {family?.Address}</Typography>
                    <Typography variant="body2">رقم الاتصال: {family?.ContactNumber}</Typography>
                    <Button className={classes.backButton} onClick={onBackToFamilyList}>العودة</Button>
                    {(user?.Role === 'admin' || user?.Role === 'moderator') &&
                        <>
                            <Button className={classes.updateButton} onClick={() => setDialogOpen(true)}>تحديث العائلة</Button>
                            <Button className={classes.deleteButton} onClick={() => handleDeleteFamily(family?.FamilyID)}>حذف</Button>
                        </>
                    }
                </CardContent>
            </Card>
            <MembersCardsView
                members={members}
                onSelectMember={onSelectMember}
                selectedFamily={family?.FamilyID}
            />
            {dialogOpen && (
                <FamilyForm
                    title="تحديث العائلة"
                    family={family}
                    onSubmit={handleUpdateFamily}
                    onCancel={() => setDialogOpen(false)}
                />
            )}
        </div>
    );
};

export default FamilyDetails;
