// FamiliesView.tsx
import React, {useState} from 'react';
import { Family, Member } from "../../../../hooks/useMember";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Dialog,
    DialogTitle, TextField, DialogContent, DialogActions
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MembersView from './MembersView';

interface FamiliesViewProps {
    families: Family[];
    selectedFamilyId: number | null;
    onSelectFamily: (family: Family) => void;
    onSelectMember: (member: Member) => void;
    members: Member[];
    selectedMemberId: number | null;
    onCreateFamily: (family: Family) => void;
    onUpdateFamily: (family: Family) => void;
    onDeleteFamily: (familyId: number) => void;
}

const FamiliesView: React.FC<FamiliesViewProps> = ({ families, selectedFamilyId, onSelectFamily, onSelectMember, members, selectedMemberId, onCreateFamily, onUpdateFamily, onDeleteFamily }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [familyToUpdate, setFamilyToUpdate] = useState<Family | null>(null);
    const [newFamilyName, setNewFamilyName] = useState('');
    const [newFamilyAddress, setNewFamilyAddress] = useState('');

    const handleOpenDialog = (family: Family) => {
        setFamilyToUpdate(family);
        setNewFamilyName(family.FamilyName);
        setNewFamilyAddress(family.Address);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setFamilyToUpdate(null);
    };

    const handleCreateFamily = () => {
        onCreateFamily({ FamilyID: Date.now(), FamilyName: newFamilyName, Address: newFamilyAddress, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        setNewFamilyName('');
        setNewFamilyAddress('');
    };

    const handleUpdateFamily = () => {
        if (familyToUpdate) {
            onUpdateFamily({ ...familyToUpdate, FamilyName: newFamilyName, Address: newFamilyAddress });
        }
        handleCloseDialog();
    };

    return (
        <div>
            <Button onClick={handleCreateFamily}>Create New families</Button>
            {families.map((family) => (
                <Accordion key={family.FamilyID} expanded={selectedFamilyId === family.FamilyID} onChange={() => onSelectFamily(family)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>{family.FamilyName}</Typography>
                        {/*<Typography>{family.Address}</Typography>*/}
                        <Button onClick={() => handleOpenDialog(family)}>Update</Button>
                        <Button onClick={() => onDeleteFamily(family.FamilyID)}>Delete</Button> {/* Add a delete button for each family */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <MembersView family={family} onSelectMember={onSelectMember} members={members} selectedMemberId={selectedMemberId} />
                    </AccordionDetails>
                </Accordion>
            ))}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{familyToUpdate ? 'Update families' : 'Create New families'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="families Name"
                        value={newFamilyName}
                        onChange={(e) => setNewFamilyName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        value={newFamilyAddress}
                        onChange={(e) => setNewFamilyAddress(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={familyToUpdate ? handleUpdateFamily : handleCreateFamily} color="primary">
                        {familyToUpdate ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FamiliesView;
