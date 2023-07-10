// FamiliesCardsView.tsx

import React, {useEffect, useState} from 'react';
import {Family} from "../../../../../hooks/useMember";
import {
    Typography,
    Button,
    TablePagination,
    Snackbar,
    CardContent,
    Card,
    Grid, TextField
} from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import {FamilyForm} from "./FamilyForm";
import {fetchAllFamilies, createNewFamily} from '../Provider/adminPanelFunctions';
import {FamiliesViewStyles} from "./AdminFamily.Styles";

interface FamiliesCardViewProps {
    onSelectFamily: (family: Family | null) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FamiliesCardsView: React.FC<FamiliesCardViewProps> = ({
                                                                onSelectFamily,
                                                                setLoading,
                                                            }) => {
    const classes = FamiliesViewStyles ();
    const [families, setFamilies] = useState<Family[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);


    const fetchFamilies = async () => {
        try {
            setLoading(true);
            const data = await fetchAllFamilies();
            setFamilies(data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFamily = async (family: Family) => {
        const newFamily = await createNewFamily(family);
        if (newFamily) {
            await fetchFamilies();
        }
    };

    useEffect(() => {
        fetchFamilies(); // Fetch families on component mount
    }, []);

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
                label="Filter families"
            />
            <Button className={classes.button} onClick={() => setDialogOpen(true)}>Create New Family</Button>
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
            <div className={classes.pagination}>
                <TablePagination
                    component="div"
                    count={families.length}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>
            {dialogOpen && (
                <FamilyForm
                    title="Create New Family"
                    family={undefined}
                    onSubmit={handleCreateFamily}
                    onCancel={() => setDialogOpen(false)}
                />

            )}
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
