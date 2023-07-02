// FamilyTable.tsx
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import { useStyles } from './AdminPanel.Styles';

interface FamilyTableProps {
    families: any[];
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPage: number) => void;
    fetchFamilyMembers: (familyId: number) => void;
}

const FamilyTable: React.FC<FamilyTableProps> = ({ families, page, setPage, rowsPerPage, setRowsPerPage, fetchFamilyMembers }) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {families.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((family) => (
                        <TableRow key={family.FamilyID}>
                            <TableCell>{family.FamilyID}</TableCell>
                            <TableCell>{family.FamilyName}</TableCell>
                            <TableCell>{family.Address}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => fetchFamilyMembers(family.FamilyID)}>
                                    Fetch Members
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[1,5, 10, 25]}
                component="div"
                count={families.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
        </TableContainer>
    );
};

export default FamilyTable;
