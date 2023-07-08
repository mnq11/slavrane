// FamiliesCardsView.tsx
import React, {useState} from 'react';
import {Family} from "../../../../hooks/useMember";
import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    TextField,
    DialogContent,
    DialogActions,
    TablePagination,
    Snackbar,
    DialogContentText,
    CircularProgress,
    CardContent,
    Card,
    Grid
} from '@material-ui/core';
import {FamiliesViewStyles} from "./AdminPanel.Styles";
import 'react-toastify/dist/ReactToastify.css';
import FamilyDetails from "./FamilyDetails";


interface FamiliesCardViewProps {
    families: Family[];
    selectedFamily: Family | null;
    onSelectFamily: (family: Family | null) => void;
    onCreateFamily: (family: Family) => void;
    onUpdateFamily: (family: Family) => void;
    onDeleteFamily: (familyId: number| undefined) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FamiliesCardsView: React.FC<FamiliesCardViewProps> = ({
                                                                families,
                                                                selectedFamily,
                                                                onSelectFamily,
                                                                onCreateFamily,
                                                                onUpdateFamily,
                                                                onDeleteFamily,
                                                                setLoading,
                                                            }) => {
    const classes = FamiliesViewStyles();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [familyToUpdate, setFamilyToUpdate] = useState<Family | null>(null);
    const [newFamilyName, setNewFamilyName] = useState('');
    const [newFamilyAddress, setNewFamilyAddress] = useState('');
    const [newFamilyContactNumber, setNewFamilyContactNumber] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [filter, setFilter] = useState('');
    const [dialogLoading] = useState(false);
    const [dialogError, setDialogError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);


    const handleCloseDialog = () => {
        setDialogOpen(false);
        setFamilyToUpdate(null);
        setNewFamilyName('');
        setNewFamilyAddress('');
        setDialogError(null);
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const handleConfirmDelete = async () => {
        onDeleteFamily(familyToUpdate?.FamilyID);
        setOpenConfirmDialog(false);
        onSelectFamily(null);
    };

    const handleConfirmCreateOrUpdate = () => {
        if (familyToUpdate) {
            // Logic for updating a family
            const updatedFamily: Family = {
                ...familyToUpdate,
                FamilyName: newFamilyName,
                Address: newFamilyAddress,
                ContactNumber: newFamilyContactNumber,

                // Add other fields as necessary
            };
            onUpdateFamily(updatedFamily);
        } else {
            // Logic for creating a new family
            const newFamily: Family = {
                FamilyID: Math.floor(Math.random() * 100000000),
                FamilyName: newFamilyName,
                Address: newFamilyAddress,
                ContactNumber: newFamilyContactNumber,
                createdAt: new Date().toISOString(), // Replace with actual creation time if necessary
                updatedAt: new Date().toISOString(),
            };
            onCreateFamily(newFamily);
        }
        handleCloseDialog();
        onSelectFamily(null); // Go back to family list after update or create
    };
    const handleOpenUpdateDialog = (family: Family) => {
        setFamilyToUpdate(family);
        setNewFamilyName(family.FamilyName);
        setNewFamilyAddress(family.Address);
        setNewFamilyContactNumber(family.ContactNumber);
        setDialogOpen(true);
    };
    return (
        <div className={classes.root}>
            <TextField
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter families"
            />
            <Button className={classes.button} onClick={() => setDialogOpen(true)}>Create New Family</Button>
            {selectedFamily ? (
                <FamilyDetails
                    family={selectedFamily}
                    onUpdateFamily={onUpdateFamily}
                    onDeleteFamily={onDeleteFamily}
                    onBackToFamilyList={() => onSelectFamily(null)}
                    onOpenUpdateDialog={handleOpenUpdateDialog}
                />


            ) : (
                <Grid container spacing={3}>
                    {families
                        .filter((family) => family.FamilyName.includes(filter))
                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                        .map((family) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={family.FamilyID}>
                                <Card className={classes.card} onClick={() => onSelectFamily(family)}>
                                        <CardContent>
                                            <Typography variant="h5">{family.FamilyName}</Typography>
                                            <Typography variant="body2">{family.Address}</Typography>
                                        </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            )}

            {!selectedFamily && (
                <TablePagination
                    component="div"
                    count={families.length}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            )}

            <Dialog open={dialogOpen} onClose={handleCloseDialog} className={classes.dialog}>
                <DialogTitle
                    className={classes.dialogTitle}>{familyToUpdate ? 'Update Family' : 'Create New Family'}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {dialogLoading && <CircularProgress/>}
                    {dialogError && <Typography color="error">{dialogError}</Typography>}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Family Name"
                        value={newFamilyName}
                        onChange={(e) => setNewFamilyName(e.target.value)}
                        fullWidth
                        disabled={dialogLoading}
                    />

                    <TextField
                        margin="dense"
                        label="Address"
                        value={newFamilyAddress}
                        onChange={(e) => setNewFamilyAddress(e.target.value)}
                        fullWidth
                        disabled={dialogLoading}
                    />
                    <TextField
                        margin="dense"
                        label="Contact Number"
                        value={newFamilyContactNumber}
                        onChange={(e) => setNewFamilyContactNumber(e.target.value)}
                        fullWidth
                        disabled={dialogLoading}
                    />

                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleCloseDialog} color="primary" disabled={dialogLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmCreateOrUpdate} color="primary" disabled={dialogLoading}>
                        {familyToUpdate ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message="Action successful"
            />
        </div>
    );
};

export default FamiliesCardsView;
