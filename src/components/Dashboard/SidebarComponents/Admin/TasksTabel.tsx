// TasksTable.tsx
import React, {useState} from 'react';
import {DetailedCardStyles} from "./AdminPanel.Styles";
import Button from "@material-ui/core/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    DialogActions,
    DialogContent,
    Dialog, DialogTitle, TextField, MenuItem, Select
} from "@material-ui/core";
import {Member, Task} from "../../../../hooks/useMember";
import {createTask, deleteTask, updateTask} from "../../../../API/api";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface TasksTableProps {
    label: string;
    tasks: Task[];
    show: boolean;
    toggleShow: () => void;
    currentMember: Member;

}

const TasksTable: React.FC<TasksTableProps> = ({ label, tasks, show, toggleShow, currentMember }) => {
    const classes = DetailedCardStyles();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [newTask, setNewTask] = useState<Task | null>(null);

    const handleClickOpenUpdate = (task: Task) => {
        setCurrentTask(task);
        setOpenUpdate(true);
    };

    const handleClickOpenCreate = () => {
        setNewTask({
            TaskID: Math.floor(Math.random() * 1000000),
            Description: '',
            DueDate: '',
            Status: '',
            createdAt: '',
            updatedAt: '',
            MemberTask: {
                id: Math.floor(Math.random() * 1000000),
                MemberID: 0,
                TaskID: 0
            }
        });
        setOpenCreate(true);
    };

    const handleClickOpenDelete = (task: Task) => {
        setCurrentTask(task);
        setOpenDelete(true);
    };

    const handleClose = () => {
        setOpenUpdate(false);
        setOpenCreate(false);
        setOpenDelete(false);
    };

    const handleChangeUpdate = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target as HTMLInputElement;
        if (currentTask && name) {
            setCurrentTask({
                ...currentTask,
                [name]: value,
            });
        }
    };


    const handleChangeCreate = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target as HTMLInputElement;
        if (newTask && name) {
            setNewTask({
                ...newTask,
                [name]: value,
            });
        }
    };
    const handleCreate = async () => {
        // API call to create the task
        try {
            if (newTask && currentMember) {
                const taskWithMember = {
                    ...newTask,
                    MemberTask: {
                        ...newTask.MemberTask,
                        MemberID: currentMember.MemberID // Use currentMember's ID here
                    }
                };
                await createTask(taskWithMember);
                toast.success('Task created successfully');
                setOpenCreate(false);
            }
        } catch (error) {
            toast.error('An error occurred while creating the task');
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        // API call to update the task
        try {
            if (currentTask) {
                const { MemberTask, ...taskToUpdate } = currentTask;
                await updateTask(taskToUpdate);
                toast.success('Task updated successfully');
                setOpenUpdate(false);
            }
        } catch (error) {
            toast.error('An error occurred while updating the task');
            console.error(error);
        }
    };






    const handleDelete = async () => {
        // API call to delete the task
        try {
            if (currentTask) {
                await deleteTask(currentTask.TaskID);
                toast.success('Task deleted successfully');
                setOpenDelete(false);
            }
        } catch (error) {
            toast.error('An error occurred while deleting the task');
            console.error(error);
        }
    };

    return (
        <div className={classes.root}>
            <ToastContainer />
            <Button variant="contained" color="primary" onClick={toggleShow} className={classes.button}>
                View Tasks
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClickOpenCreate} className={classes.button}>
                Create Task
            </Button>
            {show && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, index) => (
                                <TableRow key={index}>
                                    <TableCell>{task.Description}</TableCell>
                                    <TableCell>{task.DueDate}</TableCell>
                                    <TableCell>{task.Status}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="default"
                                                onClick={() => handleClickOpenUpdate(task)} className={classes.button}>
                                            Update
                                        </Button>
                                        <Button variant="contained" color="secondary"
                                                onClick={() => handleClickOpenDelete(task)} className={classes.button}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Dialog open={openUpdate} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="Description"
                                label="Description"
                                type="text"
                                fullWidth
                                value={currentTask?.Description || ''}
                                onChange={handleChangeUpdate}
                            />
                            <TextField
                                margin="dense"
                                name="DueDate"
                                label="Due Date"
                                type="date"
                                fullWidth
                                value={currentTask?.DueDate || ''}
                                onChange={handleChangeUpdate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Select
                                value={currentTask?.Status || ''}
                                onChange={handleChangeUpdate}
                                inputProps={{
                                    name: 'Status',
                                }}
                                defaultValue={'Not Started'}
                            >
                                <MenuItem value={'Not Started'}>Not Started</MenuItem>
                                <MenuItem value={'Pending'}>Pending</MenuItem>
                                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                <MenuItem value={'Completed'}>Completed</MenuItem>
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleUpdate} color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openCreate} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="Description"
                                label="Description"
                                type="text"
                                fullWidth
                                value={newTask?.Description || ''}
                                onChange={handleChangeCreate}
                            />
                            <TextField
                                margin="dense"
                                name="DueDate"
                                label="Due Date"
                                type="date"
                                fullWidth
                                value={newTask?.DueDate || ''}
                                onChange={handleChangeCreate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Select
                                value={newTask?.Status || ''}
                                onChange={handleChangeCreate}
                                inputProps={{
                                    name: 'Status',
                                }}
                                defaultValue={'Not Started'}
                            >
                                <MenuItem value={'Not Started'}>Not Started</MenuItem>
                                <MenuItem value={'Pending'}>Pending</MenuItem>
                                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                                <MenuItem value={'Completed'}>Completed</MenuItem>
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleCreate} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openDelete} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Delete Task</DialogTitle>
                        <DialogContent>
                            <p>Are you sure you want to delete this task?</p>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} color="secondary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>

                </TableContainer>
            )}
            </div>
                );
            };

export default TasksTable;
