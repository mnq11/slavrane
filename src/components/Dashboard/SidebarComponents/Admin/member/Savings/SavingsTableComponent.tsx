import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@material-ui/core';
import { Savings} from '../../../../../../hooks/useMember';

interface SavingsTableComponentProps {
    savings: Savings[];
}

interface HeadCell {
    id: keyof Savings;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'SavingsID', label: 'Savings ID' },
    { id: 'FamilyID', label: 'Family ID' },
    { id: 'Amount', label: 'Amount' },
    { id: 'Date', label: 'Date' },
    { id: 'SavingsGoal', label: 'Savings Goal' },
    { id: 'TargetDate', label: 'Target Date' },
];

const SavingsTableComponent: React.FC<SavingsTableComponentProps> = ({ savings }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Savings>('SavingsID');

    const handleSortRequest = (cellId: keyof Savings) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    const sortedSavings = [...savings].sort((a, b) => {
        let aVal: string | number | Date = a[orderBy] || '';
        let bVal: string | number | Date = b[orderBy] || '';

        if(orderBy === 'Date' || orderBy === 'TargetDate') {
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
                    {sortedSavings.map((saving) => (
                        <TableRow key={saving.SavingsID}>
                            {/* savings cells here */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SavingsTableComponent;
