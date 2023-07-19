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
    TablePagination, IconButton,
} from '@material-ui/core';
import {Loan} from '../../../../../../hooks/useMember';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface LoansTableComponentProps {
    loans: Loan[];

    handleUpdateLoan:(loanId: number, loanData: Loan) => void;
    handleDeleteLoan: (loanId: number) => void;
}

interface HeadCell {
    id: keyof Loan;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'Amount', label: 'Loan Amount' },
    { id: 'InterestRate', label: 'Interest Rate' },
    { id: 'StartDate', label: 'Start Date' },
    { id: 'DueDate', label: 'Due Date' },
    { id: 'Lender', label: 'Lender' },
    { id: 'LoanPurpose', label: 'Loan Purpose' },
    { id: 'RepaymentStatus', label: 'Repayment Status' },
];

const LoansTableComponent: React.FC<LoansTableComponentProps> = ({ loans, handleUpdateLoan, handleDeleteLoan }) => {
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

                            <TableCell key="Amount" sortDirection={orderBy === 'Amount' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'Amount'}
                                    direction={orderBy === 'Amount' ? order : 'asc'}
                                    onClick={() => handleSortRequest('Amount')}
                                >
                                    Loan Amount
                                </TableSortLabel>
                            </TableCell>
                            <TableCell key="InterestRate" sortDirection={orderBy === 'InterestRate' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'InterestRate'}
                                    direction={orderBy === 'InterestRate' ? order : 'asc'}
                                    onClick={() => handleSortRequest('InterestRate')}
                                >
                                    Interest Rate
                                </TableSortLabel>
                            </TableCell>
                            <TableCell key="StartDate" sortDirection={orderBy === 'StartDate' ? order : false}>
                                <TableSortLabel

                                    active={orderBy === 'StartDate'}
                                    direction={orderBy === 'StartDate' ? order : 'asc'}
                                    onClick={() => handleSortRequest('StartDate')}
                                >
                                    Start Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell key="DueDate" sortDirection={orderBy === 'DueDate' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'DueDate'}
                                    direction={orderBy === 'DueDate' ? order : 'asc'}
                                    onClick={() => handleSortRequest('DueDate')}
                                >
                                    Due Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell key="Lender" sortDirection={orderBy === 'Lender' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'Lender'}
                                    direction={orderBy === 'Lender' ? order : 'asc'}
                                    onClick={() => handleSortRequest('Lender')}
                                >
                                    Lender
                                </TableSortLabel>
                            </TableCell>
                            <TableCell key="LoanPurpose" sortDirection={orderBy === 'LoanPurpose' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'LoanPurpose'}
                                    direction={orderBy === 'LoanPurpose' ? order : 'asc'}
                                    onClick={() => handleSortRequest('LoanPurpose')}
                                >
                                    Loan Purpose
                                </TableSortLabel>

                            </TableCell>
                            <TableCell key="RepaymentStatus" sortDirection={orderBy === 'RepaymentStatus' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'RepaymentStatus'}
                                    direction={orderBy === 'RepaymentStatus' ? order : 'asc'}
                                    onClick={() => handleSortRequest('RepaymentStatus')}
                                >
                                    Repayment Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell key="Actions">
                                Actions
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedLoans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((loan) => (
                            <TableRow key={loan.LoanID}>
                                <TableCell>{loan.Amount}</TableCell>
                                <TableCell>{loan.InterestRate}</TableCell>
                                <TableCell>{loan.StartDate? new Date(loan.StartDate).toISOString().split('T')[0] : ''}</TableCell>
                                <TableCell>{loan.DueDate? new Date(loan.DueDate).toISOString().split('T')[0] : ''}</TableCell>
                                <TableCell>{loan.Lender}</TableCell>
                                <TableCell>{loan.LoanPurpose}</TableCell>
                                <TableCell>{loan.RepaymentStatus}</TableCell>
                                <TableCell>
                                    <IconButton color="primary"  onClick={() => handleUpdateLoan(loan.LoanID?? 0, loan)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDeleteLoan(loan.LoanID?? 0)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
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
