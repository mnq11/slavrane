import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    FormControl, FormHelperText, TextField,
    DialogActions, Button, Tooltip,
} from '@material-ui/core';
import { Member } from '../../../../../../hooks/useMember';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

interface ResourceFormProps {
    initialValues: any;
    onSubmit: (values: any) => void;
    onClose: () => void;
    member: Member;
}

const validationSchema = Yup.object({
    ResourceName: Yup.string().required('Required'),
    ResourceValue: Yup.number().required('Required'),
    ResourceDescription: Yup.string().required('Required'),
    DateAcquired: Yup.date().required('Required'),
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
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth error={formik.touched.ResourceName && Boolean(formik.errors.ResourceName)}>
                <TextField
                    id="ResourceName"
                    name="ResourceName"
                    label="Resource Name"
                    type="text"
                    value={formik.values.ResourceName}
                    onChange={formik.handleChange}
                />
                <FormHelperText>{getErrorText('ResourceName')}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={formik.touched.ResourceValue && Boolean(formik.errors.ResourceValue)}>
                <TextField
                    id="ResourceValue"
                    name="ResourceValue"
                    label="Resource Value"
                    type="number"
                    value={formik.values.ResourceValue}
                    onChange={formik.handleChange}
                />
                <FormHelperText>{getErrorText('ResourceValue')}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={formik.touched.ResourceDescription && Boolean(formik.errors.ResourceDescription)}>
                <TextField
                    id="ResourceDescription"
                    name="ResourceDescription"
                    label="Resource Description"
                    type="text"
                    value={formik.values.ResourceDescription}
                    onChange={formik.handleChange}
                />
                <FormHelperText>{getErrorText('ResourceDescription')}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={formik.touched.DateAcquired && Boolean(formik.errors.DateAcquired)}>
                <TextField
                    id="DateAcquired"
                    name="DateAcquired"
                    label="Date Acquired"
                    type="date"
                    value={formik.values.DateAcquired}
                    onChange={formik.handleChange}
                />
                <FormHelperText>{getErrorText('DateAcquired')}</FormHelperText>
            </FormControl>

            <DialogActions>
                <Tooltip title="Save">
                    <Button color="primary" type="submit" startIcon={<SaveIcon />}>
                        Save
                    </Button>
                </Tooltip>
                <Tooltip title="Cancel">
                    <Button onClick={onClose} color="primary" startIcon={<CancelIcon />}>
                        Cancel
                    </Button>
                </Tooltip>
            </DialogActions>
        </form>
    );
};

export default ResourceForm;
