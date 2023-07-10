// MembersCardsView.tsx

import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, Typography, TextField, TablePagination } from '@material-ui/core';
import { Member } from "../../../../../hooks/useMember";
import {createNewMember} from "../Provider/adminPanelFunctions";
import {MembersCardsViewStyles} from "./AdminMember.Styles";
import MemberForm from "./ MemberForm";

interface MembersCardsViewProps {
    members: Member[] | undefined;
    onSelectMember: (member: Member) => void;
    selectedFamily: number | undefined;
}

const MembersCardsView: React.FC<MembersCardsViewProps> = ({ members, onSelectMember, selectedFamily }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const classes = MembersCardsViewStyles();

    const handleCreateMember = async (newMember: Member) => {
        const createdMember = await createNewMember(newMember);
        if (createdMember) {
            setDialogOpen(false);
            // Update the members list with the new member...
            members?.push(createdMember);
        } else {
            console.error("Failed to create member.");
        }
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            <TextField
                className={classes.textField}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter members"
            />
            <Button className={classes.button} onClick={() => setDialogOpen(true)}>Create New Member</Button>
            <Grid container spacing={3}>
                {members
                    ?.filter((member) => member.MemberName.includes(filter))
                    .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                    .map((member) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={member.MemberID}>
                            <Card className={classes.card} onClick={() => onSelectMember(member)}>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h5">{member.MemberName}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            <div className={classes.pagination}>
                <TablePagination
                    component="div"
                    count={members?.length || 0}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>
            {dialogOpen && (
                <MemberForm
                    title="Create New Member"
                    onSubmit={handleCreateMember}
                    onCancel={() => setDialogOpen(false)}
                    familyId={selectedFamily}
                />
            )}
        </div>
    );
};

export default MembersCardsView;
