// TaskForm.tsx
import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
    InputLabel, Select, MenuItem, FormHelperText, FormControl
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// TaskForm.tsx
const validationSchema = Yup.object({
    MemberID: Yup.number().min(0, "Invalid MemberID").required("Required"),
    TaskName: Yup.string().required("Required"),
    Description: Yup.string().required("Required"),
    DueDate: Yup.date().required("Required"),
    TaskStatus: Yup.string().oneOf(['Not Started', 'Pending', 'In Progress', 'Completed'], 'Invalid status').required("Required"),
    Priority: Yup.number().required("Required")
});

interface TaskFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    initialValues: {
        MemberID: number,
        TaskName: string,
        Description: string,
        DueDate: string,
        TaskStatus: string,
        Priority: number
    };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onClose, open, initialValues }) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <Dialog open={open} onClose={onClose}>
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
                    <InputLabel id="TaskStatus-label">Status</InputLabel>
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
                        <Button onClick={onClose} color="primary">Cancel</Button>
                        <Button type="submit" color="primary">Save</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TaskForm;
