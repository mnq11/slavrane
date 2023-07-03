// MembersView.tsx
import React from 'react';
import { Family, Member } from "../../../../hooks/useMember";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

interface MembersViewProps {
    family: Family;
    onSelectMember: (member: Member) => void;
    members: Member[];
    selectedMemberId: number | null;
}

const MembersView: React.FC<MembersViewProps> = ({ family, onSelectMember, members, selectedMemberId }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
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
                            </TableRow>
                        )
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MembersView;
