// LoanBox.tsx
import React, {useState, useEffect} from 'react';
import {
    FormControlLabel, Dialog, DialogTitle
    , DialogContent, TextField, DialogActions, Button,
    FormControl, IconButton, Select, MenuItem, InputLabel, Switch
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {Member, Loan} from '../../../../../../hooks/useMember';
import LoansTableComponent from './LoansTableComponent';
import {createLoan, getLoansForMember} from '../../../../../../API/api';
import {toast} from "react-toastify";
import { useSliderSwitchStyles} from "./LoanBox.styles";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const LoanBox: React.FC<CheckboxProps> = ({label, checked, onChange, member}) => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [open, setOpen] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const classes = useSliderSwitchStyles();
    const formik = useFormik({
        initialValues: {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            LoanAmount: 100, // set initial value to 100
            StartDate: new Date().toISOString().slice(0, 10),
            DueDate: new Date().toISOString().slice(0, 10),
            InterestRate: 1,
            Lender: '',
            LoanPurpose: '',
            RepaymentStatus: 'Pending',
        },
        validationSchema: Yup.object({
            LoanAmount: Yup.number().required('Required'),
            StartDate: Yup.date().required('Required'),
            DueDate: Yup.date().required('Required'),
            InterestRate: Yup.number().required('Required'),
            Lender: Yup.string().required('Required'),
            LoanPurpose: Yup.string().required('Required'),
            RepaymentStatus: Yup.string().required('Required').oneOf(['Paid', 'Compromised', 'Pending', 'Overdue', 'Defaulted']),
        }),
        onSubmit: (values) => {
            const loanData = {
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                Amount: values.LoanAmount,
                StartDate: values.StartDate,
                DueDate: values.DueDate,
                InterestRate: values.InterestRate,
                Lender: values.Lender,
                LoanPurpose: values.LoanPurpose,
                RepaymentStatus: values.RepaymentStatus,
            };
            createLoan(loanData)
                .then((newLoan) => {
                    setLoans([newLoan, ...loans]);
                    setOpen(false);
                    enqueueSnackbar('Loan created successfully', {variant: 'success'});
                })
                .catch((error) => {
                    enqueueSnackbar('Failed to create loan: ' + error.message, {variant: 'error'});
                });
        },
    });

    useEffect(() => {
        if (checked) {
            getLoansForMember(member.MemberID)
                .then((loans) => setLoans(loans))
                .catch((error) => {
                    enqueueSnackbar('Failed to fetch loans: ' + error.message, {variant: 'error'});
                });
        }
    }, [checked, member.MemberID, enqueueSnackbar]);

    const handleNewLoan = () => {
        setOpen(true);
        toast.info('Create New Loan')
    };

    const handleLoanAmountChange = (change: number) => {
        const newLoanAmount = formik.values.LoanAmount + change;
        formik.setFieldValue('LoanAmount', newLoanAmount < 1000 ? 1000 : newLoanAmount);
    };

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
                    <h4>Loans {member.MemberID}</h4>

                    <Button variant="contained" color="primary" onClick={handleNewLoan}>
                        Create New Loan
                    </Button>

                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Create New Loan</DialogTitle>
                        <DialogContent>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl fullWidth >
                                    <div>
                                        <IconButton onClick={() => handleLoanAmountChange(-100)}>
                                            <RemoveIcon/> {/* Use Remove Icon */}
                                        </IconButton>
                                        <TextField
                                            id="LoanAmount"
                                            name="LoanAmount"
                                            label="Loan Amount"
                                            type="number"
                                            value={formik.values.LoanAmount}
                                            onChange={formik.handleChange}
                                        />
                                        <IconButton onClick={() => handleLoanAmountChange(100)}>
                                            <AddIcon/>
                                        </IconButton>
                                    </div>
                                </FormControl>

                                <FormControl fullWidth >
                                    <TextField
                                        id="StartDate"
                                        name="StartDate"
                                        label="Start Date"
                                        type="date"
                                        value={formik.values.StartDate}
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth >
                                    <TextField
                                        id="DueDate"
                                        name="DueDate"
                                        label="Due Date"
                                        type="date"
                                        value={formik.values.DueDate}
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth >
                                    <TextField
                                        id="Lender"
                                        name="Lender"
                                        label="Lender"
                                        type="text"
                                        value={formik.values.Lender}
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>

                                <FormControl fullWidth >
                                    <TextField
                                        id="LoanPurpose"
                                        name="LoanPurpose"
                                        label="Loan Purpose"
                                        type="text"
                                        value={formik.values.LoanPurpose}
                                        onChange={formik.handleChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth >
                                    <InputLabel id="RepaymentStatus-label">Repayment Status</InputLabel>
                                    <Select
                                        labelId="RepaymentStatus-label"
                                        id="RepaymentStatus"
                                        name="RepaymentStatus"
                                        value={formik.values.RepaymentStatus}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="Paid">Paid</MenuItem>
                                        <MenuItem value="Compromised">Compromised</MenuItem>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Overdue">Overdue</MenuItem>
                                        <MenuItem value="Defaulted">Defaulted</MenuItem>
                                    </Select>
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

                    <LoansTableComponent loans={loans}/>
                </div>
            )}
        </>
    );
}

export default LoanBox;
