import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Box
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

interface FormValues {
    SkillID: number;
    MemberID?: number;
    SkillName: string;
    SkillLevel: number;
    DateAcquired: string;
    Certification: string;
}

interface SkillFormProps {
    open: boolean;
    onSubmit: (values: FormValues) => void;
    onClose: () => void;
    initialValues: FormValues;
}

const SkillForm: React.FC<SkillFormProps> = ({ open, onSubmit, onClose, initialValues }) => {
    const validationSchema = Yup.object({
        SkillName: Yup.string().required('مطلوب'),
        SkillLevel: Yup.number().min(1, 'يجب أن يكون مستوى المهارة على الأقل 1').required('مطلوب'),
        DateAcquired: Yup.date().required('مطلوب'),
        Certification: Yup.string().required('مطلوب'),
    });

    const formik = useFormik<FormValues>({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle  dir="rtl" >إنشاء مهارة جديدة</DialogTitle>
            <DialogContent dir="rtl">
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="SkillName"
                        name="SkillName"
                        label="اسم المهارة"
                        value={formik.values.SkillName}
                        onChange={formik.handleChange}
                        error={formik.touched.SkillName && Boolean(formik.errors.SkillName)}
                        helperText={formik.touched.SkillName && formik.errors.SkillName}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="SkillLevel-label">مستوى المهارة</InputLabel>
                        <Select
                            labelId="SkillLevel-label"
                            id="SkillLevel"
                            name="SkillLevel"
                            value={formik.values.SkillLevel}
                            onChange={formik.handleChange}
                            error={formik.touched.SkillLevel && Boolean(formik.errors.SkillLevel)}
                        >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                <MenuItem value={value} key={value}>{value}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.SkillLevel && formik.errors.SkillLevel && (
                            <FormHelperText>{formik.errors.SkillLevel}</FormHelperText>
                        )}
                    </FormControl>
                    <TextField
                        fullWidth
                        id="DateAcquired"
                        name="DateAcquired"
                        label="تاريخ الحصول على المهارة"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.DateAcquired}
                        onChange={formik.handleChange}
                        error={formik.touched.DateAcquired && Boolean(formik.errors.DateAcquired)}
                        helperText={formik.touched.DateAcquired && formik.errors.DateAcquired}
                    />
                    <TextField
                        fullWidth
                        id="Certification"
                        name="Certification"
                        label="الشهادة"
                        value={formik.values.Certification}
                        onChange={formik.handleChange}
                        error={formik.touched.Certification && Boolean(formik.errors.Certification)}
                        helperText={formik.touched.Certification && formik.errors.Certification}
                    />
                    <DialogActions dir="rtl">
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={onClose} color="primary">
                                إلغاء
                            </Button>
                            <Button type="submit" color="primary">
                                حفظ
                            </Button>
                        </Box>
                    </DialogActions>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SkillForm;
