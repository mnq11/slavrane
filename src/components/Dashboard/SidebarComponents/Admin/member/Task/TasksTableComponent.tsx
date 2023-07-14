import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@material-ui/core';
import { Tasks } from "../../../../../../hooks/useMember";

interface TableComponentProps {
    tasks: Tasks[];
}

interface HeadCell {
    id: keyof Tasks;
    label: string;
}

const headCells: HeadCell[] = [
    { id: 'TaskID', label: 'Task ID' },
    { id: 'TaskName', label: 'Task Name' },
    { id: 'TaskStatus', label: 'Status' },
    { id: 'DueDate', label: 'Due Date' },
    { id: 'Priority', label: 'Priority' },
    { id: 'Description', label: 'Description' },
];

const TasksTableComponent: React.FC<TableComponentProps> = ({ tasks }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Tasks>('DueDate');

    const handleSortRequest = (cellId: keyof Tasks) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        let aVal = a[orderBy];
        let bVal = b[orderBy];

        if(orderBy === 'DueDate') {
            aVal = aVal ? new Date(aVal as string).getTime() : 0;
            bVal = bVal ? new Date(bVal as string).getTime() : 0;
        } else if (typeof aVal === 'number' && typeof bVal === 'number' || orderBy === 'Priority') {
            aVal = aVal ? parseFloat(aVal.toString()) : 0;
            bVal = bVal ? parseFloat(bVal.toString()) : 0;
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
                    {sortedTasks.map((task) => (
                        <TableRow key={task.TaskID}>
                            <TableCell>{task.TaskID}</TableCell>
                            <TableCell>{task.TaskName}</TableCell>
                            <TableCell>{task.TaskStatus}</TableCell>
                            <TableCell>{task.DueDate ? new Date(task.DueDate).toISOString().split('T')[0] : ''}</TableCell>
                            <TableCell>{task.Priority}</TableCell>
                            <TableCell>{task.Description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TasksTableComponent;
