import React, {useState, useEffect} from 'react';
import {
    Checkbox, FormControlLabel, Dialog,
    DialogTitle, DialogContent, TextField,
    DialogActions, Button, FormControl, FormHelperText
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Member, Savings} from '../../../../../../hooks/useMember';
import SavingsTableComponent from './SavingsTableComponent';
import {createSaving, getSavingsForMember} from '../../../../../../API/api';
import {toast} from "react-toastify";

interface SavingsBoxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const SavingsBox: React.FC<SavingsBoxProps> = ({label, checked, onChange, member}) => {
    const [savings, setSavings] = useState<Savings[]>([]);
    const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: {
            MemberID: member.MemberID,
            Amount: 0,
            Date: new Date().toISOString().slice(0, 10),
            SavingsGoal: '',
            TargetDate: new Date().toISOString().slice(0, 10),
        },
        validationSchema: Yup.object({
            Amount: Yup.number().required('Required'),
            Date: Yup.date().required('Required'),
            SavingsGoal: Yup.string().required('Required'),
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

            createSaving(savingsData)
                .then((newSavings) => {
                    setSavings([newSavings, ...savings]);
                    setOpen(false);
                    toast.success('Savings created successfully');
                })
                .catch((error) => {
                    toast.error('Failed to create savings: ' + error.message);
                });
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

    return (
        <>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} color="primary"/>}
                label={label}
            />
            {checked && (
                <div>
                    <h4>Savings for Member {member.MemberID}</h4>

                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Create New Savings
                    </Button>

                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Create New Savings</DialogTitle>
                        <DialogContent>
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
                                            type="text"
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
                        </DialogContent>
                    </Dialog>
                    <SavingsTableComponent savings={savings}/>
                </div>
            )}
        </>
    );
}

export default SavingsBox;
