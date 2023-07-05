// FamiliesView.tsx
import React, {useState} from 'react';
import {Family, Member} from "../../../../hooks/useMember";
import {
    createMember,
    updateMember,
    deleteMember,
    // other imports...
} from "../../../../API/api";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Dialog,
    DialogTitle, TextField, DialogContent, DialogActions, TablePagination
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MembersView from './MembersView';
import {FamiliesViewStyles} from "./AdminPanel.Styles";
import {toast} from "react-toastify";

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
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

}

const FamiliesView: React.FC<FamiliesViewProps> = ({
                                                       families,
                                                       selectedFamilyId,
                                                       onSelectFamily,
                                                       onSelectMember,
                                                       members,
                                                       selectedMemberId,
                                                       onCreateFamily,
                                                       onUpdateFamily,
                                                       onDeleteFamily,
                                                       setMembers,
                                                       setLoading,

                                                   }) => {
    const classes = FamiliesViewStyles(); // use the styles

    const [dialogOpen, setDialogOpen] = useState(false);
    const [familyToUpdate, setFamilyToUpdate] = useState<Family | null>(null);
    const [newFamilyName, setNewFamilyName] = useState('');
    const [newFamilyAddress, setNewFamilyAddress] = useState('');

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [localMembers, setLocalMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [newMember, setNewMember] = useState<Member | null>(null);


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
        const newFamily = {
            FamilyID: Math.floor(Math.random() * 1000000), // generates a random number between 0 and 999999
            FamilyName: newFamilyName,
            Address: newFamilyAddress,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        onCreateFamily(newFamily);
        setNewFamilyName('');
        setNewFamilyAddress('');
    };

    const handleUpdateFamily = () => {
        if (familyToUpdate) {
            onUpdateFamily({...familyToUpdate, FamilyName: newFamilyName, Address: newFamilyAddress});
        }
        handleCloseDialog();
    };

    // Pagination change handlers
    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectMemberToUpdate = (member: Member) => {
        setNewMember(member);
    };

    function handleDialogClose() {
        setSelectedMember(null);
        setNewMember(null);
    }

    const handleUpdateMember = async (updatedMember: Member) => {
        setLoading(true);
        try {
            await updateMember(updatedMember); // use updateMember here
            setMembers(prevMembers => prevMembers.map(member => member.MemberID === updatedMember.MemberID ? updatedMember : member));
            toast.success('Member updated successfully.');
        } catch (error) {
            toast.error('An error occurred while updating the member.');
        } finally {
            setLoading(false);
            handleDialogClose();
        }
    };



    const handleDeleteMember = async (memberId: number) => {
        const confirm = window.confirm('Are you sure you want to delete this member?');
        if (confirm) {
            setLoading(true);
            try {
                await deleteMember(memberId);
                setMembers(prevMembers => prevMembers.filter(member => member.MemberID !== memberId));
                toast.success('Member deleted successfully.');
            } catch (error) {
                toast.error('An error occurred while deleting the member.');
            } finally {
                setLoading(false);
            }
        }
    };


    const handleCreateMember = async (member: Member) => {
        try {
            const newMember = await createMember(member);
            setMembers(prevMembers => [...prevMembers, newMember]);
            toast.success('Member created successfully.');
        } catch (error) {
            toast.error('An error occurred while creating the member.');
        } finally {
            setLoading(false);
            handleDialogClose();
        }
    };

    return (
        <div className={classes.root}>
            <Button className={classes.button} onClick={() => setDialogOpen(true)}>Create New Family</Button>
            {selectedFamilyId ? (
                families.filter(family => family.FamilyID === selectedFamilyId).map((family) => (
                    <Accordion key={family.FamilyID}
                               expanded={selectedFamilyId === family.FamilyID}
                               onChange={() => onSelectFamily(family)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                          className={classes.row}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                <Typography>{family.FamilyID} - {family.FamilyName}</Typography>
                                <div>
                                    <Button className={classes.updateButton} onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenDialog(family);
                                    }}>Update</Button>
                                    <Button className={classes.deleteButton} onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteFamily(family.FamilyID);
                                    }}>Delete</Button>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MembersView family={family} onSelectMember={onSelectMember} members={members}
                                         selectedMemberId={selectedMemberId}
                                         onUpdateMember={handleUpdateMember}
                                         onDeleteMember={handleDeleteMember}
                                         onCreateMember={handleCreateMember}
                                         onSelectMemberToUpdate={handleSelectMemberToUpdate}

                            />
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                families.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((family) => (
                    <Accordion key={family.FamilyID}
                               expanded={selectedFamilyId === family.FamilyID}
                               onChange={() => onSelectFamily(family)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                          className={classes.row}>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                <Typography>{family.FamilyID} - {family.FamilyName}</Typography>
                                <div>
                                    <Button className={classes.updateButton} onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenDialog(family);
                                    }}>Update</Button>
                                    <Button className={classes.deleteButton} onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteFamily(family.FamilyID);
                                    }}>Delete</Button>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MembersView family={family} onSelectMember={onSelectMember} members={members}
                                         selectedMemberId={selectedMemberId}
                                         onUpdateMember={handleUpdateMember}
                                         onDeleteMember={handleDeleteMember}
                                         onCreateMember={handleCreateMember}
                                         onSelectMemberToUpdate={handleSelectMemberToUpdate}

                            />
                        </AccordionDetails>
                    </Accordion>
                ))
            )}

            <TablePagination
                component="div"
                count={families.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Dialog open={dialogOpen} onClose={handleCloseDialog} className={classes.dialog}>
                <DialogTitle
                    className={classes.dialogTitle}>{familyToUpdate ? 'Update Family' : 'Create New Family'}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Family Name"
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
                <DialogActions className={classes.dialogActions}>
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