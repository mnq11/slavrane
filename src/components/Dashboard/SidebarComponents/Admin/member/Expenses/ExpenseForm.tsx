import React from 'react';
import {
    Checkbox, FormControlLabel, TextField, Button, Select, MenuItem,
    DialogActions
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";

interface ExpenseFormProps {
    formik: any;
    categories: string[];
    mode: 'create' | 'update';
    handleCloseDialog: () => void;
}


const useStyles = makeStyles((theme) => ({
    dialogAction: {
        justifyContent: 'space-around',
    },
}));

const ExpenseForm: React.FC<ExpenseFormProps> = ({formik, categories, mode, handleCloseDialog}) => {
    const classes = useStyles();

    return (
        <form onSubmit={formik.handleSubmit}>
            <Select
                fullWidth
                id="Category"
                name="Category"
                value={formik.values.Category}
                onChange={formik.handleChange}
                error={formik.touched.Category && Boolean(formik.errors.Category)}
            >
                {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
            </Select>
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
                type="number"
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
                <MenuItem value={'One-time'}>One-time</MenuItem>
                <MenuItem value={'Daily'}>Daily</MenuItem>
                <MenuItem value={'Weekly'}>Weekly</MenuItem>
                <MenuItem value={'Monthly'}>Monthly</MenuItem>
                <MenuItem value={'Annual'}>Annual</MenuItem>
            </Select>
            <DialogActions className={classes.dialogAction}>
                <Button
                    onClick={handleCloseDialog}
                    color="primary"
                    startIcon={<CloseIcon/>}
                >
                    Cancel
                </Button>
                <Button type="submit" color="primary" startIcon={<SaveIcon/>}>
                    {mode === 'create' ? 'Create' : 'Update'}
                </Button>
            </DialogActions>
        </form>
    );
}

export default ExpenseForm;
