import React, {useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TableFooter,
    TablePagination, IconButton
} from '@material-ui/core';
import {Savings} from '../../../../../../hooks/useMember';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface SavingsTableComponentProps {
    savings: Savings[];
    handleDeleteSavings: (savingsId: number) => void;
    handleUpdateSavings: (savingsId: number, savingsData: Savings) => void;
}
const SavingsTableComponent: React.FC<SavingsTableComponentProps> = ({
                                                                         savings,
                                                                         handleDeleteSavings,
                                                                         handleUpdateSavings
                                                                     }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Savings>('SavingsID');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleSortRequest = (cellId: keyof Savings) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    const sortedSavings = [...savings].sort((a, b) => {
        let aVal: string | number | Date = a[orderBy] || '';
        let bVal: string | number | Date = b[orderBy] || '';

        if (orderBy === 'Date' || orderBy === 'TargetDate') {
            aVal = new Date(aVal as string).getTime();
            bVal = new Date(bVal as string).getTime();
        } else if (orderBy === 'Amount') {
            aVal = parseFloat(aVal.toString());
            bVal = parseFloat(bVal.toString());
        } else {
            aVal = aVal.toString();
            bVal = bVal.toString();
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return aVal.localeCompare(bVal) * (order === 'asc' ? 1 : -1);
        } else {
            return (aVal < bVal ? -1 : 1) * (order === 'asc' ? 1 : -1);
        }
    });


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> <TableSortLabel
                            active={orderBy === 'Amount'} direction={orderBy === 'Amount' ? order : 'asc'}
                            onClick={() => handleSortRequest('Amount')}
                        >
                            Amount
                        </TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                            active={orderBy === 'Date'} direction={orderBy === 'Date' ? order : 'asc'}
                            onClick={() => handleSortRequest('Date')}
                        >
                            Date
                        </TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                            active={orderBy === 'SavingsGoal'} direction={orderBy === 'SavingsGoal' ? order : 'asc'}
                            onClick={() => handleSortRequest('SavingsGoal')}
                        >
                            Savings Goal
                        </TableSortLabel></TableCell>
                        <TableCell><TableSortLabel
                            active={orderBy === 'TargetDate'} direction={orderBy === 'TargetDate' ? order : 'asc'}
                            onClick={() => handleSortRequest('TargetDate')}
                        >
                            Target Date
                        </TableSortLabel></TableCell>
                        <TableCell align="right">Actions</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedSavings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((saving) => (
                        <TableRow key={saving.SavingsID}>
                            <TableCell>{saving.Amount}</TableCell>
                            <TableCell>{saving.Date ? new Date(saving.Date).toISOString().split('T')[0] : ''}</TableCell>
                            <TableCell>{saving.SavingsGoal}</TableCell>
                            <TableCell>{new Date(saving.TargetDate).toISOString().slice(0, 10)}</TableCell>
                            <TableCell align="right">
                                <IconButton color="primary"
                                            onClick={() => handleUpdateSavings(saving.SavingsID ?? 0, saving)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="secondary"
                                            onClick={() => handleDeleteSavings(saving.SavingsID ?? 0)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell></TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={savings.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => {
                                setPage(newPage);
                            }}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default SavingsTableComponent;
