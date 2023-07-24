import React from 'react';
import {
    DialogActions,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormikProps } from 'formik';

interface IncomeFormProps {
    formik: FormikProps<any>;
    mode: 'create' | 'update';
    handleCloseDialog: () => void;
    sources: string[];
}

const useStyles = makeStyles({
    root: {
        direction: 'rtl',
    },
});

const IncomeForm: React.FC<IncomeFormProps> = ({ formik, mode, handleCloseDialog, sources }) => {
    const classes = useStyles();
    const frequencies = ['مرة واحدة', 'أسبوعي', 'شهري', 'سنوي'];

    return (
        <form onSubmit={formik.handleSubmit} className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="Source-label">المصدر</InputLabel>
                        <Select
                            labelId="Source-label"
                            id="Source"
                            name="Source"
                            value={formik.values.Source}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {sources.map((source, index) => (
                                <MenuItem key={index} value={source}>{source}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="date"
                        label="التاريخ"
                        type="date"
                        name="Date"
                        value={formik.values.Date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="Amount"
                        label="المبلغ"
                        type="number"
                        value={formik.values.Amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Amount && !!formik.errors.Amount}
                        helperText={formik.touched.Amount && formik.errors.Amount ? String(formik.errors.Amount) : ''}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="Frequency-label">التكرار</InputLabel>
                        <Select
                            labelId="Frequency-label"
                            id="Frequency"
                            name="Frequency"
                            value={formik.values.Frequency}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {frequencies.map((frequency, index) => (
                                <MenuItem key={index} value={frequency}>{frequency}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="Recurring"
                                color="primary"
                                checked={formik.values.Recurring}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        }
                        label="متكرر"
                    />
                    {formik.touched.Recurring && formik.errors.Recurring ? (
                        <div>{String(formik.errors.Recurring)}</div>
                    ) : null}
                </Grid>
            </Grid>
            <DialogActions>
                <Button color="secondary" onClick={handleCloseDialog}>إلغاء</Button>
                <Button color="primary" type="submit">{mode === 'create' ? 'إنشاء' : 'تحديث'}</Button>
            </DialogActions>
        </form>
    );
}

export default IncomeForm;
