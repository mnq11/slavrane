import React, {useState, useEffect} from 'react';
import {
    Dialog, DialogTitle,
    DialogContent, Switch,
    Grid, Box, IconButton, Card, CardContent, Typography, ThemeProvider
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Member, Income} from "../../../../../../hooks/useMember";
import IncomesTableComponent from "./IncomesTableComponent";
import {getIncomesForMember, createIncome, deleteIncome, updateIncome} from "../../../../../../API/api";
import {Divider, theme} from "antd";
import IncomeForm from "./IncomeForm";
import useLoanBoxStyles from "../Lone/LoanBox.styles";

interface SwitchProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const sources = [
    'الراتب الشهري', // Monthly Salary
    'العمل الحر', // Freelance Work
    'الممتلكات العقارية', // Real Estate Properties
    'الاستثمارات المالية', // Financial Investments
    'المشاريع الصغيرة', // Small Businesses
    'الأرباح السنوية', // Annual Profits
    'المعاش التقاعدي', // Pension
    'الدعم الحكومي', // Government Support
    'المساعدات الخارجية', // Foreign Aids
    'الإيرادات الأخرى' // Other Incomes
];

const IncomeBox: React.FC<SwitchProps> = ({label, checked, onChange, member}) => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [open, setOpen] = useState(false);
    const classes = useLoanBoxStyles();
    const [mode, setMode] = useState<'create' | 'update'>('create');
    const [updatingIncome, setUpdatingIncome] = useState<Income | null>(null);

    const validationSchema = Yup.object({
        Source: Yup.string().required('مطلوب'),
        Date: Yup.date().required('مطلوب'),
        Amount: Yup.number()
            .typeError('  يجب ان يكون رقما')
            .required('مطلوب'),
        Recurring: Yup.bool().required('مطلوب'),
        Frequency: Yup.string().required('مطلوب'),
    });

    const formik = useFormik({
        initialValues: {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            Source: sources[0],
            Date: new Date().toISOString().split('T')[0],
            Amount: 0,
            Recurring: false,
            Frequency: 'مرة واحدة',
        },
        validationSchema,
        onSubmit: (values) => {
            const incomeData: Income = {
                IncomeID: 0,
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                Source: values.Source,
                Amount: Number(values.Amount),
                Date: values.Date,
                Recurring: values.Recurring,
                Frequency: values.Frequency
            };

            if (mode === 'create') {
                createIncome(incomeData)
                    .then((newIncome) => {
                        newIncome.Date = newIncome.Date.split('T')[0];
                        setIncomes([newIncome, ...incomes]);
                        setOpen(false);
                        toast.success('تم إنشاء الدخل بنجاح');
                    })
                    .catch((error) => {
                        toast.error(`فشل في إنشاء الدخل: ${error.message}`);
                    });
            } else if (mode === 'update' && updatingIncome) {
                incomeData['IncomeID'] = updatingIncome.IncomeID; // make sure to pass IncomeID for update
                updateIncome(incomeData)
                    .then((updatedIncome) => {
                        const index = incomes.findIndex((inc) => inc.IncomeID === updatedIncome.IncomeID);
                        const newIncomes = [...incomes];
                        newIncomes[index] = updatedIncome;
                        setIncomes(newIncomes);
                        setOpen(false);
                        toast.success('تم تحديث الدخل بنجاح');
                    })
                    .catch((error) => {
                        // Revert the change in local state if update fails
                        const index = incomes.findIndex((inc) => inc.IncomeID === updatingIncome.IncomeID);
                        const newIncomes = [...incomes];
                        newIncomes[index] = incomes[index];
                        setIncomes(newIncomes);
                        toast.error(`فشل في تحديث الدخل: ${error.message}`);
                    });
            }
        },
    });

    useEffect(() => {
        if (checked) {
            getIncomesForMember(member.MemberID)
                .then(setIncomes)
                .catch((error) => {
                    toast.error(`فشل في جلب الدخل: ${error.message}`);
                });
        }
    }, [checked, member.MemberID]);

    const handleNewIncome = () => {
        setMode('create');
        setOpen(true);
        formik.resetForm();
        toast.info('إنشاء دخل جديد');
    };

    const handleUpdateIncome = (income: Income) => {
        setOpen(true);
        setMode('update');
        setUpdatingIncome(income);

        formik.setValues({
            FamilyID: member?.FamilyID || 0,
            MemberID: member?.MemberID || 0,
            Source: income.Source,
            Date: income.Date,
            Amount: income.Amount,
            Recurring: income.Recurring,
            Frequency: income.Frequency,
        });
    };

    const handleCloseDialog = () => {
        setOpen(false);
        toast.info('تم إلغاء إنشاء الدخل');
    };

    const handleDeleteIncome = (incomeId: number) => {
        const index = incomes.findIndex((income) => income.IncomeID === incomeId);
        if (index !== -1) {
            deleteIncome(incomeId)
                .then(() => {
                    const newIncomes = [...incomes];
                    newIncomes.splice(index, 1);
                    setIncomes(newIncomes);
                    toast.success('تم حذف الدخل بنجاح');
                })
                .catch((error) => {
                    toast.error(`فشل في حذف الدخل: ${error.message}`);
                });
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Box className={classes.switchBox}>
                                    <Typography variant="h5" dir="rtl">{label}</Typography>
                                    <Switch
                                        checked={checked}
                                        onChange={onChange}
                                        color="primary"
                                    />
                                </Box>
                                {checked && (
                                    <Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <IconButton color="primary" onClick={handleNewIncome}>
                                                <AddCircleOutlineIcon/>
                                            </IconButton>
                                        </Box>
                                        <Divider/>
                                        <IncomesTableComponent incomes={incomes} handleUpdateIncome={handleUpdateIncome}
                                                               handleDeleteIncome={handleDeleteIncome}/>
                                        <Dialog open={open} onClose={handleNewIncome}>
                                            <DialogTitle dir="rtl">{mode === 'create' ? 'إنشاء دخل جديد' : 'تحديث الدخل'}</DialogTitle>
                                            <DialogContent>
                                                <IncomeForm
                                                    formik={formik}
                                                    mode={mode}
                                                    handleCloseDialog={handleCloseDialog}
                                                    sources={sources}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default IncomeBox;
