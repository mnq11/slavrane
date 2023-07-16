import React, { useState, useEffect } from 'react';
import {
    FormControlLabel, Dialog,
    DialogTitle, DialogContent, TextField,
    DialogActions, Button, FormControl, FormHelperText, Switch, Tooltip,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Resource, Member} from '../../../../../../hooks/useMember';
import ResourcesTableComponent from './ResourcesTableComponent';
import {createResource, updateResource, deleteResource, getResourcesForMember} from '../../../../../../API/api';
import { toast } from 'react-toastify';
import { useSliderSwitchStyles } from '../Lone/LoanBox.styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const ResourceBox: React.FC<CheckboxProps> = ({ label, checked, onChange, member }) => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [open, setOpen] = useState(false);
    const [editingResource, setEditingResource] = useState<Resource | null>(null);

    const classes = useSliderSwitchStyles();
    const formik = useFormik({
        initialValues: {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            ResourceName: editingResource ? editingResource.ResourceName : 'Default Resource Name',
            ResourceValue: editingResource ? editingResource.ResourceValue.toString() : '100',
            ResourceDescription: editingResource ? editingResource.ResourceDescription : 'Default Resource Description',
            DateAcquired: editingResource ? editingResource.DateAcquired : new Date().toISOString().slice(0, 10),
        },
        validationSchema: Yup.object({
            ResourceName: Yup.string().required('Required'),
            ResourceValue: Yup.number().required('Required'),
            ResourceDescription: Yup.string().required('Required'),
            DateAcquired: Yup.date().required('Required'),
        }),
        onSubmit: (values) => {
            const resourceData = {
                ResourceID: editingResource ? editingResource.ResourceID : undefined,
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                ResourceName: values.ResourceName,
                ResourceValue: Number(values.ResourceValue),
                ResourceDescription: values.ResourceDescription,
                DateAcquired: values.DateAcquired,
            };

            if (editingResource) {
                updateResource(resourceData)
                    .then((updatedResource) => {
                        setResources(resources.map(resource => resource.ResourceID === updatedResource.ResourceID ? updatedResource : resource));
                        setOpen(false);
                        setEditingResource(null);
                        toast.success('Resource updated successfully');
                    })
                    .catch((error) => {
                        toast.error(`Failed to update resource: ${error.message}`);
                    });
            }
            else {
                createResource(resourceData)
                    .then((newResource) => {
                        setResources([newResource, ...resources]);
                        setOpen(false);
                        toast.success('Resource created successfully');
                    })
                    .catch((error) => {
                        toast.error('Failed to create resource: ' + error.message);
                    });
            }
        },
    });

        useEffect(() => {
        getResourcesForMember(member.MemberID)
            .then((resources) => setResources(resources))
            .catch((error) => {
                toast.error('Failed to fetch resources: ' + error.message);
            });
    }, [member.MemberID]);

    const handleUpdateResources = async (resourceId: number) => {
        const resourceData = resources.find(resource => resource.ResourceID === resourceId);
        if(resourceData){
            setEditingResource(resourceData);
            setOpen(true);
        }
    };
    const handleDeleteResources = (resourceID: number) => {
        deleteResource(resourceID)
            .then(() => {
                setResources(resources.filter(resource => resource.ResourceID !== resourceID));
                if(editingResource && editingResource.ResourceID === resourceID){
                    setOpen(false);
                    setEditingResource(null);
                }
                toast.success('Resource deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete Resource: ${error.message}`);
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
                    <Tooltip title="Create New Resource">
                        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                            <AddCircleIcon /> Create New Resource
                        </Button>
                    </Tooltip>

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

                                <DialogActions className={classes.dialogAction}>
                                    <Tooltip title="Save">
                                        <Button color="primary" type="submit" startIcon={<SaveIcon />}>
                                            Save
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Cancel">
                                        <Button onClick={() => setOpen(false)} color="primary" startIcon={<CancelIcon />}>
                                            Cancel
                                        </Button>
                                    </Tooltip>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <ResourcesTableComponent resources={resources} handleUpdateResources={handleUpdateResources} handleDeleteResources={handleDeleteResources}/>
                </div>
            )}
        </>
    );
};

export default ResourceBox;
