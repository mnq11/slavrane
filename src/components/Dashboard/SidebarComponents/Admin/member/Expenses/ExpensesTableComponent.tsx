import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@material-ui/core';
import { Expense } from "../../../../../../hooks/useMember";

interface TableComponentProps {
    expenses: Expense[];
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

const ExpensesTableComponent: React.FC<TableComponentProps> = ({ expenses }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Expense>('Date');

    const handleSortRequest = (cellId: keyof Expense) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    // This function starts sorting
    const sortedExpenses = [...expenses].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

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
                    {sortedExpenses.map((expense) => (
                        <TableRow key={expense.ExpenseID}>
                            <TableCell>{expense.ExpenseID}</TableCell>
                            <TableCell>{expense.FamilyID}</TableCell>
                            <TableCell>{expense.MemberID}</TableCell>
                            <TableCell>{expense.Category}</TableCell>
                            <TableCell>{expense.Amount}</TableCell>
                            <TableCell>{expense.Date}</TableCell>
                            <TableCell>{expense.Recurring}</TableCell>
                            <TableCell>{expense.Frequency}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ExpensesTableComponent;
