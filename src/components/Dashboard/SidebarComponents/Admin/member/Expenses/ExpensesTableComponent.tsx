import React, {useState} from 'react';
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
import {Expense} from "../../../../../../hooks/useMember";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface TableComponentProps {
    expenses: Expense[];
    onUpdate: (expense: Expense) => void;
    onDelete: (expenseId: number) => void;
}
const ExpensesTableComponent: React.FC<TableComponentProps> = ({expenses, onUpdate, onDelete}) => {
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

        if (orderBy === 'Date') {
            aVal = typeof aVal === "string" ? new Date(aVal).getTime() : 0;
            bVal = typeof bVal === "string" ? new Date(bVal).getTime() : 0;
        } else if (orderBy === 'Amount') {
            if (typeof aVal === "string") {
                aVal = parseFloat(aVal);
            }
            if (typeof bVal === "string") {
                bVal = parseFloat(bVal);
            }
        } else if (orderBy === 'Recurring') {
            aVal = aVal === true ? 1 : 0;
            bVal = bVal === true ? 1 : 0;
        }

        aVal = aVal ?? 0;
        bVal = bVal ?? 0;

        if (aVal < bVal) {
            return order === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
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
                        <TableCell> <TableSortLabel
                            active={orderBy === 'Category'}
                            direction={orderBy === 'Category' ? order : 'asc'}
                            onClick={() => handleSortRequest('Category')}
                        >
                            Category
                        </TableSortLabel></TableCell>
                        <TableCell> <TableSortLabel
                            active={orderBy === 'Amount'}
                            direction={orderBy === 'Amount' ? order : 'asc'}
                            onClick={() => handleSortRequest('Amount')}
                        >
                            Amount
                        </TableSortLabel></TableCell>
                        <TableCell> <TableSortLabel
                            active={orderBy === 'Date'}
                            direction={orderBy === 'Date' ? order : 'asc'}
                            onClick={() => handleSortRequest('Date')}
                        >
                            Date
                        </TableSortLabel></TableCell>
                        <TableCell> <TableSortLabel
                            active={orderBy === 'Recurring'}
                            direction={orderBy === 'Recurring' ? order : 'asc'}
                            onClick={() => handleSortRequest('Recurring')}
                        >
                            Recurring
                        </TableSortLabel></TableCell>
                        <TableCell> <TableSortLabel
                            active={orderBy === 'Frequency'}
                            direction={orderBy === 'Frequency' ? order : 'asc'}
                            onClick={() => handleSortRequest('Frequency')}

                        >
                            Frequency
                        </TableSortLabel></TableCell>


                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedExpenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense) => (
                        <TableRow key={expense.ExpenseID}>
                            <TableCell>{expense.Category}</TableCell>
                            <TableCell>{expense.Amount}</TableCell>
                            <TableCell>{expense.Date ? new Date(expense.Date).toISOString().split('T')[0] : ''}</TableCell>
                            <TableCell>{expense.Recurring ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{expense.Frequency}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => onUpdate(expense)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="secondary" onClick={() => onDelete(expense.ExpenseID)}>
                                    <DeleteIcon/>
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
