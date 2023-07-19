import React, {useState, useEffect} from 'react';
import {
    Dialog, DialogTitle,
    DialogContent, Switch,
    Grid, Box, IconButton, Card, CardContent, Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
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

interface SwitchProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginBottom: theme.spacing(2),
    },
    switchBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    dialogAction: {
        justifyContent: 'space-around',
    },
}));
const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 8', 'Category 9', 'Category 10'];

const ExpenseBox: React.FC<SwitchProps> = ({label, checked, onChange, member}) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [mode, setMode] = useState<'create' | 'update'>('create');
    const [updatingExpense, setUpdatingExpense] = useState<Expense | null>(null);

    const validationSchema = Yup.object({
        Category: Yup.string().required('Required'),
        Date: Yup.date().required('Required'),
        Amount: Yup.number()
            .typeError('Amount must be a number') // This is a custom error message
            .required('Required'),
        Recurring: Yup.string().required('Required'),
        Frequency: Yup.string().required('Required'),
    });


    const formik = useFormik({
        initialValues: {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            Category: categories[0],
            Date: new Date().toISOString().split('T')[0],
            Amount: 0,
            Recurring: false,
            Frequency: 'One-time',
        },
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
                        toast.success('Expense created successfully');
                    })
                    .catch((error) => {
                        toast.error(`Failed to create expense: ${error.message}`);
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
                        toast.success('Expense updated successfully');
                    })
                    .catch((error) => {
                        // Revert the change in local state if update fails
                        const index = expenses.findIndex((ex) => ex.ExpenseID === updatingExpense.ExpenseID);
                        const newExpenses = [...expenses];
                        newExpenses[index] = expenses[index];
                        setExpenses(newExpenses);
                        toast.error(`Failed to update expense: ${error.message}`);
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
        setOpen(true);
        formik.resetForm();
        toast.info('Creating a new expense');
    };

    const handleUpdateExpense = (expense: Expense) => {
        setOpen(true);
        setMode('update');
        setUpdatingExpense(expense);

        formik.setValues({
            FamilyID: member?.FamilyID || 0,
            MemberID: member?.MemberID || 0,
            Category: expense.Category,
            Date: expense.Date,
            Amount: expense.Amount,
            Recurring: expense.Recurring,
            Frequency: expense.Frequency,
        });
    };
    const handleCloseDialog = () => {
        setOpen(false);
        toast.info('Expense creation cancelled');
    };


    const handleDeleteExpense = (expenseId: number) => {
        const index = expenses.findIndex((ex) => ex.ExpenseID === expenseId);
        const newExpenses = expenses.filter((_, idx) => idx !== index);
        setExpenses(newExpenses);

        deleteExpense(expenseId)
            .then(() => {
                toast.success('Expense deleted successfully');
            })
            .catch((error) => {
                // Add the expense back in local state if deletion fails
                newExpenses.splice(index, 0, expenses[index]);
                setExpenses(newExpenses);

                toast.error(`Failed to delete expense: ${error.message}`);
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
                                    <Dialog open={open} onClose={handleNewExpense}>
                                        <DialogTitle>{mode === 'create' ? 'Create New Expense' : 'Update Expense'}</DialogTitle>
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
