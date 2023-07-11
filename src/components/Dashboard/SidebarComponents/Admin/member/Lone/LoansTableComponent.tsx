import React, {useState} from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@material-ui/core';
import { Loan } from '../../../../../../hooks/useMember';

interface LoansTableComponentProps {
    loans: Loan[];
}

const headCells: { id: keyof Loan; label: string }[] = [
    { id: 'LoanID', label: 'Loan ID' },
    { id: 'Amount', label: 'Amount' },
    { id: 'StartDate', label: 'Start Date' },
    { id: 'DUEDate', label: 'Due Date' },
    { id: 'Interest', label: 'Interest Rate' },
    { id: 'RepaymentStatus', label: 'Repayment Status' },
];

const LoansTableComponent: React.FC<LoansTableComponentProps> = ({ loans }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Loan>('LoanID');

    const handleSortRequest = (cellId: keyof Loan) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    const sortedLoans = [...loans].sort((a, b) => {
        let aVal = a[orderBy] || '';
        let bVal = b[orderBy] || '';

        if(orderBy === 'StartDate' || orderBy === 'DUEDate') {
            aVal = new Date(aVal as string).getTime();
            bVal = new Date(bVal as string).getTime();
        } else if(typeof aVal === 'number' && typeof bVal === 'number') {
            aVal = parseFloat(aVal.toString());
            bVal = parseFloat(bVal.toString());
        }

        if(aVal < bVal) {
            return order === 'asc' ? -1 : 1;
        }
        if(aVal > bVal) {
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
                    {sortedLoans.map((loan) => (
                        <TableRow key={loan.LoanID}>
                            <TableCell>{loan.LoanID}</TableCell>
                            <TableCell>{loan.Amount}</TableCell>
                            <TableCell>{loan.StartDate ? new Date(loan.StartDate).toLocaleDateString() : ''}</TableCell>
                            <TableCell>{loan.DUEDate ? new Date(loan.DUEDate).toLocaleDateString() : ''}</TableCell>
                            <TableCell>{loan.Interest}</TableCell>
                            <TableCell>{loan.RepaymentStatus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoansTableComponent;
