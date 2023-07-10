// TasksTableComponent.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Tasks } from "../../../../../../hooks/useMember";

interface TableComponentProps {
    tasks: Tasks[];
}

const TasksTableComponent: React.FC<TableComponentProps> = ({ tasks }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task ID</TableCell>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.TaskID}>
                            <TableCell>{task.TaskID}</TableCell>
                            <TableCell>{task.TaskName}</TableCell>
                            <TableCell>{task.TaskStatus}</TableCell>
                            <TableCell>{task.DueDate}</TableCell>
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
