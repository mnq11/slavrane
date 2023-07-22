import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import {Family} from "../../../../../hooks/useMember";
import {FamilyFormStyles} from "./AdminFamily.Styles";

interface FamilyFormProps {
    title: string;
    family?: Family;
    onSubmit: (family: Family) => void;
    onCancel: () => void;
}

export const FamilyForm: React.FC<FamilyFormProps> = ({ title, family, onSubmit, onCancel }) => {
    const [familyName, setFamilyName] = useState(family?.FamilyName || '');
    const [address, setAddress] = useState(family?.Address || '');
    const [contactNumber, setContactNumber] = useState(family?.ContactNumber || '');
    FamilyFormStyles ();
    const handleSubmit = () => {
        const updatedFamily: Family = {
            FamilyName: familyName,
            Address: address,
            ContactNumber: contactNumber,
        };

        if (family) {
            updatedFamily.FamilyID = family.FamilyID;
        }

        onSubmit(updatedFamily);
        onCancel();
    };


    return (
        <Dialog open={true} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Family Name"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {title}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
