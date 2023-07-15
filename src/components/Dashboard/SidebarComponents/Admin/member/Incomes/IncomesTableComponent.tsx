// IncomesTableComponent.tsx
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
    TableSortLabel, IconButton,
} from '@material-ui/core';
import { Income } from '../../../../../../hooks/useMember';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface IncomesTableProps {
    incomes: Income[];
    handleDeleteIncome: (incomeId: number) => void;
    handleUpdateIncome: (incomeId: number, incomeData: Income) => void;
}
type SortDirection = 'asc' | 'desc';

interface HeadCell {
    id: keyof Income;
    label: string;
    sortable: boolean;
}

const headCells: HeadCell[] = [
    { id: 'Source', label: 'Source', sortable: true },
    { id: 'Amount', label: 'Amount', sortable: true },
    { id: 'Date', label: 'Date', sortable: true },
    { id: 'Recurring', label: 'Recurring', sortable: true },
    { id: 'Frequency', label: 'Frequency', sortable: true },
];

const IncomesTableComponent: React.FC<IncomesTableProps> = ({ incomes, handleDeleteIncome, handleUpdateIncome }) => {
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

    const sortedIncomes = [...incomes].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (sortDirection === 'asc') {
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
        } else {
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
        }

        return 0;
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedIncomes.length - page * rowsPerPage);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell key={headCell.id} sortDirection={sortColumn === headCell.id ? sortDirection : false}>
                                    {headCell.sortable ? (
                                        <TableSortLabel
                                            active={sortColumn === headCell.id}
                                            direction={sortColumn === headCell.id ? sortDirection : 'asc'}
                                            onClick={() => handleSort(headCell.id)}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    ) : (
                                        headCell.label
                                    )}
                                </TableCell>
                            ))}
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedIncomes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((income) => (
                            <TableRow key={income.IncomeID}>
                                <TableCell component="th" scope="row">
                                    {income.Source}
                                </TableCell>
                                <TableCell align="right">{income.Amount}</TableCell>
                                <TableCell align="right">{income.Date? new Date(income.Date).toISOString().split('T')[0] : ''}</TableCell>
                                <TableCell align="right">{income.Recurring ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">{income.Frequency}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleUpdateIncome(income.IncomeID, income)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteIncome(income.IncomeID)}>
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
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedIncomes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default IncomesTableComponent;
