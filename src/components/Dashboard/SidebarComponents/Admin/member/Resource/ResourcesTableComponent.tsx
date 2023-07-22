import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination, IconButton
} from '@material-ui/core';
import { Resource} from '../../../../../../hooks/useMember';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

    const paginatedResources = sortedResources.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => handleSortRequest('ResourceName')}>Resource Name</TableCell>
                        <TableCell onClick={() => handleSortRequest('ResourceValue')}>Resource Value</TableCell>
                        <TableCell onClick={() => handleSortRequest('ResourceDescription')}>Resource Description</TableCell>
                        <TableCell onClick={() => handleSortRequest('DateAcquired')}>Date Acquired</TableCell>
                        <TableCell align="right">Actions</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedResources.map((resource) => (
                        <TableRow key={resource.ResourceID}>
                            <TableCell>{resource.ResourceName}</TableCell>
                            <TableCell>{resource.ResourceValue}</TableCell>
                            <TableCell>{resource.ResourceDescription}</TableCell>
                            <TableCell>
                                {resource.DateAcquired
                                    ? new Date(resource.DateAcquired).toLocaleDateString()
                                    : ''}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton color={"primary"} onClick={() => handleUpdateResources(resource.ResourceID?? 0, resource)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color={"secondary"} onClick={() => handleDeleteResources(resource.ResourceID?? 0)}>
                                    <DeleteIcon />
                                </IconButton>
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
