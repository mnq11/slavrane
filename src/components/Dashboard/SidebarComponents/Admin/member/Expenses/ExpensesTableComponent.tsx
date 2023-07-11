// ExpensesTableComponent.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Expense } from "../../../../../../hooks/useMember";

interface TableComponentProps {
    expenses: Expense[];
}

const ExpensesTableComponent: React.FC<TableComponentProps> = ({ expenses }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>

                        <TableCell>Expense ID</TableCell>
                        <TableCell>Family ID</TableCell>
                        <TableCell>Member ID</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Recurring</TableCell>
                        <TableCell>Frequency</TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((expense) => (
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
