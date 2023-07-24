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
    TablePagination, IconButton, ThemeProvider,
} from '@material-ui/core';
import {Loan} from '../../../../../../hooks/useMember';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {createMuiTheme} from "@material-ui/core/styles";

interface LoansTableComponentProps {
    loans: Loan[];

    handleUpdateLoan: (loanId: number, loanData: Loan) => void;
    handleDeleteLoan: (loanId: number) => void;
}

interface HeadCell {
    id: keyof Loan;
    label: string;
}

const headCells: HeadCell[] = [
    {id: 'Amount', label: 'مبلغ القرض'},
    {id: 'StartDate', label: 'تاريخ البدء'},
    {id: 'DueDate', label: 'تاريخ الاستحقاق'},
    {id: 'Lender', label: 'المقرض'},
    {id: 'LoanPurpose', label: 'غرض القرض'},
    {id: 'RepaymentStatus', label: 'حالة السداد'},
];

const LoansTableComponent: React.FC<LoansTableComponentProps> = ({loans, handleUpdateLoan, handleDeleteLoan}) => {
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
     const formatNumber = (num: number) => {
        if (num > 999 && num <= 999999) {
            return (num / 1000).toFixed(1) + 'الف';
        } else if (num > 999999 && num <= 999999999) {
            return (num / 1000000).toFixed(1) + 'مليون';
        } else if (num > 999999999) {
            return (num / 1000000000).toFixed(1) + 'مليار';
        } else {
            return num.toString();
        }
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedLoans.length - page * rowsPerPage);
    const translateRepaymentStatus = (status: string) => {
        switch (status) {
            case 'Paid':
                return 'مدفوع';
            case 'Compromised':
                return 'معرض للخطر';
            case 'Pending':
                return 'قيد الانتظار';
            case 'Overdue':
                return 'متأخر';
            case 'Defaulted':
                return 'تسوية';
            default:
                return status;
        }
    };
    return (
        <ThemeProvider theme={createMuiTheme({
            direction: 'rtl',
        })}>
            <Paper>
                <TableContainer >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell key="Actions">
                                الإجراءات
                            </TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell key={headCell.id}>
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={() => handleSortRequest(headCell.id)}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedLoans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((loan) => (
                                <TableRow key={loan.LoanID}>
                                    <TableCell>
                                        <IconButton color="primary"
                                                    onClick={() => handleUpdateLoan(loan.LoanID ?? 0, loan)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton color="secondary"
                                                    onClick={() => handleDeleteLoan(loan.LoanID ?? 0)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{formatNumber(loan.Amount)}</TableCell>
                                    <TableCell>{loan.StartDate ? new Date(loan.StartDate).toISOString().split('T')[0] : ''}</TableCell>
                                    <TableCell>{loan.DueDate ? new Date(loan.DueDate).toISOString().split('T')[0] : ''}</TableCell>
                                    <TableCell>{loan.Lender}</TableCell>
                                    <TableCell>{loan.LoanPurpose}</TableCell>
                                    <TableCell>{translateRepaymentStatus(loan.RepaymentStatus)}</TableCell>

                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows}}>
                                    <TableCell colSpan={headCells.length}/>
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
        </ThemeProvider>
    );
};

export default LoansTableComponent;
