import React, {useEffect, useState} from 'react';
import {
    Dialog, DialogTitle, DialogContent, Switch,
    Box, Typography, Grid, CardContent, Card, IconButton, ThemeProvider
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {Member, Loan,} from '../../../../../../hooks/useMember';
import LoansTableComponent from './LoansTableComponent';
import {createLoan, deleteLoan, getLoansForMember, updateLoan} from '../../../../../../API/api';
import {toast} from 'react-toastify';
import LoanForm from "./LoanForm";
import {useLoanBoxStyles} from "./LoanBox.styles";
import {Divider, theme} from "antd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
    const classes = useLoanBoxStyles();
    const formik = useFormik({
        initialValues: {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            LoanAmount: 1000, // set initial value to 100
            StartDate: new Date().toISOString().slice(0, 10),
            DueDate: new Date().toISOString().slice(0, 10),
            InterestRate: 1,
            Lender: '',
            LoanPurpose: '',
            RepaymentStatus: 'Pending',
        },
        validationSchema: Yup.object({
            LoanAmount: Yup.number().required('مبلغ القرض مطلوب'),
            StartDate: Yup.date().required(' تاريخ البدء مطلوب'),
            DueDate: Yup.date().required(' تاريخ الاستحقاق مطلوب'),
            InterestRate: Yup.number().required('معدل الفائدة مطلوب'),
            Lender: Yup.string().required('المقرض مطلوب'),
            LoanPurpose: Yup.string().required('غرض القرض مطلوب'),
            RepaymentStatus: Yup.string()
                .required(' حالة السداد مطلوبة')
                .oneOf(['Paid', 'Compromised', 'Pending', 'Overdue', 'Defaulted']),
        }),
        onSubmit: (values) => {
            const loanData = {
                ...(editingLoan && {LoanID: editingLoan.LoanID}),
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
                if (editingLoan && editingLoan.LoanID === loanId) {
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
    useEffect(() => {
        getLoansForMember(member.MemberID)
            .then((loans) => {
                setLoans(loans);
            })
            .catch((error) => {
                enqueueSnackbar(`Failed to fetch loans: ${error.message}`, {variant: 'error'});
            });
    }, [member.MemberID, enqueueSnackbar]);

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
                                <Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <IconButton color="primary" onClick={handleNewLoan}>
                                                <AddCircleOutlineIcon/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Divider/>
                                    <Dialog open={open} onClose={() => setOpen(false)}>
                                        <DialogTitle>Create New Loan</DialogTitle>
                                        <DialogContent>
                                            <LoanForm
                                                formik={formik}
                                                handleLoanAmountChange={handleLoanAmountChange}
                                                setOpen={setOpen}/>
                                        </DialogContent>
                                    </Dialog>
                                    <LoansTableComponent loans={loans} handleUpdateLoan={handleUpdateLoan}
                                                         handleDeleteLoan={handleDeleteLoan}/>
                                </Box>
                            </>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            </ThemeProvider>
        );
    };

    export default LoanBox;
