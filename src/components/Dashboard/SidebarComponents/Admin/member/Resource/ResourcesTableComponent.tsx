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
    TablePagination
} from '@material-ui/core';
import { Resource } from '../../../../../../hooks/useMember';

interface ResourcesTableComponentProps {
    resources: Resource[];
}

interface HeadCell {
    id: keyof Resource;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'ResourceID', label: 'Resource ID' },
    { id: 'MemberID', label: 'Member ID' },
    { id: 'FamilyID', label: 'Family ID' },
    { id: 'ResourceName', label: 'Resource Name' },
    { id: 'ResourceValue', label: 'Resource Value' },
    { id: 'ResourceDescription', label: 'Resource Description' },
    { id: 'DateAcquired', label: 'Date Acquired' }
];

const ResourcesTableComponent: React.FC<ResourcesTableComponentProps> = ({ resources }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Resource>('ResourceID');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSortRequest = (cellId: keyof Resource) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    const sortedResources = [...resources].sort((a, b) => {
        let aVal: string | number = a[orderBy] || '';
        let bVal: string | number = b[orderBy] || '';

        if (orderBy === 'DateAcquired') {
            aVal = new Date(aVal as string).getTime();
            bVal = new Date(bVal as string).getTime();
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
            aVal = parseFloat(aVal.toString());
            bVal = parseFloat(bVal.toString());
        } else {
            aVal = aVal.toString();
            bVal = bVal.toString();
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return aVal.localeCompare(bVal) * (order === 'asc' ? 1 : -1);
        } else {
            return (aVal < bVal ? -1 : 1) * (order === 'asc' ? 1 : -1);
        }
    });

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedResources = sortedResources.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

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
                    {paginatedResources.map((resource) => (
                        <TableRow key={resource.ResourceID}>
                            <TableCell>{resource.ResourceID}</TableCell>
                            <TableCell>{resource.MemberID}</TableCell>
                            <TableCell>{resource.FamilyID}</TableCell>
                            <TableCell>{resource.ResourceName}</TableCell>
                            <TableCell>{resource.ResourceValue}</TableCell>
                            <TableCell>{resource.ResourceDescription}</TableCell>
                            <TableCell>
                                {resource.DateAcquired
                                    ? new Date(resource.DateAcquired).toLocaleDateString()
                                    : ''}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedResources.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default ResourcesTableComponent;
