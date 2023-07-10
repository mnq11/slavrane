import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Dialog, DialogTitle
    , DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import {Member, Tasks} from "../../../../../../hooks/useMember";
import TasksTableComponent from "./TasksTableComponent";
import {getTasksForMember, createTask} from "../../../../../../API/api";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const TaskBox: React.FC<CheckboxProps> = ({ label, checked, onChange, member }) => {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = Yup.object({
        Description: Yup.string().required("Required"),
        DueDate: Yup.date().required("Required"),
        Status: Yup.string().required("Required"),
        Priority: Yup.string().required("Required")
    });

    const formik = useFormik({
        initialValues: {
            Description: '',
            DueDate: '',
            Status: '',
            Priority: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createTask({values: values, memberId: member.MemberID})
                .then(newTask => {
                    setTasks([newTask, ...tasks]);
                    setOpen(false);
                    enqueueSnackbar('Task created successfully', { variant: 'success' });
                })
                .catch(error => {
                    enqueueSnackbar('Failed to create task: ' + error.message, { variant: 'error' });
                });
        },
    });

    useEffect(() => {
        if (checked) {
            getTasksForMember(member.MemberID)
                .then(tasks => setTasks(tasks))
                .catch(error => {
                    enqueueSnackbar('Failed to fetch tasks: ' + error.message, { variant: 'error' });
                });
        }
    }, [checked, member.MemberID, enqueueSnackbar]);

    const handleNewTask = () => {
        setOpen(true);
    }

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        color="primary"
                    />
                }
                label={label}
            />
            {checked && (
                <div>
                    <h4>Tasks</h4>
                    <Button variant="contained" color="primary" onClick={handleNewTask}>Create New Task</Button>

                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogContent>
                            <form onSubmit={formik.handleSubmit}>
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
                                <TextField
                                    fullWidth
                                    id="Status"
                                    name="Status"
                                    label="Status"
                                    value={formik.values.Status}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Status && Boolean(formik.errors.Status)}
                                    helperText={formik.touched.Status && formik.errors.Status}
                                />
                                <TextField
                                    fullWidth
                                    id="Priority"
                                    name="Priority"
                                    label="Priority"
                                    value={formik.values.Priority}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Priority && Boolean(formik.errors.Priority)}
                                    helperText={formik.touched.Priority && formik.errors.Priority}
                                />
                                <DialogActions>
                                    <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                                    <Button type="submit" color="primary">Save</Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <TasksTableComponent tasks={tasks} />
                </div>
            )}
        </>
    );
};

export default TaskBox;
