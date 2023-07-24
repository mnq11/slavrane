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
    MemberID: Yup.number().min(0, "رقم عضو غير صالح").required("مطلوب"),
    TaskName: Yup.string().required("مطلوب"),
    Description: Yup.string().required("مطلوب"),
    DueDate: Yup.date().required("مطلوب"),
    TaskStatus: Yup.string().oneOf(['لم يبدأ', 'قيد الانتظار', 'قيد التنفيذ', 'مكتمل'], 'حالة غير صالحة').required("مطلوب"),
    Priority: Yup.number().required("مطلوب")
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
        <Dialog open={open} onClose={onClose} dir="rtl">
            <DialogTitle>إنشاء مهمة جديدة</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="TaskName"
                        name="TaskName"
                        label="اسم المهمة"
                        value={formik.values.TaskName}
                        onChange={formik.handleChange}
                        error={formik.touched.TaskName && Boolean(formik.errors.TaskName)}
                        helperText={formik.touched.TaskName && formik.errors.TaskName}
                    />
                    <TextField
                        fullWidth
                        id="Description"
                        name="Description"
                        label="الوصف"
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                        error={formik.touched.Description && Boolean(formik.errors.Description)}
                        helperText={formik.touched.Description && formik.errors.Description}
                    />
                    <TextField
                        fullWidth
                        id="DueDate"
                        name="DueDate"
                        label="تاريخ الاستحقاق"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.DueDate}
                        onChange={formik.handleChange}
                        error={formik.touched.DueDate && Boolean(formik.errors.DueDate)}
                        helperText={formik.touched.DueDate && formik.errors.DueDate}
                    />
                    <InputLabel id="TaskStatus-label">الحالة</InputLabel>
                    <Select
                        labelId="TaskStatus-label"
                        id="TaskStatus"
                        name="TaskStatus"
                        value={formik.values.TaskStatus}
                        onChange={formik.handleChange}
                        error={formik.touched.TaskStatus && Boolean(formik.errors.TaskStatus)}
                    >
                        <MenuItem value="لم يبدأ">لم يبدأ</MenuItem>
                        <MenuItem value="قيد الانتظار">قيد الانتظار</MenuItem>
                        <MenuItem value="قيد التنفيذ">قيد التنفيذ</MenuItem>
                        <MenuItem value="مكتمل">مكتمل</MenuItem>
                    </Select>
                    {formik.touched.TaskStatus && formik.errors.TaskStatus &&
                        <FormHelperText>{formik.errors.TaskStatus}</FormHelperText>
                    }

                    <FormControl fullWidth>
                        <InputLabel id="Priority-label">الأولوية</InputLabel>
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
                        <Button onClick={onClose} color="primary">إلغاء</Button>
                        <Button type="submit" color="primary">حفظ</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TaskForm;
