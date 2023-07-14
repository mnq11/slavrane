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
    TablePagination,
} from '@material-ui/core';
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSortRequest = (cellId: keyof Loan) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedLoans = [...loans].sort((a, b) => {
        const aVal: string | number = a[orderBy] || '';
        const bVal: string | number = b[orderBy] || '';

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return aVal.localeCompare(bVal) * (order === 'asc' ? 1 : -1);
        } else {
            return (aVal < bVal ? -1 : 1) * (order === 'asc' ? 1 : -1);
        }
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedLoans.length - page * rowsPerPage);

    return (
        <Paper>
            <TableContainer>
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
                        {sortedLoans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((loan) => (
                            <TableRow key={loan.LoanID}>
                                <TableCell>{loan.LoanID}</TableCell>
                                <TableCell>{loan.MemberID}</TableCell>
                                <TableCell>{loan.FamilyID}</TableCell>
                                <TableCell>{loan.Amount}</TableCell>
                                <TableCell>{loan.InterestRate}</TableCell>
                                <TableCell>{loan.StartDate}</TableCell>
                                <TableCell>{loan.DueDate}</TableCell>
                                <TableCell>{loan.Lender}</TableCell>
                                <TableCell>{loan.LoanPurpose}</TableCell>
                                <TableCell>{loan.RepaymentStatus}</TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={headCells.length} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedLoans.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default LoansTableComponent;
