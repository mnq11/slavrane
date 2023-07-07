// FamiliesView.tsx
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


interface FamiliesViewProps {
    families: Family[];
    selectedFamily: Family | null;
    onSelectFamily: (family: Family | null) => void;
    onCreateFamily: (family: Family) => void;
    onUpdateFamily: (family: Family) => void;
    onDeleteFamily: (familyId: number) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FamiliesView: React.FC<FamiliesViewProps> = ({
                                                       families,
                                                       selectedFamily,
                                                       onSelectFamily,
                                                       onUpdateFamily,
                                                       onDeleteFamily,
                                                   }) => {
    const classes = FamiliesViewStyles();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [familyToUpdate, setFamilyToUpdate] = useState<Family | null>(null);
    const [newFamilyName, setNewFamilyName] = useState('');
    const [newFamilyAddress, setNewFamilyAddress] = useState('');
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

        setOpenConfirmDialog(false);
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
                />

            ) : (
                <Grid container spacing={3}>
                    {families
                        .filter((family) => family.FamilyName.includes(filter))
                        .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                        .map((family) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={family.FamilyID}>
                                <Button onClick={() => onSelectFamily(family)} style={{textTransform: 'none'}}>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography variant="h6">Family ID: {family.FamilyID}</Typography>
                                            <Typography variant="h5">{family.FamilyName}</Typography>
                                            <Typography variant="body2">{family.Address}</Typography>
                                            <Typography variant="body2">{family.ContactNumber}</Typography>
                                        </CardContent>
                                    </Card>
                                </Button>
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
                    {dialogLoading && <CircularProgress />}
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
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleCloseDialog} color="primary" disabled={dialogLoading}>
                        Cancel
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

export default FamiliesView;
