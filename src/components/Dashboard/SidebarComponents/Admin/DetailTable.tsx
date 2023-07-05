// DetailTable.tsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination } from '@material-ui/core';

interface DetailTableProps {
    data: any[];

}

const DetailTable: React.FC<DetailTableProps> = ({ data }) => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (field: string) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortField(field);
        setSortDirection(isAsc ? 'desc' : 'asc');
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortField) return 0;

        let aValue = a[sortField];
        let bValue = b[sortField];

        // Check if the values are dates
        if (Date.parse(aValue) && Date.parse(bValue)) {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const allKeys = Array.from(new Set(data.flatMap(obj => Object.keys(obj))));

    const renderObject = (obj: any, index: number) => {
        return (
            <TableRow key={index}>
                {allKeys.map(key => (
                    typeof obj[key] !== 'object' ? (
                        <TableCell key={`${key}-${index}`}>
                            {obj[key] !== undefined && obj[key] !== null ? String(obj[key]) : ''}
                        </TableCell>
                    ) : null
                ))}
            </TableRow>
        );
    };




    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {allKeys.map((key, index) => (
                            <TableCell key={`${key}-${index}`}>
                                <TableSortLabel
                                    active={sortField === key}
                                    direction={sortField === key ? sortDirection : 'asc'}
                                    onClick={() => handleSort(key)}
                                >
                                    {key}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => renderObject(item, index))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default DetailTable;