import React, {useState} from 'react';
import {
    FormControlLabel, Dialog, DialogTitle, DialogContent, Switch, Button
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {Member, Loan, } from '../../../../../../hooks/useMember';
import LoansTableComponent from './LoansTableComponent';
import {createLoan, deleteLoan, updateLoan} from '../../../../../../API/api';
import {toast} from 'react-toastify';
import {LoanBoxStyles} from "./LoanBox.styles";
import LoanForm from "./LoanForm";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}


const LoanBox: React.FC<CheckboxProps> = ({label, checked, onChange, member}) => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [open, setOpen] = useState(false);
    const [editingLoan, setEditingLoan] = useState<Loan | null>(null);

    const {enqueueSnackbar} = useSnackbar();
    const classes = LoanBoxStyles();
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
                ...(editingLoan && { LoanID: editingLoan.LoanID }),
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
            const apiFunction = editingLoan ? updateLoan : createLoan;
            apiFunction(loanData)
                .then((updatedLoan) => {
                    if (editingLoan) {
                        setLoans(loans.map(l => l.LoanID === updatedLoan.LoanID ? updatedLoan : l));
                        enqueueSnackbar('Loan updated successfully', {variant: 'success'});
                        toast('Loan updated successfully')
                    } else {
                        setLoans([updatedLoan, ...loans]);
                        enqueueSnackbar('Loan created successfully', {variant: 'success'});
                        toast('Loan created successfully')
                    }
                    setOpen(false);
                    setEditingLoan(null);

                })
                .catch((error) => {
                    enqueueSnackbar(`Failed to ${editingLoan ? 'update' : 'create'} loan: ${error.message}`, {variant: 'error'});
                    toast(`Failed to ${editingLoan ? 'update' : 'create'} loan: ${error.message}`)
                });
        },
    });

    const handleNewLoan = () => {
        setOpen(true);
        setEditingLoan(null);
        toast.info('Create New Loan');
    };

    const handleUpdateLoan = async (LoanId: number, LoanData: Loan) => {
        setEditingLoan(LoanData);
        setOpen(true);
    };

    const handleDeleteLoan = (loanId: number) => {
        deleteLoan(loanId)
            .then(() => {
                setLoans(loans.filter(loan => loan.LoanID !== loanId));
                if(editingLoan && editingLoan.LoanID === loanId){
                    setOpen(false);
                    setEditingLoan(null);
                }
                toast.success('Loan deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete loan: ${error.message}`);
            });
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
                                <LoanForm
                                    formik={formik}
                                    handleLoanAmountChange={handleLoanAmountChange}
                                    setOpen={setOpen} />
                            </DialogContent>
                        </Dialog>
                        <LoansTableComponent loans={loans} handleUpdateLoan={handleUpdateLoan} handleDeleteLoan={handleDeleteLoan}/>
                    </div>
                )}
        </>
    );
};

export default LoanBox;
