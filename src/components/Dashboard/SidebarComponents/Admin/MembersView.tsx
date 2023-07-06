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
import {Select} from 'antd';
import {toast} from "react-toastify";
import Loading from "../../../ErrorHandling/Loading";
import { MembersViewStyles } from './AdminPanel.Styles';

const {Option} = Select;

interface MembersViewProps {
    family: Family;
    onSelectMember: (member: Member) => void;
    members: Member[];
    selectedMemberId: number | null;
    onUpdateMember: (member: Member) => void;
    onDeleteMember: (memberId: number) => void;
    onCreateMember: (member: Member) => void;
    onSelectMemberToUpdate: (member: Member) => void;

}

const MembersView: React.FC<MembersViewProps> = ({
                                                     family,
                                                     onSelectMember,
                                                     members,
                                                     selectedMemberId,
                                                     onUpdateMember,
                                                     onDeleteMember,
                                                     onCreateMember,
                                                     onSelectMemberToUpdate
                                                 }) => {
    const [loading, setLoading] = useState(false);
    const [error] = useState(null);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [, setMemberToUpdate] = useState<Member | null>(null);
    const [newMember, setNewMember] = useState<Member>({
        FamilyID: family.FamilyID,
        FullName: '',
        Email: '',
        Password: '',
        DateOfBirth: new Date().toISOString(),
        PhoneNumber: '',
        Role: 'normal',
    });
    const classes = MembersViewStyles();


    const handleUpdateDialogOpen = (member: Member) => {
        setMemberToUpdate(member);
        setNewMember(prevMember => ({...prevMember, ...member}));
        setUpdateDialogOpen(true);
        onSelectMemberToUpdate(member);
    };


    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
    };

    const handleDialogClose = () => {
        setUpdateDialogOpen(false);
        setCreateDialogOpen(false);
        setMemberToUpdate(null);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMember({
            ...newMember,
            [event.target.name]: event.target.value
        });
    };
    const handleInputChangeRole = (value: "normal" | "moderator" | "admin" | "analyst") => {
        setNewMember({
            ...newMember,
            Role: value
        });
    };

    const handleUpdateMember = async () => {
        if (newMember && newMember.MemberID) {
            setLoading(true);
            try {
                await onUpdateMember(newMember);
            } catch (error) {
                toast.error('An error occurred while updating the member.');
            } finally {
                setLoading(false);
                handleDialogClose();
            }
        } else {
            toast.error('No member selected for update.');
        }
    };



    const handleCreateMember = () => {
        setLoading(true);
        try {
            onCreateMember(newMember);
        } catch (error) {
        } finally {
            setLoading(false);
            handleDialogClose();
        }
    };
    return (
        <div className={classes.root}>
            <Loading loading={loading} error={error}/>
            <Button className={classes.createButton} onClick={handleCreateDialogOpen}>Create Member</Button>

            <Dialog open={updateDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Update Member</DialogTitle>
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
                    Role :
                    <Select
                        value={newMember.Role}
                        style={{width: 120}}

                        onChange={handleInputChangeRole}
                        getPopupContainer={trigger => trigger.parentNode}
                    >
                        <Option value={'normal'}>Normal</Option>
                        <Option value={'moderator'}>Moderator</Option>
                        <Option value={'admin'}>Admin</Option>
                        <Option value={'analyst'}>Analyst</Option>
                    </Select>
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
                    <Button onClick={handleUpdateMember} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={createDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Create New Member</DialogTitle>
                <DialogContent>
                    <Dialog open={createDialogOpen} onClose={handleDialogClose}>
                        <DialogTitle>Create New Member</DialogTitle>
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
                            Role :
                            <Select
                                value={newMember.Role}
                                style={{width: 120}}

                                onChange={handleInputChangeRole}
                                getPopupContainer={trigger => trigger.parentNode}
                            >
                                <Option value={'normal'}>Normal</Option>
                                <Option value={'moderator'}>Moderator</Option>
                                <Option value={'admin'}>Admin</Option>
                                <Option value={'analyst'}>Analyst</Option>
                            </Select>
                            <TextField
                                margin="dense"
                                name="DateOfBirth"
                                type="date"
                                value={newMember.DateOfBirth}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                name="Password"
                                label="Password"
                                type="password"
                                value={newMember.Password}
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
                            <Button onClick={handleCreateMember} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateMember} color="primary">
                        Create
                    </Button>

                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} className={classes.table}>
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
                                <TableRow key={member.MemberID} onClick={() => {
                                    if (member.MemberID !== undefined) {
                                        onSelectMember(member);
                                    }
                                }}>
                                    <TableCell>{member.MemberID}</TableCell>
                                    <TableCell>{member.FullName}</TableCell>
                                    <TableCell>{member.Email}</TableCell>
                                    <TableCell>{member.Role}</TableCell>
                                    <TableCell>{member.PhoneNumber}</TableCell>
                                    <TableCell>
                                        <Button className={classes.updateButton} onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdateDialogOpen(member);
                                        }}>Update Member</Button>
                                        <Button className={classes.deleteButton} onClick={(e) => {
                                            e.stopPropagation();
                                            if (member.MemberID !== undefined) {
                                                onDeleteMember(member.MemberID);
                                            }
                                        }}>Delete Member</Button>
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
