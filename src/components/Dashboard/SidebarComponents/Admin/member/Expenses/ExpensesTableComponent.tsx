import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TablePagination, IconButton
} from '@material-ui/core';
import { Expense } from "../../../../../../hooks/useMember";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface TableComponentProps {
    expenses: Expense[];
    onUpdate: (expense: Expense) => void;
    onDelete: (expenseId: number) => void;
}

interface HeadCell {
    id: keyof Expense;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'ExpenseID', label: 'Expense ID' },
    { id: 'FamilyID', label: 'Family ID' },
    { id: 'MemberID', label: 'Member ID' },
    { id: 'Category', label: 'Category' },
    { id: 'Amount', label: 'Amount' },
    { id: 'Date', label: 'Date' },
    { id: 'Recurring', label: 'Recurring' },
    { id: 'Frequency', label: 'Frequency' },
];

const ExpensesTableComponent: React.FC<TableComponentProps> = ({ expenses, onUpdate, onDelete }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState<keyof Expense>('ExpenseID');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleSortRequest = (cellId: keyof Expense) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    // This function starts sorting
    const sortedExpenses = [...expenses].sort((a, b) => {
        let aVal = a[orderBy];
        let bVal = b[orderBy];

        if(orderBy === 'Date') {
            aVal = new Date(aVal).getTime();
            bVal = new Date(bVal).getTime();
        } else if(orderBy === 'Amount') {
            if (typeof aVal === "string") {
                aVal = parseFloat(aVal);
            }
            if (typeof bVal === "string") {
                bVal = parseFloat(bVal);
            }
        }

        if(aVal < bVal) {
            return order === 'asc' ? -1 : 1;
        }
        if(aVal > bVal) {
            return order === 'asc' ? 1 : -1;
        }

        return 0;
    });


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headCells.map((cell) => (
                            <TableCell key={cell.id}>
                                <TableSortLabel
                                    active={orderBy === cell.id}
                                    direction={orderBy === cell.id ? order : 'asc'}
                                    onClick={() => handleSortRequest(cell.id)}
                                >
                                    {cell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedExpenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense) => (
                        <TableRow key={expense.ExpenseID}>
                            <TableCell>{expense.ExpenseID}</TableCell>
                            <TableCell>{expense.FamilyID}</TableCell>
                            <TableCell>{expense.MemberID}</TableCell>
                            <TableCell>{expense.Category}</TableCell>
                            <TableCell>{expense.Amount}</TableCell>
                            <TableCell>{expense.Date ? new Date(expense.Date).toISOString().split('T')[0] : ''}</TableCell>
                            <TableCell>{expense.Recurring}</TableCell>
                            <TableCell>{expense.Frequency}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => onUpdate(expense)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => onDelete(expense.ExpenseID)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={expenses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default ExpensesTableComponent;
