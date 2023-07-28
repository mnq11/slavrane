import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle,
    DialogContent, Button, Switch, Box, Typography, Grid, Card, CardContent,
} from '@material-ui/core';
import {Resource, Member} from '../../../../../../hooks/useMember';
import ResourcesTableComponent from './ResourcesTableComponent';
import {createResource, updateResource, deleteResource, getResourcesForMember} from '../../../../../../API/api';
import { toast } from 'react-toastify';
import { useLoanBoxStyles } from '../Lone/LoanBox.styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ResourceForm from './ResourceForm';
import {Divider, theme} from "antd";
import { ThemeProvider } from '@material-ui/core/styles';

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

    const classes = useLoanBoxStyles();

    const initialValues = {
        FamilyID: member.FamilyID,
        MemberID: member.MemberID,
        ResourceName: editingResource ? editingResource.ResourceName : 'اسم المورد الافتراضي',
        ResourceValue: editingResource ? editingResource.ResourceValue.toString() : '100',
        ResourceDescription: editingResource ? editingResource.ResourceDescription : 'وصف المورد الافتراضي',
        DateAcquired: editingResource
            ? new Date(editingResource.DateAcquired).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10),
    };

    const onSubmit = (values: any) => {
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
                    toast.success('تم تحديث المورد بنجاح');
                })
                .catch((error) => {
                    toast.error(`فشل تحديث المورد: ${error.message}`);
                });
        }
        else {
            createResource(resourceData)
                .then((newResource) => {
                    setResources([newResource, ...resources]);
                    setOpen(false);
                    toast.success('تم إنشاء المورد بنجاح');
                })
                .catch((error) => {
                    toast.error('فشل إنشاء المورد: ' + error.message);
                });
        }
    };

    useEffect(() => {
        getResourcesForMember(member.MemberID)
            .then((resources) => setResources(resources))
            .catch((error) => {
                toast.error('فشل جلب الموارد: ' + error.message);
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
                toast.success('تم حذف المورد بنجاح');
            })
            .catch((error) => {
                toast.error(`فشل حذف المورد: ${error.message}`);
            });
    };



    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardContent>
                        <Box className={classes.switchBox}>
                            <Typography variant="h5">{label}</Typography>
                            <Switch
                                checked={checked}
                                onChange={onChange}
                                color="primary"
                            />
                        </Box>
                        {checked && (
                            <>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Button variant="contained"  onClick={() => setOpen(true)} >
                                        <AddCircleIcon />
                                    </Button>
                                </Box>
                                <Divider />
                                <Dialog open={open} onClose={() => setOpen(false)}>
                                    <DialogTitle dir="rtl">
                                        {editingResource ? 'تحديث المورد' : 'إنشاء مورد جديد'}
                                    </DialogTitle>
                                    <DialogContent>
                                        <ResourceForm
                                            member={member}
                                            onSubmit={onSubmit}
                                            onClose={() => setOpen(false)}
                                            initialValues={initialValues}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <ResourcesTableComponent resources={resources} handleUpdateResources={handleUpdateResources} handleDeleteResources={handleDeleteResources}/>
                            </>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            </div>
        </ThemeProvider>
    );
};

export default ResourceBox;
