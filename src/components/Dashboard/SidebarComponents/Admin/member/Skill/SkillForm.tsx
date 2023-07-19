// SkillForm.tsx
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
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


const SkillForm: React.FC<SkillFormProps> = ({open, onSubmit, onClose, initialValues}) => {
    const validationSchema = Yup.object({
        SkillName: Yup.string().required('Required'),
        SkillLevel: Yup.number().min(1, 'Skill level should be at least 1').required('Required'),
        DateAcquired: Yup.date().required('Required'),
        Certification: Yup.string().required('Required'),
    });

    const formik = useFormik<FormValues>({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Skill</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="SkillName"
                        name="SkillName"
                        label="Skill Name"
                        value={formik.values.SkillName}
                        onChange={formik.handleChange}
                        error={formik.touched.SkillName && Boolean(formik.errors.SkillName)}
                        helperText={formik.touched.SkillName && formik.errors.SkillName}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="SkillLevel-label">Skill Level</InputLabel>
                        <Select
                            labelId="SkillLevel-label"
                            id="SkillLevel"
                            name="SkillLevel"
                            value={formik.values.SkillLevel}
                            onChange={formik.handleChange}
                            error={formik.touched.SkillLevel && Boolean(formik.errors.SkillLevel)}
                        >
                            {Array.from({length: 10}, (_, i) => i + 1).map((value) => (
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
                        label="Date Acquired"
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
                        label="Certification"
                        value={formik.values.Certification}
                        onChange={formik.handleChange}
                        error={formik.touched.Certification && Boolean(formik.errors.Certification)}
                        helperText={formik.touched.Certification && formik.errors.Certification}
                    />
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SkillForm;
