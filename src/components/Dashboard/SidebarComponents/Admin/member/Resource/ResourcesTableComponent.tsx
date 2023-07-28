import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination, IconButton, ThemeProvider
} from '@material-ui/core';
import { Resource} from '../../../../../../hooks/useMember';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {theme} from "antd";

interface ResourcesTableComponentProps {
    resources: Resource[];
    handleDeleteResources: (resourceId: number) => void;
    handleUpdateResources: (resourceId: number, resourceData: Resource) => void;
}


const ResourcesTableComponent: React.FC<ResourcesTableComponentProps> = ({ resources,handleDeleteResources,handleUpdateResources }) => {
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

    const paginatedResources = sortedResources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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

    return (
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">الإجراءات</TableCell>
                            <TableCell onClick={() => handleSortRequest('ResourceName')}>اسم المورد</TableCell>
                            <TableCell onClick={() => handleSortRequest('ResourceValue')}>قيمة المورد</TableCell>
                            <TableCell onClick={() => handleSortRequest('ResourceDescription')}>وصف المورد</TableCell>
                            <TableCell onClick={() => handleSortRequest('DateAcquired')}>تاريخ الحصول</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedResources.map((resource) => (
                            <TableRow key={resource.ResourceID}>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleUpdateResources(resource.ResourceID ?? 0, resource)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDeleteResources(resource.ResourceID ?? 0)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{resource.ResourceName}</TableCell>
                                <TableCell>{formatNumber(resource.ResourceValue)}</TableCell>
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
        </ThemeProvider>
    );
};

export default ResourcesTableComponent;
