import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    FormControl,
    FormHelperText,
    TextField,
    DialogActions,
    Button,
    Tooltip,
    ThemeProvider,
} from '@material-ui/core';
import { Member } from '../../../../../../hooks/useMember';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { createMuiTheme } from '@material-ui/core/styles';

interface ResourceFormProps {
    initialValues: any;
    onSubmit: (values: any) => void;
    onClose: () => void;
    member: Member;
}

const validationSchema = Yup.object({
    ResourceName: Yup.string().required('مطلوب'),
    ResourceValue: Yup.number().required('مطلوب'),
    ResourceDescription: Yup.string().required('مطلوب'),
    DateAcquired: Yup.date().required('مطلوب'),
});

const ResourceForm: React.FC<ResourceFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const getErrorText = (fieldName: string) => {
        const touched = formik.touched[fieldName];
        const errors = formik.errors[fieldName];
        return touched && errors ? String(errors) : '';
    };

    const theme = createMuiTheme({
        direction: 'rtl',
    });

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth error={formik.touched.ResourceName && Boolean(formik.errors.ResourceName)}>
                    <TextField
                        id="ResourceName"
                        name="ResourceName"
                        label="اسم المورد"
                        type="text"
                        value={formik.values.ResourceName}
                        onChange={formik.handleChange}
                        dir="rtl" // Add dir="rtl" for RTL input
                    />
                    <FormHelperText>{getErrorText('ResourceName')}</FormHelperText>
                </FormControl>

                <FormControl fullWidth error={formik.touched.ResourceValue && Boolean(formik.errors.ResourceValue)}>
                    <TextField
                        id="ResourceValue"
                        name="ResourceValue"
                        label="قيمة المورد"
                        type="number"
                        value={formik.values.ResourceValue}
                        onChange={formik.handleChange}
                        dir="rtl" // Add dir="rtl" for RTL input
                    />
                    <FormHelperText>{getErrorText('ResourceValue')}</FormHelperText>
                </FormControl>

                <FormControl fullWidth error={formik.touched.ResourceDescription && Boolean(formik.errors.ResourceDescription)}>
                    <TextField
                        id="ResourceDescription"
                        name="ResourceDescription"
                        label="وصف المورد"
                        type="text"
                        value={formik.values.ResourceDescription}
                        onChange={formik.handleChange}
                        dir="rtl" // Add dir="rtl" for RTL input
                    />
                    <FormHelperText>{getErrorText('ResourceDescription')}</FormHelperText>
                </FormControl>

                <FormControl fullWidth error={formik.touched.DateAcquired && Boolean(formik.errors.DateAcquired)}>
                    <TextField
                        id="DateAcquired"
                        name="DateAcquired"
                        label="تاريخ الحصول"
                        type="date"
                        value={formik.values.DateAcquired}
                        onChange={formik.handleChange}
                        dir="rtl" // Add dir="rtl" for RTL input
                    />
                    <FormHelperText>{getErrorText('DateAcquired')}</FormHelperText>
                </FormControl>

                <DialogActions>
                    <Tooltip title="حفظ">
                        <Button color="primary" type="submit" startIcon={<SaveIcon />}>
                            حفظ
                        </Button>
                    </Tooltip>
                    <Tooltip title="إلغاء">
                        <Button onClick={onClose} color="primary" startIcon={<CancelIcon />}>
                            إلغاء
                        </Button>
                    </Tooltip>
                </DialogActions>
            </form>
        </ThemeProvider>
    );
};

export default ResourceForm;
