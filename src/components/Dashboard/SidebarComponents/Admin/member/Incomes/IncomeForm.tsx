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
import { FormikProps } from 'formik';

interface IncomeFormProps {
    formik: FormikProps<any>;
    mode: 'create' | 'update';
    handleCloseDialog: () => void;
    sources: string[];
}

const IncomeForm: React.FC<IncomeFormProps> = ({ formik, mode, handleCloseDialog, sources }) => {
    const frequencies = ['One-time', 'Weekly', 'Monthly', 'Yearly'];

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="Source-label">Source</InputLabel>
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
                        label="Date"
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
                        label="Amount"
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
                        <InputLabel id="Frequency-label">Frequency</InputLabel>
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
                        label="Recurring"
                    />
                    {formik.touched.Recurring && formik.errors.Recurring ? (
                        <div>{String(formik.errors.Recurring)}</div>
                    ) : null}
                </Grid>
            </Grid>
            <DialogActions>
                <Button color="secondary" onClick={handleCloseDialog}>Cancel</Button>
                <Button color="primary" type="submit">{mode === 'create' ? 'Create' : 'Update'}</Button>
            </DialogActions>
        </form>
    );
}

export default IncomeForm;
