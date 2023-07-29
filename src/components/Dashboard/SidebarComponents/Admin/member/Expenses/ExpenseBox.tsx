import React, {useState, useEffect} from 'react';
import {
    Dialog, DialogTitle,
    DialogContent, Switch,
    Grid, Box, IconButton, Card, CardContent, Typography
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Member, Expense} from "../../../../../../hooks/useMember";
import ExpensesTableComponent from "./ExpensesTableComponent";
import {getExpensesForMember, createExpense, deleteExpense, updateExpense} from "../../../../../../API/api";
import {Divider} from "antd";
import ExpenseForm from "./ExpenseForm";
import useLoanBoxStyles from "../Lone/LoanBox.styles";
import {format} from "date-fns-tz";

interface SwitchProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const categories = [
    'الطعام والبقالة', // Food and Groceries
    'فواتير الخدمات (كهرباء, ماء, غاز)', // Utility Bills (Electricity, Water, Gas)
    'الإيجار أو نفقات الإسكان', // Rent or Housing Expenses
    'رسوم التعليم', // Education Fees
    'الرعاية الصحية والنفقات الطبية', // Healthcare and Medical Expenses
    'تكاليف النقل', // Transportation Costs
    'الاتصالات (الإنترنت, الهاتف)', // Communication (Internet, Phone)
    'الملابس والعناية الشخصية', // Clothing and Personal Care
    'المستلزمات المنزلية', // Household Supplies
    'الصيانة والإصلاحات (المنزل, المركبات)', // Maintenance and Repairs (House, Vehicle)
    'تكاليف الوقود أو النقل العام', // Fuel or Public Transport Costs
    'الادخار والاستثمارات', // Savings and Investments
    'مدفوعات الدين', // Debt Payments
    'التأمين (الصحة, المنزل, المركبات)', // Insurance (Health, Home, Vehicle)
    'الترفيه والاستجمام', // Entertainment and Recreation
    'النفقات المتنوعة', // Miscellaneous Expenses
    'تكاليف رعاية الأطفال أو الكبار', // Child Care or Eldercare Costs
    'المناسبات الخاصة (أعياد الميلاد, المهرجانات)', // Special Occasions (Birthdays, Festivals)
    'السفر والعطلات', // Travel and Vacations
    'مساهمات الصندوق الطارئ' // Emergency Fund Contributions
];

const ExpenseBox: React.FC<SwitchProps> = ({label, checked, onChange, member}) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'create' | 'update'>('create');
    const [updatingExpense, setUpdatingExpense] = useState<Expense | null>(null);
    const classes = useLoanBoxStyles();

    const validationSchema = Yup.object({
        Category: Yup.string().required('مطلوب'), // Required
        Date: Yup.date().required('مطلوب'), // Required
        Amount: Yup.number()
            .typeError('يجب أن يكون المبلغ رقما') // Amount must be a number
            .required('مطلوب'), // Required
        Recurring: Yup.string().required('مطلوب'), // Required
        Frequency: Yup.string().required('مطلوب'), // Required
    });

    const formik = useFormik({
        initialValues: updatingExpense || {
            ExpenseID: 0,
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            Category: categories[0],
            Date: format(new Date(), 'yyyy-MM-dd'),
            Amount: 0,
            Recurring: false,
            Frequency: 'مرة واحدة',
        },
        enableReinitialize: true, // This is the important bit
        validationSchema,
        onSubmit: (values) => {
            const expenseData: Expense = {
                ExpenseID: 0,
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                Category: values.Category,
                Amount: Number(values.Amount),
                Date: values.Date,
                Recurring: values.Recurring,
                Frequency: values.Frequency
            };

            if (mode === 'create') {
                createExpense(expenseData)
                    .then((newExpense) => {
                        newExpense.Date = newExpense.Date.split('T')[0];
                        setExpenses([newExpense, ...expenses]);
                        setOpen(false);
                        toast.success('تم إنشاء النفقة بنجاح'); // Expense created successfully
                    })
                    .catch((error) => {
                        toast.error(`فشل في إنشاء النفقة: ${error.message}`); // Failed to create expense
                    });
            } else if (mode === 'update' && updatingExpense) {
                expenseData['ExpenseID'] = updatingExpense.ExpenseID; // make sure to pass ExpenseID for update
                updateExpense(expenseData)
                    .then((updatedExpense) => {
                        const index = expenses.findIndex((ex) => ex.ExpenseID === updatedExpense.ExpenseID);
                        const newExpenses = [...expenses];
                        newExpenses[index] = updatedExpense;
                        setExpenses(newExpenses);
                        setOpen(false);
                        toast.success('تم تحديث النفقة بنجاح'); // Expense updated successfully
                    })
                    .catch((error) => {
                        // Revert the change in local state if update fails
                        const index = expenses.findIndex((ex) => ex.ExpenseID === updatingExpense.ExpenseID);
                        const newExpenses = [...expenses];
                        newExpenses[index] = expenses[index];
                        setExpenses(newExpenses);
                        toast.error(`فشل في تحديث النفقة: ${error.message}`); // Failed to update expense
                    });
            }
        },
    });

    useEffect(() => {
        if (checked) {
            getExpensesForMember(member.MemberID)
                .then(setExpenses)
                .catch((error) => {
                    toast.error(`Failed to fetch expenses: ${error.message}`);
                });
        }
    }, [checked, member.MemberID]);

    const handleNewExpense = () => {
        setMode('create');
        setUpdatingExpense(null); // Add this line
        setOpen(true);
        formik.resetForm();
        toast.info('إنشاء نفقة جديدة');
    };

    const handleUpdateExpense = (expense: Expense) => {
        setOpen(true);
        setMode('update');
        setUpdatingExpense({...expense, Date: format(new Date(expense.Date), 'yyyy-MM-dd')});
    };

    const handleCloseDialog = () => {
        setOpen(false);
        toast.info('إغلاق النافذة');
    };


    const handleDeleteExpense = (expenseId: number) => {
        const index = expenses.findIndex((ex) => ex.ExpenseID === expenseId);
        const newExpenses = expenses.filter((_, idx) => idx !== index);
        setExpenses(newExpenses);

        deleteExpense(expenseId)
            .then(() => {
                toast.success('تم حذف النفقة بنجاح'); // Expense deleted successfully
            })
            .catch((error) => {
                // Add the expense back in local state if deletion fails
                newExpenses.splice(index, 0, expenses[index]);
                setExpenses(newExpenses);

                toast.error(`فشل في حذف النفقة: ${error.message}`); // Failed to delete expense
            });
    };


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
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
                                <Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <IconButton color="primary" onClick={handleNewExpense}>
                                            <AddCircleOutlineIcon/>
                                        </IconButton>
                                    </Box>
                                    <Divider/>
                                    <ExpensesTableComponent expenses={expenses} onUpdate={handleUpdateExpense}
                                                            onDelete={handleDeleteExpense}/>
                                    <Dialog open={open} onClose={handleCloseDialog}>
                                        <DialogTitle className={classes.dialogTitle}>{mode === 'create' ? 'أنشئ نفقة جديدة' : 'تحديث النفقات'}</DialogTitle>
                                        <DialogContent>
                                            <ExpenseForm
                                                formik={formik}
                                                categories={categories}
                                                mode={mode}
                                                handleCloseDialog={handleCloseDialog}
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
    );
}

export default ExpenseBox;
