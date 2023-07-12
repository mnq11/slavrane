import React, {useState, useEffect} from 'react';
import {
    FormControlLabel, Dialog,
    DialogTitle, DialogContent, TextField,
    DialogActions, Button, FormControl, FormHelperText, Switch
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Resource, Member} from '../../../../../../hooks/useMember';
import ResourcesTableComponent from './ResourcesTableComponent';
import {createResource, getResourcesForMember} from '../../../../../../API/api';
import {toast} from "react-toastify";
import {useSliderSwitchStyles} from "../Lone/LoanBox.styles";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const ResourceBox: React.FC<CheckboxProps> = ({label, checked, onChange, member}) => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [open, setOpen] = useState(false);
    const classes = useSliderSwitchStyles();
    const formik = useFormik({
        initialValues: {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            ResourceName: 'Default Resource Name',
            ResourceValue: 100,
            ResourceDescription: 'Default Resource Description',
            DateAcquired: new Date().toISOString().slice(0, 10)
        },
        validationSchema: Yup.object({
            ResourceName: Yup.string().required('Required'),
            ResourceValue: Yup.number().required('Required'),
            ResourceDescription: Yup.string().required('Required'),
            DateAcquired: Yup.date().required('Required')
        }),
        onSubmit: (values) => {
            const resourceData = {
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                ResourceName: values.ResourceName,
                ResourceValue: values.ResourceValue,
                ResourceDescription: values.ResourceDescription,
                DateAcquired: values.DateAcquired,
            };

            createResource(resourceData)
                .then((newResource) => {
                    setResources([newResource, ...resources]);
                    setOpen(false);
                    toast.success('Resource created successfully');
                })
                .catch((error) => {
                    toast.error('Failed to create resource: ' + error.message);
                });
        },
    });
    useEffect(() => {
        if (checked) {
            getResourcesForMember(member.MemberID)
                .then((resources) => setResources(resources))
                .catch((error) => {
                    toast.error('Failed to fetch resources: ' + error.message);
                });
        }
    }, [checked, member.MemberID]);


    return (
        <>
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={onChange}
                        classes={{
                            switchBase: classes.switchBase,
                            checked: classes.checked,
                            track: classes.track,
                        }}
                        color="primary"
                    />
                }
                label={label}
            />
            {checked && (
                <div>
                    <h4>Resources for Member {member.MemberID}</h4>

                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Create New Resource
                    </Button>

                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Create New Resource</DialogTitle>
                        <DialogContent>
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
                                    {formik.touched.ResourceName && formik.errors.ResourceName && (
                                        <FormHelperText>{formik.errors.ResourceName}</FormHelperText>
                                    )}
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
                                    {formik.touched.ResourceValue && formik.errors.ResourceValue && (
                                        <FormHelperText>{formik.errors.ResourceValue}</FormHelperText>
                                    )}
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
                                    {formik.touched.ResourceDescription && formik.errors.ResourceDescription && (
                                        <FormHelperText>{formik.errors.ResourceDescription}</FormHelperText>
                                    )}
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
                                    {formik.touched.DateAcquired && formik.errors.DateAcquired && (
                                        <FormHelperText>{formik.errors.DateAcquired}</FormHelperText>
                                    )}
                                </FormControl>

                                <DialogActions>
                                    <Button color="primary" type="submit">
                                        Save
                                    </Button>
                                    <Button onClick={() => setOpen(false)} color="primary">
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <ResourcesTableComponent resources={resources}/>
                </div>
            )}
        </>
    );
}

export default ResourceBox;
