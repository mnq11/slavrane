// FamilyDetails.tsx

import React, {useEffect, useState} from 'react';
import { Button, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import {Family, Member} from "../../../../../hooks/useMember";
import {getMembersByFamilyId} from "../../../../../API/api"; // Import updateFamily and deleteFamily
import MembersCardsView from "../member/MembersCardsView";
import {toast} from "react-toastify";

interface FamilyDetailsProps {
    family: Family | undefined;
    onBackToFamilyList: () => void;
    onSelectMember: (member: Member) => void;
    initialMembers: Member[] | undefined;
    handleDeleteFamily: (familyId: number | undefined) => void;
    handleUpdateFamily: (family: Family) => void; // Add this line
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({
                                                         family,
                                                         onBackToFamilyList,
                                                         onSelectMember,
                                                         initialMembers,
                                                         handleDeleteFamily,
                                                         handleUpdateFamily, // Add this line
                                                     }) => {

    const [members, setMembers] = useState<Member[]>(initialMembers || []);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [updatedFamilyName, setUpdatedFamilyName] = useState('');
    const [updatedFamilyAddress, setUpdatedFamilyAddress] = useState('');
    const [updatedFamilyContactNumber, setUpdatedFamilyContactNumber] = useState('');

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

    const handleOpenUpdateDialog = () => {
        setUpdatedFamilyName(family?.FamilyName || '');
        setUpdatedFamilyAddress(family?.Address || '');
        setUpdatedFamilyContactNumber(family?.ContactNumber || '');
        setDialogOpen(true);
    };
    const handleConfirmUpdate = () => {
        if (family) {
            const updatedFamily = {
                ...family,
                FamilyName: updatedFamilyName,
                Address: updatedFamilyAddress,
                ContactNumber: updatedFamilyContactNumber,
            };
            handleUpdateFamily(updatedFamily);
            setDialogOpen(false);
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
                    <Button onClick={handleOpenUpdateDialog}>Update</Button>
                    <Button onClick={() => handleDeleteFamily(family?.FamilyID)}>Delete</Button>
                    <Button onClick={onBackToFamilyList}>Back</Button>
                </CardContent>
            </Card>
            <MembersCardsView
                members={members}
                onSelectMember={onSelectMember}
            />
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Update Family</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Family Name"
                        value={updatedFamilyName}
                        onChange={(e) => setUpdatedFamilyName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        value={updatedFamilyAddress}
                        onChange={(e) => setUpdatedFamilyAddress(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Contact Number"
                        value={updatedFamilyContactNumber}
                        onChange={(e) => setUpdatedFamilyContactNumber(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FamilyDetails;
