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
    IconButton,
    TablePagination
} from '@material-ui/core';
import {Tasks} from "../../../../../../hooks/useMember";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface TableComponentProps {
    tasks: Tasks[];
    handleDeleteTask: (taskId: number) => void;
    handleUpdateTask: (taskId: number, tasksData: Tasks) => void;
}
const TasksTableComponent: React.FC<TableComponentProps> = ({tasks, handleDeleteTask, handleUpdateTask}) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Tasks>('DueDate');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSortRequest = (cellId: keyof Tasks) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        let aVal = a[orderBy];
        let bVal = b[orderBy];

        if (orderBy === 'DueDate') {
            aVal = aVal ? new Date(aVal as string).getTime() : 0;
            bVal = bVal ? new Date(bVal as string).getTime() : 0;
        } else if (!(typeof aVal !== 'number' || typeof bVal !== 'number') || orderBy === 'Priority') {
            aVal = aVal ? parseFloat(aVal.toString()) : 0;
            bVal = bVal ? parseFloat(bVal.toString()) : 0;
        }

        if (aVal < bVal) {
            return order === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
            return order === 'asc' ? 1 : -1;
        }

        return 0;
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedTasks = sortedTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell >
                            <TableSortLabel
                                active={orderBy === 'TaskName'}
                                direction={orderBy === 'TaskName' ? order : 'asc'}
                                onClick={() => handleSortRequest('TaskName')}
                            >
                                Task Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key={'TaskStatus'}>
                            <TableSortLabel
                                active={orderBy === 'TaskStatus'}
                                direction={orderBy === 'TaskStatus' ? order : 'asc'}
                                onClick={() => handleSortRequest('TaskStatus')}
                            >
                                Status
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key={'DueDate'}>
                            <TableSortLabel
                                active={orderBy === 'DueDate'}
                                direction={orderBy === 'DueDate' ? order : 'asc'}
                                onClick={() => handleSortRequest('DueDate')}
                            >
                                Due Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key={'Priority'}>
                            <TableSortLabel
                                active={orderBy === 'Priority'}
                                direction={orderBy === 'Priority' ? order : 'asc'}
                                onClick={() => handleSortRequest('Priority')}
                            >
                                Priority
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key={'Description'}>
                            <TableSortLabel
                                active={orderBy === 'Description'}
                                direction={orderBy === 'Description' ? order : 'asc'}
                                onClick={() => handleSortRequest('Description')}
                            >
                                Description
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key={'Actions'} align="right">
                            Actions
                        </TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedTasks.map((task) => (
                        <TableRow key={task.TaskID}>
                            <TableCell>{task.TaskName}</TableCell>
                            <TableCell>{task.TaskStatus}</TableCell>
                            <TableCell>{task.DueDate ? new Date(task.DueDate).toISOString().split('T')[0] : ''}</TableCell>
                            <TableCell>{task.Priority}</TableCell>
                            <TableCell>{task.Description}</TableCell>
                            <TableCell align="right">
                                <IconButton color={"primary"} onClick={() => handleUpdateTask(task.TaskID ?? 0, task)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color={"secondary"} onClick={() => handleDeleteTask(task.TaskID ?? 0)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default TasksTableComponent;
