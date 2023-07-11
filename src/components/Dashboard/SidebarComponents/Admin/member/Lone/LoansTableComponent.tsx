import React, {useState} from "react";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@material-ui/core';
import { Loan } from '../../../../../../hooks/useMember';

interface LoansTableComponentProps {
    loans: Loan[];
}

interface HeadCell {
    id: keyof Loan;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'LoanID', label: 'Loan ID' },
    { id: 'MemberID', label: 'Member ID' },
    { id: 'FamilyID', label: 'Family ID' },
    { id: 'Amount', label: 'Loan Amount' },
    { id: 'InterestRate', label: 'Interest Rate' },
    { id: 'StartDate', label: 'Start Date' },
    { id: 'DueDate', label: 'Due Date' },
    { id: 'Lender', label: 'Lender' },
    { id: 'LoanPurpose', label: 'Loan Purpose' },
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
        let aVal: string | number = a[orderBy] || '';
        let bVal: string | number = b[orderBy] || '';

        if(orderBy === 'StartDate' || orderBy === 'DueDate') {
            aVal = new Date(aVal as string).getTime();
            bVal = new Date(bVal as string).getTime();
        } else if(typeof aVal === 'number' && typeof bVal === 'number') {
            aVal = parseFloat(aVal.toString());
            bVal = parseFloat(bVal.toString());
        } else {
            aVal = aVal.toString();
            bVal = bVal.toString();
        }

        if(typeof aVal === 'string' && typeof bVal === 'string') {
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
                            <TableCell>{loan.MemberID}</TableCell>
                            <TableCell>{loan.FamilyID}</TableCell>
                            <TableCell>{loan.Amount}</TableCell>
                            <TableCell>{loan.InterestRate}</TableCell>
                            <TableCell>{loan.StartDate ? new Date(loan.StartDate).toLocaleDateString() : ''}</TableCell>
                            <TableCell>{loan.DueDate ? new Date(loan.DueDate).toLocaleDateString() : ''}</TableCell>
                            <TableCell>{loan.Lender}</TableCell>
                            <TableCell>{loan.LoanPurpose}</TableCell>
                            <TableCell>{loan.RepaymentStatus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoansTableComponent;