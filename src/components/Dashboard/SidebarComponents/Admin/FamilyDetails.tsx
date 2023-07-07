// FamilyDetails.tsx
import React, { useState } from 'react';
import { Family } from "../../../../hooks/useMember";
import { Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

interface FamilyDetailsProps {
    family: Family;
    onUpdateFamily: (family: Family) => void;
    onDeleteFamily: (familyId: number) => void;
    onBackToFamilyList: () => void;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({ family, onUpdateFamily, onDeleteFamily, onBackToFamilyList }) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const handleConfirmDelete = () => {
        onDeleteFamily(family.FamilyID);
        setOpenConfirmDialog(false);
        onBackToFamilyList(); // Navigate back to the family list after deleting a family
    };

    return (
        <Box m={2}>
            <Typography variant="h5">{family.FamilyName}</Typography>
            <Typography variant="body1">{family.Address}</Typography>
            <Box mt={2}>
                <Button variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />} onClick={() => onUpdateFamily(family)}>
                    Update
                </Button>
                <Button variant="contained" color="secondary" startIcon={<ErrorOutlineIcon />} onClick={() => setOpenConfirmDialog(true)} style={{ marginLeft: '10px' }}>
                    Delete
                </Button>
                <Button variant="outlined" onClick={onBackToFamilyList} style={{ marginLeft: '10px' }}>
                    Back
                </Button>
            </Box>

            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
            >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FamilyDetails;
