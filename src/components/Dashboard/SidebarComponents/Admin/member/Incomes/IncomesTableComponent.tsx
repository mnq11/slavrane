import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableSortLabel,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Income } from '../../../../../../hooks/useMember';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface IncomesTableProps {
    incomes: Income[];
    handleDeleteIncome: (incomeId: number) => void;
    handleUpdateIncome: (incomeData: Income) => void;
}

type SortDirection = 'asc' | 'desc';

const useStyles = makeStyles({
    root: {
        direction: 'rtl',
    },
});

const IncomesTableComponent: React.FC<IncomesTableProps> = ({ incomes, handleDeleteIncome, handleUpdateIncome }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortColumn, setSortColumn] = useState<keyof Income>('Source');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = (column: keyof Income) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortBy = (a: Income, b: Income) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
            return sortDirection === 'asc' ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
        } else {
            return 0;
        }
    };


    const sortedIncomes = [...incomes].sort(sortBy);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedIncomes.length - page * rowsPerPage);

    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>  <TableSortLabel active={sortColumn === 'Source'} direction={sortDirection} onClick={() => handleSort('Source')}>المصدر</TableSortLabel></TableCell>
                        <TableCell align="right"><TableSortLabel active={sortColumn === 'Amount'} direction={sortDirection} onClick={() => handleSort('Amount')}>المبلغ</TableSortLabel></TableCell>
                        <TableCell align="right"><TableSortLabel active={sortColumn === 'Date'} direction={sortDirection} onClick={() => handleSort('Date')}>التاريخ</TableSortLabel></TableCell>
                        <TableCell align="right"><TableSortLabel active={sortColumn === 'Recurring'} direction={sortDirection} onClick={() => handleSort('Recurring')}>متكرر</TableSortLabel></TableCell>
                        <TableCell align="right"><TableSortLabel active={sortColumn === 'Frequency'} direction={sortDirection} onClick={() => handleSort('Frequency')}>التكرار</TableSortLabel></TableCell>
                        <TableCell align="right">الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedIncomes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((income) => (
                        <TableRow key={income.IncomeID}>
                            <TableCell component="th" scope="row">{income.Source}</TableCell>
                            <TableCell align="right">{income.Amount}</TableCell>
                            <TableCell align="right">{income.Date? new Date(income.Date).toISOString().split('T')[0] : ''}</TableCell>
                            <TableCell align="right">{income.Recurring ? 'نعم' : 'لا'}</TableCell>
                            <TableCell align="right">{income.Frequency}</TableCell>

                            <TableCell align="right">
                                <IconButton color="primary" onClick={() => handleUpdateIncome(income)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color={"secondary"} onClick={() => handleDeleteIncome(income.IncomeID ?? 0)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedIncomes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default IncomesTableComponent;