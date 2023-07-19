import React from 'react';
import {
    TextField, FormControl, IconButton, InputLabel, Select, MenuItem,
    DialogActions, Button
} from '@material-ui/core';
import { FormikProps } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface LoanFormProps {
    formik: FormikProps<any>;
    handleLoanAmountChange: (amount: number) => void;
    setOpen: (open: boolean) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ formik, handleLoanAmountChange, setOpen }) => {

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
                <div>
                    <IconButton onClick={() => handleLoanAmountChange(-1000)}>
                        <RemoveIcon />
                    </IconButton>
                    <TextField
                        id="LoanAmount"
                        name="LoanAmount"
                        label="Loan Amount"
                        type="number"
                        value={formik.values.LoanAmount}
                        onChange={formik.handleChange}
                    />
                    <IconButton onClick={() => handleLoanAmountChange(1000)}>
                        <AddIcon />
                    </IconButton>
                </div>
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="StartDate"
                    name="StartDate"
                    label="Start Date"
                    type="date"
                    value={formik.values.StartDate}
                    onChange={formik.handleChange}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="DueDate"
                    name="DueDate"
                    label="Due Date"
                    type="date"
                    value={formik.values.DueDate}
                    onChange={formik.handleChange}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="Lender"
                    name="Lender"
                    label="Lender"
                    type="text"
                    value={formik.values.Lender}
                    onChange={formik.handleChange}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="LoanPurpose"
                    name="LoanPurpose"
                    label="Loan Purpose"
                    type="text"
                    value={formik.values.LoanPurpose}
                    onChange={formik.handleChange}
                />
            </FormControl>

            <FormControl fullWidth>
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
    );
};

export default LoanForm;
