import React, {useState, useEffect} from 'react';
import {
    FormControlLabel, Dialog, DialogTitle
    , DialogContent, TextField, DialogActions, Button, InputLabel, Select, MenuItem, FormHelperText, Switch, FormControl
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Member, Tasks} from "../../../../../../hooks/useMember";
import TasksTableComponent from "./TasksTableComponent";
import {getTasksForMember, createTask, deleteTask, updateTask} from "../../../../../../API/api";
import {useSliderSwitchStyles} from "../Lone/LoanBox.styles";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const TaskBox: React.FC<CheckboxProps> = ({label, checked, onChange, member}) => {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Tasks | null>(null);

    const classes = useSliderSwitchStyles();

    const validationSchema = Yup.object({
        TaskName: Yup.string().required("Required"),
        Description: Yup.string().required("Required"),
        DueDate: Yup.date().required("Required"),
        TaskStatus: Yup.string().oneOf(['Not Started', 'Pending', 'In Progress', 'Completed'], 'Invalid status').required("Required"),
        Priority: Yup.number().required("Required")
    });

    const formik = useFormik({
        initialValues: {
            MemberID: member.MemberID,
            TaskName: 'Default Task Name',
            Description: 'Default Description',
            DueDate: new Date().toISOString().split('T')[0],
            TaskStatus: 'Not Started',
            Priority: 1
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const taskData = {
                TaskID: editingTask ? editingTask.TaskID : undefined,
                MemberID: member.MemberID,
                TaskName: values.TaskName,
                Description: values.Description,
                DueDate: values.DueDate,
                TaskStatus: values.TaskStatus,
                Priority: values.Priority
            };
            if (editingTask) {
                updateTask(taskData)
                    .then(updatedTask => {
                        setTasks(tasks.map(task => task.TaskID === editingTask?.TaskID ? updatedTask : task));
                        setOpen(false);
                        toast.success('Task updated successfully');
                    })
                    .catch(error => {
                        toast.error('Failed to update task: ' + error.message);
                    });
            } else {
                createTask(taskData)
                    .then(newTask => {
                        setTasks([newTask, ...tasks]);
                        setOpen(false);
                        toast.success('Task created successfully');
                    })
                    .catch(error => {
                        toast.error('Failed to create task: ' + error.message);
                    });
            }
        },
    });

    useEffect(() => {
        if (checked) {
            getTasksForMember(member.MemberID)
                .then(tasks => setTasks(tasks))
                .catch(error => {
                    toast.error('Failed to fetch tasks: ' + error.message);
                });
        }
    }, [checked, member.MemberID]);

    const handleNewTask = () => {
        setOpen(true);
        toast.info('Creating a new task');
    }
    const handleUpdateTask = async (TaskID: number, TaskData: Tasks) => {
        setEditingTask(TaskData);
        await formik.setValues({
            MemberID: TaskData.MemberID,
            TaskName: TaskData.TaskName,
            Description: TaskData.Description,
            DueDate: TaskData.DueDate,
            TaskStatus: TaskData.TaskStatus,
            Priority: TaskData.Priority
        });
        setOpen(true);
    };


    const handleDeleteTask = (TaskID: number) => {
        deleteTask(TaskID)
            .then(() => {
                setTasks(tasks.filter(task => task.TaskID !== TaskID));
                if (editingTask && editingTask.TaskID === TaskID) {
                    setOpen(false);
                    setEditingTask(null); // clear the editing income
                }
                toast.success('Task deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete task: ${error.message}`);
            });
    };
    return (
        <>
            <div className={classes.container}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={onChange}
                            color="primary"
                            className={classes.switch}
                        />
                    }
                    label={label}
                    labelPlacement="start"
                    className={classes.label}
                />
            </div>
            {checked && (
                <div>
                    <h4>Tasks {member.MemberID}</h4>

                    <Button variant="contained" color="primary" onClick={handleNewTask}>Create New Task</Button>

                    <Dialog open={open} onClose={() => {
                        setOpen(false);
                        toast.info('Task creation cancelled');
                    }}>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogContent>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="TaskName"
                                    name="TaskName"
                                    label="Task Name"
                                    value={formik.values.TaskName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.TaskName && Boolean(formik.errors.TaskName)}
                                    helperText={formik.touched.TaskName && formik.errors.TaskName}
                                />
                                <TextField
                                    fullWidth
                                    id="Description"
                                    name="Description"
                                    label="Description"
                                    value={formik.values.Description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Description && Boolean(formik.errors.Description)}
                                    helperText={formik.touched.Description && formik.errors.Description}
                                />
                                <TextField
                                    fullWidth
                                    id="DueDate"
                                    name="DueDate"
                                    label="Due Date"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.DueDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.DueDate && Boolean(formik.errors.DueDate)}
                                    helperText={formik.touched.DueDate && formik.errors.DueDate}
                                />
                                <InputLabel id="Status-label">Status</InputLabel>
                                <Select
                                    labelId="TaskStatus-label"
                                    id="TaskStatus"
                                    name="TaskStatus"
                                    value={formik.values.TaskStatus}
                                    onChange={formik.handleChange}
                                    error={formik.touched.TaskStatus && Boolean(formik.errors.TaskStatus)}
                                >
                                    <MenuItem value="Not Started">Not Started</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Select>
                                {formik.touched.TaskStatus && formik.errors.TaskStatus &&
                                    <FormHelperText>{formik.errors.TaskStatus}</FormHelperText>
                                }

                                <FormControl fullWidth>
                                    <InputLabel id="Priority-label">Priority</InputLabel>
                                    <Select
                                        labelId="Priority-label"
                                        id="Priority"
                                        name="Priority"
                                        value={formik.values.Priority}
                                        onChange={formik.handleChange}
                                        error={formik.touched.Priority && Boolean(formik.errors.Priority)}
                                    >
                                        {Array.from({length: 10}, (_, i) => (
                                            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                                        ))}

                                    </Select>
                                    {formik.touched.Priority && formik.errors.Priority && (
                                        <FormHelperText>{formik.errors.Priority}</FormHelperText>
                                    )}
                                </FormControl>
                                <DialogActions>
                                    <Button onClick={() => {
                                        setOpen(false);
                                        toast.info('Task creation cancelled');
                                    }} color="primary">Cancel</Button>
                                    <Button type="submit" color="primary">Save</Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <TasksTableComponent tasks={tasks} handleUpdateTask={handleUpdateTask}
                                         handleDeleteTask={handleDeleteTask}/>
                </div>
            )}
        </>
    );
};

export default TaskBox;
