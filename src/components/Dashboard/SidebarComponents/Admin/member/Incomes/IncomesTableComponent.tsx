// IncomesTableComponent.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Income } from "../../../../../../hooks/useMember";

interface IncomesTableProps {
    incomes: Income[];
}

const IncomesTableComponent: React.FC<IncomesTableProps> = ({ incomes }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Source</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Recurring</TableCell>
                        <TableCell align="right">Frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {incomes.map((income) => (
                        <TableRow key={income.IncomeID}>
                            <TableCell component="th" scope="row">
                                {income.Source}
                            </TableCell>
                            <TableCell align="right">{income.Amount}</TableCell>
                            <TableCell align="right">{income.Date}</TableCell>
                            <TableCell align="right">{income.Recurring ? "Yes" : "No"}</TableCell>
                            <TableCell align="right">{income.Frequency}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default IncomesTableComponent;
