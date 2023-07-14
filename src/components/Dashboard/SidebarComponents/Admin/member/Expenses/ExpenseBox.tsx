import React, { useState, useEffect } from 'react';
import {
    Checkbox, FormControlLabel, Dialog, DialogTitle,
    DialogContent, TextField, DialogActions, Button, Select, MenuItem, Switch,
    Grid, Paper, Box, IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { Member, Expense } from "../../../../../../hooks/useMember";
import ExpensesTableComponent from "./ExpensesTableComponent";
import {getExpensesForMember, createExpense, deleteExpense, updateExpense} from "../../../../../../API/api";

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
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    },
    switch: {
        alignSelf: 'center',
    },
    label: {
        marginLeft: theme.spacing(1),
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#333',
    },
    dialogAction: {
        justifyContent: 'center',
    },
}));

const ExpenseBox: React.FC<SwitchProps> = ({ label, checked, onChange, member }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const validationSchema = Yup.object({
        Category: Yup.string().required('Required'),
        Date: Yup.date().required('Required'),
        Amount: Yup.string().required('Required'),
        Recurring: Yup.string().required('Required'),
        Frequency: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            Category: 'Default Category',
            Date: new Date().toISOString().split('T')[0],
            Amount: '0',
            Recurring: 'false',
            Frequency: 'One-time',
        },
        validationSchema,
        onSubmit: (values) => {
            const expenseData = {
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                Category: values.Category,
                Amount: values.Amount,
                Date: values.Date,
                Recurring: values.Recurring,
                Frequency: values.Frequency,
            };

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
        setOpen(true);
        toast.info('Creating a new expense');
    };
    const handleUpdateExpense = (expense: Expense ) => {
        updateExpense(expense)
            .then((updatedExpense) => {
                // update the local state or fetch expenses again here
                toast.success('Expense updated successfully');
            })
            .catch((error) => {
                toast.error(`Failed to update expense: ${error.message}`);
            });
    };

    const handleDeleteExpense = (expenseId: number) => {
        deleteExpense(expenseId)
            .then(() => {
                // update the local state or fetch expenses again here
                toast.success('Expense deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete expense: ${error.message}`);
            });
    };


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
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
                    </Paper>
                </Grid>
                {checked && (
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <h4>Expenses {member.MemberName}</h4>
                                <IconButton color="primary" onClick={handleNewExpense}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Box>

                            <Dialog open={open} onClose={handleNewExpense}>
                                <DialogTitle>Create New Expense</DialogTitle>
                                <DialogContent>
                                    <form onSubmit={formik.handleSubmit}>
                                        <TextField
                                            fullWidth
                                            id="Category"
                                            name="Category"
                                            label="Category"
                                            value={formik.values.Category}
                                            onChange={formik.handleChange}
                                            error={formik.touched.Category && Boolean(formik.errors.Category)}
                                            helperText={formik.touched.Category && formik.errors.Category}
                                        />
                                        <TextField
                                            fullWidth
                                            id="Date"
                                            name="Date"
                                            label="Date"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={formik.values.Date}
                                            onChange={formik.handleChange}
                                            error={formik.touched.Date && Boolean(formik.errors.Date)}
                                            helperText={formik.touched.Date && formik.errors.Date}
                                        />
                                        <TextField
                                            fullWidth
                                            id="Amount"
                                            name="Amount"
                                            label="Amount"
                                            value={formik.values.Amount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.Amount && Boolean(formik.errors.Amount)}
                                            helperText={formik.touched.Amount && formik.errors.Amount}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formik.values.Recurring === 'true'}
                                                    onChange={formik.handleChange}
                                                    name="Recurring"
                                                    color="primary"
                                                />
                                            }
                                            label="Recurring"
                                        />
                                        <Select
                                            fullWidth
                                            id="Frequency"
                                            name="Frequency"
                                            value={formik.values.Frequency}
                                            onChange={formik.handleChange}
                                            error={formik.touched.Frequency && Boolean(formik.errors.Frequency)}
                                        >
                                            <MenuItem value={'One-time'}>One-time</MenuItem>
                                            <MenuItem value={'Daily'}>Daily</MenuItem>
                                            <MenuItem value={'Weekly'}>Weekly</MenuItem>
                                            <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                            <MenuItem value={'Annual'}>Annual</MenuItem>
                                        </Select>
                                        <DialogActions className={classes.dialogAction}>
                                            <Button
                                                onClick={() => {
                                                    setOpen(false);
                                                    toast.info('Expense creation cancelled');
                                                }}
                                                color="primary"
                                                startIcon={<CloseIcon />}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" color="primary" startIcon={<SaveIcon />}>
                                                Save
                                            </Button>
                                        </DialogActions>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <ExpensesTableComponent expenses={expenses} onUpdate={handleUpdateExpense} onDelete={handleDeleteExpense} />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default ExpenseBox;
