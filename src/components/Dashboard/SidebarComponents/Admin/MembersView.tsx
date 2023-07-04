// MembersView.tsx
import React, {useState} from 'react';
import {Family, Member} from "../../../../hooks/useMember";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    DialogActions,
    Dialog,
    DialogContent,
    TextField, DialogTitle
} from '@material-ui/core';

interface MembersViewProps {
    family: Family;
    onSelectMember: (member: Member) => void;
    members: Member[];
    selectedMemberId: number | null;
    onUpdateMember: (member: Member) => void;
    onDeleteMember: (memberId: number) => void;
    onCreateMember: (member: Member) => void;
}

const MembersView: React.FC<MembersViewProps> = ({
                                                     family,
                                                     onSelectMember,
                                                     members,
                                                     selectedMemberId,
                                                     onUpdateMember,
                                                     onDeleteMember,
                                                     onCreateMember
                                                 }) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [memberToUpdate, setMemberToUpdate] = useState<Member | null>(null);
    const [newMember, setNewMember] = useState<Member>({
        Expenses: [],
        Incomes: [],
        Resources: [],
        Role: 'normal',
        PhoneNumber: 0,
        Roles: [],
        Savings: [],
        Skills: [],
        Tasks: [],
        FamilyID: 0,
        MemberID: 0,
        FullName: '',
        Email: '',
        Family: {
            FamilyID: 0,
            FamilyName: '',
            Address: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    });

    const handleDialogOpen = (member: Member) => {
        setMemberToUpdate(member);
        setNewMember(member);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setMemberToUpdate(null);
    };

    const handleCreateOrUpdateMember = () => {
        if (memberToUpdate) {
            onUpdateMember(newMember);
        } else {
            onCreateMember(newMember);
        }
        setDialogOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMember({
            ...newMember,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div>
            <Button onClick={() => handleDialogOpen(newMember)}>Create Member</Button>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{memberToUpdate ? 'Update Member' : 'Create New Member'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="FullName"
                        label="Full Name"
                        type="text"
                        value={newMember.FullName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="Email"
                        label="Email"
                        type="email"
                        value={newMember.Email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="Role"
                        label="Role"
                        type="text"
                        value={newMember.Role}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="PhoneNumber"
                        label="Phone Number"
                        type="tel"
                        value={newMember.PhoneNumber}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateOrUpdateMember} color="primary">
                        {memberToUpdate ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member) => (
                            (!selectedMemberId || selectedMemberId === member.MemberID) && (
                                <TableRow key={member.MemberID} onClick={() => onSelectMember(member)}>
                                    <TableCell>{member.MemberID}</TableCell>
                                    <TableCell>{member.FullName}</TableCell>
                                    <TableCell>{member.Email}</TableCell>
                                    <TableCell>{member.Role}</TableCell>
                                    <TableCell>{member.PhoneNumber}</TableCell>
                                    <TableCell>
                                        <Button onClick={(e) => {
                                            e.stopPropagation();
                                            handleDialogOpen(member);
                                        }}>Update</Button>
                                        <Button onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteMember(member.MemberID);
                                        }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MembersView;
