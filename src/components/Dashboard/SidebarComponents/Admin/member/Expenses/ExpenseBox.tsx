// ExpenseBox.tsx
import React, {useState, useEffect} from 'react';
import {
    Checkbox, FormControlLabel, Dialog, DialogTitle,
    DialogContent, TextField, DialogActions, Button, Select, MenuItem
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Member, Expense} from "../../../../../../hooks/useMember";
import ExpensesTableComponent from "./ExpensesTableComponent";
import {getExpensesForMember, createExpense} from "../../../../../../API/api";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const ExpenseBox: React.FC<CheckboxProps> = ({label, checked, onChange, member}) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [open, setOpen] = useState(false);

    const validationSchema = Yup.object({
        Category: Yup.string().required("Required"),
        Date: Yup.date().required("Required"),
        Amount: Yup.number().required("Required"),
        Recurring: Yup.boolean(),
        Frequency: Yup.string().required("Required")
    });

    const formik = useFormik({
        initialValues: {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            Category: 'Default Category',
            Date: new Date().toISOString().split('T')[0],
            Amount: '0',
            Recurring: false,
            Frequency: 'One-time'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const expenseData = {
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                Category: values.Category,
                Amount: values.Amount,
                Date: values.Date,
                Recurring: values.Recurring,
                Frequency: values.Frequency
            };
            createExpense(expenseData)
                .then(newExpense => {
                    newExpense.Date = newExpense.Date.split('T')[0];
                    setExpenses([newExpense, ...expenses]);
                    setOpen(false);
                    toast.success('Expense created successfully');
                })
                .catch(error => {
                    toast.error('Failed to create expense: ' + error.message);
                });

        },
    });

    useEffect(() => {
        if (checked) {
            getExpensesForMember(member.MemberID)
                .then(expenses => {
                    setExpenses(expenses);
                })
                .catch(error => {
                    toast.error('Failed to fetch expenses: ' + error.message);
                });
        }
    }, [checked, member.MemberID]);

    const handleNewExpense = () => {
        setOpen(true);
        toast.info('Creating a new expense');
    }


    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        color="primary"
                    />
                }
                label={label}
            />
            {checked && (
                <div>
                    <h4>Expenses {member.MemberID}</h4>

                    <Button variant="contained" color="primary" onClick={handleNewExpense}>Create New Expense</Button>

                    <Dialog open={open} onClose={() => {
                        setOpen(false);
                        toast.info('Expense creation cancelled');
                    }}>
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
                                            checked={formik.values.Recurring}
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
                                    <MenuItem value={"One-time"}>One-time</MenuItem>
                                    <MenuItem value={"Daily"}>Daily</MenuItem>
                                    <MenuItem value={"Weekly"}>Weekly</MenuItem>
                                    <MenuItem value={"Monthly"}>Monthly</MenuItem>
                                    <MenuItem value={"Annual"}>Annual</MenuItem>
                                </Select>
                                <DialogActions>
                                    <Button onClick={() => {
                                        setOpen(false);
                                        toast.info('Expense creation cancelled');
                                    }} color="primary">Cancel</Button>
                                    <Button type="submit" color="primary">Save</Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <ExpensesTableComponent expenses={expenses}/>
                </div>
            )}
        </>
    );
};

export default ExpenseBox;
