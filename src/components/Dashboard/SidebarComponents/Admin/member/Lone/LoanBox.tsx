import React, {useState, useEffect} from 'react';
import {
    FormControlLabel, Dialog, DialogTitle, DialogContent,
    TextField, DialogActions, Button, FormControl, IconButton,
    Select, MenuItem, InputLabel, Switch, Paper
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {Member, Loan} from '../../../../../../hooks/useMember';
import LoansTableComponent from './LoansTableComponent';
import {createLoan, getLoansForMember} from '../../../../../../API/api';
import {toast} from 'react-toastify';
import {useSliderSwitchStyles} from './LoanBox.styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {makeStyles} from "@material-ui/core/styles";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        backgroundColor: '#f9f9f9',
        borderRadius: theme.spacing(1),
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: theme.spacing(2),
    },
    label: {
        marginRight: theme.spacing(2),
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#333',
    },
    switch: {
        alignSelf: 'center',
    },
    heading: {
        margin: theme.spacing(0, 0, 2),
        color: '#333',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    button: {
        marginBottom: theme.spacing(2),
    },
    dialog: {
        '& .MuiPaper-root': {
            borderRadius: theme.spacing(2),
        },
    },
    dialogTitle: {
        backgroundColor: '#f9f9f9',
        padding: theme.spacing(2),
        borderBottom: '1px solid #ccc',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        marginBottom: theme.spacing(2),
    },
    loanAmountContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loanAmountInput: {
        flexGrow: 1,
    },
    icon: {
        color: '#999',
    },
    paper: {
        padding: theme.spacing(3),
    },
}));
const LoanBox: React.FC<CheckboxProps> = ({label, checked, onChange, member}) => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [open, setOpen] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();
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
            RepaymentStatus: Yup.string()
                .required('Required')
                .oneOf(['Paid', 'Compromised', 'Pending', 'Overdue', 'Defaulted']),
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
        toast.info('Create New Loan');
    };

    const handleLoanAmountChange = (change: number) => {
        const newLoanAmount = formik.values.LoanAmount + change;
        formik.setFieldValue('LoanAmount', newLoanAmount < 1000 ? 1000 : newLoanAmount);
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
                />
            </div>


                {checked && (
                    <div>
                        <h4 className={classes.heading}>Loans {member.MemberID}</h4>

                        <Button variant="contained" color="primary" onClick={handleNewLoan} className={classes.button}>
                            Create New Loan
                        </Button>

                        <Dialog open={open} onClose={() => setOpen(false)} className={classes.dialog}>
                            <DialogTitle className={classes.dialogTitle}>Create New Loan</DialogTitle>
                            <DialogContent>
                                <form onSubmit={formik.handleSubmit} className={classes.form}>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <div className={classes.loanAmountContainer}>
                                            <IconButton onClick={() => handleLoanAmountChange(-100)}>
                                                <RemoveIcon className={classes.icon}/>
                                            </IconButton>
                                            <TextField
                                                id="LoanAmount"
                                                name="LoanAmount"
                                                label="Loan Amount"
                                                type="number"
                                                value={formik.values.LoanAmount}
                                                onChange={formik.handleChange}
                                                className={classes.loanAmountInput}
                                            />
                                            <IconButton onClick={() => handleLoanAmountChange(100)}>
                                                <AddIcon className={classes.icon}/>
                                            </IconButton>
                                        </div>
                                    </FormControl>

                                    <FormControl fullWidth className={classes.formControl}>
                                        <TextField
                                            id="StartDate"
                                            name="StartDate"
                                            label="Start Date"
                                            type="date"
                                            value={formik.values.StartDate}
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <TextField
                                            id="DueDate"
                                            name="DueDate"
                                            label="Due Date"
                                            type="date"
                                            value={formik.values.DueDate}
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.formControl}>
                                        <TextField
                                            id="Lender"
                                            name="Lender"
                                            label="Lender"
                                            type="text"
                                            value={formik.values.Lender}
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth className={classes.formControl}>
                                        <TextField
                                            id="LoanPurpose"
                                            name="LoanPurpose"
                                            label="Loan Purpose"
                                            type="text"
                                            value={formik.values.LoanPurpose}
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.formControl}>
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
};

export default LoanBox;