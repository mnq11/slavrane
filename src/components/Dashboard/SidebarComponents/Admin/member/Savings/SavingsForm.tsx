import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    FormControl, FormHelperText, TextField
} from '@material-ui/core';

interface SavingsDialogProps {
    open: boolean;
    handleClose: () => void;
    formik: any;
    isUpdating: boolean;
}

export const SavingsForm: React.FC<SavingsDialogProps> = ({ open, handleClose, formik, isUpdating }) => {
    const title = isUpdating ? 'تحديث التوفير' : 'إنشاء توفير'; // Title in Arabic

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle dir="rtl">{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth error={formik.touched.Amount && Boolean(formik.errors.Amount)}>
                        <TextField
                            id="Amount"
                            name="Amount"
                            label="المبلغ"
                            type="number"
                            value={formik.values.Amount}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.Amount && formik.errors.Amount && (
                            <FormHelperText>{formik.errors.Amount}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={formik.touched.Date && Boolean(formik.errors.Date)}>
                        <TextField
                            id="Date"
                            name="Date"
                            label="التاريخ"
                            type="date"
                            value={formik.values.Date}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.Date && formik.errors.Date && (
                            <FormHelperText>{formik.errors.Date}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={formik.touched.SavingsGoal && Boolean(formik.errors.SavingsGoal)}>
                        <TextField
                            id="SavingsGoal"
                            name="SavingsGoal"
                            label="هدف التوفير"
                            type="number"
                            value={formik.values.SavingsGoal}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.SavingsGoal && formik.errors.SavingsGoal && (
                            <FormHelperText>{formik.errors.SavingsGoal}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={formik.touched.TargetDate && Boolean(formik.errors.TargetDate)}>
                        <TextField
                            id="TargetDate"
                            name="TargetDate"
                            label="تاريخ الهدف"
                            type="date"
                            value={formik.values.TargetDate}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.TargetDate && formik.errors.TargetDate && (
                            <FormHelperText>{formik.errors.TargetDate}</FormHelperText>
                        )}
                    </FormControl>

                    <DialogActions>
                        <Button color="primary" type="submit">
                            حفظ
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            إلغاء
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default SavingsForm;
