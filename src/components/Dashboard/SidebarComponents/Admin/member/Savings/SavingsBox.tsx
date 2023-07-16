import React, {useState, useEffect} from 'react';
import {
    FormControlLabel, Dialog,
    DialogTitle, DialogContent, TextField,
    DialogActions, Button, FormControl, FormHelperText, Switch
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Member, Savings} from '../../../../../../hooks/useMember';
import SavingsTableComponent from './SavingsTableComponent';
import {createSaving, deleteSaving, getSavingsForMember, updateSaving} from '../../../../../../API/api';
import {toast} from "react-toastify";
import {useSliderSwitchStyles} from "../Lone/LoanBox.styles";

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

    const classes = useSliderSwitchStyles();
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

            if(editingSaving) {
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
        if(savingsData){
            setEditingSaving(savingsData);
            setOpen(true);
        }
    };

    const handleDeleteSavings = (savingsID: number) => {
        deleteSaving(savingsID)
            .then(() => {
                setSavings(savings.filter(saving => saving.SavingsID !== savingsID));
                if(editingSaving && editingSaving.SavingsID === savingsID){
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
                    <h4>Savings for Member {member.MemberID}</h4>

                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Create New Savings
                    </Button>

                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>{editingSaving ? 'Edit Savings' : 'Create New Savings'}</DialogTitle>
                        <DialogContent>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl fullWidth error={formik.touched.Amount && Boolean(formik.errors.Amount)}>
                                    <TextField
                                        id="Amount"
                                        name="Amount"
                                        label="Amount"
                                        type="number"
                                        value={formik.values.Amount}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.Amount && formik.errors.Amount && (
                                        <FormHelperText>{formik.errors.Amount}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={formik.touched.Date && Boolean(formik.errors.Date)}>
                                    <TextField
                                        id="Date"
                                        name="Date"
                                        label="Date"
                                        type="date"
                                        value={formik.values.Date}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.Date && formik.errors.Date && (
                                        <FormHelperText>{formik.errors.Date}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={formik.touched.SavingsGoal && Boolean(formik.errors.SavingsGoal)}>
                                    <TextField
                                        id="SavingsGoal"
                                        name="SavingsGoal"
                                        label="Savings Goal"
                                        type="number"
                                        value={formik.values.SavingsGoal}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.SavingsGoal && formik.errors.SavingsGoal && (
                                        <FormHelperText>{formik.errors.SavingsGoal}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={formik.touched.TargetDate && Boolean(formik.errors.TargetDate)}>
                                    <TextField
                                        id="TargetDate"
                                        name="TargetDate"
                                        label="Target Date"
                                        type="date"
                                        value={formik.values.TargetDate}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.TargetDate && formik.errors.TargetDate && (
                                        <FormHelperText>{formik.errors.TargetDate}</FormHelperText>
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
                    <SavingsTableComponent savings={savings} handleUpdateSavings={handleUpdateSavings} handleDeleteSavings={handleDeleteSavings}/>
                </div>
            )}
        </>
    );
}

export default SavingsBox;
