import React, {useState, useEffect} from 'react';
import {Switch, CardContent, Card, Grid, Typography, Box, IconButton, ThemeProvider} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Member, Savings} from '../../../../../../hooks/useMember';
import SavingsTableComponent from './SavingsTableComponent';
import {createSaving, deleteSaving, getSavingsForMember, updateSaving} from '../../../../../../API/api';
import {toast} from "react-toastify";
import {useLoanBoxStyles} from "../Lone/LoanBox.styles";
import SavingsForm from "./SavingsForm";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {Divider, theme} from "antd";

interface SavingsBoxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const SavingsBox: React.FC<SavingsBoxProps> = ({label, checked, onChange, member}) => {
    const [savings, setSavings] = useState<Savings[]>([]);
    const [open, setOpen] = useState(false);
    const [editingSaving, setEditingSaving] = useState<Savings | null>(null);

    const classes = useLoanBoxStyles();
    const formik = useFormik({
        initialValues: editingSaving ? {
            MemberID: editingSaving.MemberID,
            FamilyID: editingSaving.FamilyID,
            Amount: editingSaving.Amount,
            Date: new Date(editingSaving.Date).toISOString().slice(0, 10),
            SavingsGoal: editingSaving.SavingsGoal,
            TargetDate: new Date(editingSaving.TargetDate).toISOString().slice(0, 10),
        } : {
            MemberID: member.MemberID,
            FamilyID: member.FamilyID,
            Amount: 0,
            Date: new Date().toISOString().slice(0, 10),
            SavingsGoal: '',
            TargetDate: new Date().toISOString().slice(0, 10),
        },
        enableReinitialize: true,  // This prop
        validationSchema: Yup.object({
            Amount: Yup.number().required('Required'),
            Date: Yup.date().required('Required'),
            SavingsGoal: Yup.number().required('Required'),
            TargetDate: Yup.date().required('Required')
        }),

        onSubmit: (values) => {
            const savingsData = {
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                Amount: values.Amount,
                Date: values.Date,
                SavingsGoal: values.SavingsGoal,
                TargetDate: values.TargetDate,
            };

            if (editingSaving) {
                const updatedSavingsData = {...savingsData, SavingsID: editingSaving.SavingsID};

                updateSaving(updatedSavingsData)
                    .then((updatedSaving) => {
                        setSavings(savings.map(saving => saving.SavingsID === updatedSaving.SavingsID ? updatedSaving : saving));
                        setOpen(false);
                        setEditingSaving(null);
                        toast.success('Savings updated successfully');
                    })
                    .catch((error) => {
                        toast.error('Failed to update savings: ' + error.message);
                    });
            } else {
                createSaving(savingsData)
                    .then((newSavings) => {
                        setSavings([newSavings, ...savings]);
                        setOpen(false);
                        toast.success('Savings created successfully');
                    })
                    .catch((error) => {
                        toast.error('Failed to create savings: ' + error.message);
                    });
            }
        },
    });

    useEffect(() => {
        if (checked) {
            getSavingsForMember(member.MemberID)
                .then((savings) => setSavings(savings))
                .catch((error) => {
                    toast.error('Failed to fetch savings: ' + error.message);
                });
        }
    }, [checked, member.MemberID]);

    const handleUpdateSavings = async (savingId: number) => {
        const savingsData = savings.find(saving => saving.SavingsID === savingId);
        if (savingsData) {
            setEditingSaving(savingsData);
            setOpen(true);
        }
    };

    const handleDeleteSavings = (savingsID: number) => {
        deleteSaving(savingsID)
            .then(() => {
                setSavings(savings.filter(saving => saving.SavingsID !== savingsID));
                if (editingSaving && editingSaving.SavingsID === savingsID) {
                    setOpen(false);
                    setEditingSaving(null);
                }
                toast.success('Savings deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete Savings: ${error.message}`);
            });
    };

    return (
        <ThemeProvider theme={theme}>
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
                                    <IconButton color="primary" onClick={() => setOpen(true)}>
                                        <AddCircleOutlineIcon/>
                                    </IconButton>
                                </Box>
                                <Divider/>

                                <SavingsForm
                                    open={open}
                                    handleClose={() => setOpen(false)}
                                    formik={formik}
                                    isUpdating={Boolean(editingSaving)}
                                />
                                <SavingsTableComponent savings={savings} handleUpdateSavings={handleUpdateSavings}
                                                       handleDeleteSavings={handleDeleteSavings}/>
                            </>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </ThemeProvider>
    );
};

export default SavingsBox;
