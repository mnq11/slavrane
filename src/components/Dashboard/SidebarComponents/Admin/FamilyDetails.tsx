// FamilyDetails.tsx
import React from 'react';
import { Family } from "../../../../hooks/useMember";
import { Button, Typography, Box } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

interface FamilyDetailsProps {
    family: Family;
    onUpdateFamily: () => void;
    onDeleteFamily: () => void;
    onBackToFamilyList: () => void;
}

const FamilyDetails: React.FC<FamilyDetailsProps> = ({ family, onUpdateFamily, onDeleteFamily, onBackToFamilyList }) => {
    return (
        <Box m={2}>
            <Typography variant="h5">{family.FamilyName}</Typography>
            <Typography variant="body1">{family.Address}</Typography>
            <Box mt={2}>
                <Button variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />} onClick={onUpdateFamily}>
                    Update
                </Button>
                <Button variant="contained" color="secondary" startIcon={<ErrorOutlineIcon />} onClick={onDeleteFamily} style={{ marginLeft: '10px' }}>
                    Delete
                </Button>
                <Button variant="outlined" onClick={onBackToFamilyList} style={{ marginLeft: '10px' }}>
                    Back
                </Button>
            </Box>
        </Box>
    );
};

export default FamilyDetails;
