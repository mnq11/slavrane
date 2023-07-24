import React from 'react';
import {
    TextField,
    FormControl,
    IconButton,
    InputLabel,
    Select,
    MenuItem,
    DialogActions,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
    Input,
    InputAdornment,
    ThemeProvider,
    makeStyles,
    FormHelperText
} from '@material-ui/core';
import { FormikProps } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { createMuiTheme } from '@material-ui/core/styles';

interface LoanFormProps {
    formik: FormikProps<any>;
    handleLoanAmountChange: (amount: number) => void;
    setOpen: (open: boolean) => void;
}

const theme = createMuiTheme({
    direction: 'rtl', // Both here
    typography: {
        fontFamily: 'Tahoma',
        fontSize: 14,
    }
});

const useStyles = makeStyles({
    input: {
        direction: 'rtl',
    },
});

const LoanForm: React.FC<LoanFormProps> = ({ formik, handleLoanAmountChange, setOpen }) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={formik.handleSubmit}>
                <Card>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" dir="rtl">نموذج القرض</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={formik.touched.LoanAmount && Boolean(formik.errors.LoanAmount)}>
                                    <InputLabel htmlFor="LoanAmount">مبلغ القرض</InputLabel>
                                    <Input
                                        id="LoanAmount"
                                        name="LoanAmount"
                                        type="number"
                                        value={formik.values.LoanAmount}
                                        onChange={formik.handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => handleLoanAmountChange(1000)}>
                                                    <AddIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleLoanAmountChange(-1000)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        className={classes.input}
                                    />
                                    {formik.touched.LoanAmount && formik.errors.LoanAmount &&
                                        <FormHelperText>{String(formik.errors.LoanAmount)}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={formik.touched.StartDate && Boolean(formik.errors.StartDate)}>
                                    <TextField
                                        id="StartDate"
                                        name="StartDate"
                                        label="تاريخ البداية"
                                        type="date"
                                        value={formik.values.StartDate}
                                        onChange={formik.handleChange}
                                        className={classes.input}
                                    />
                                    {formik.touched.StartDate && formik.errors.StartDate &&
                                        <FormHelperText>{String(formik.errors.StartDate)}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="DueDate"
                                        name="DueDate"
                                        label="تاريخ الاستحقاق"
                                        type="date"
                                        value={formik.values.DueDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.DueDate && Boolean(formik.errors.DueDate)}
                                        helperText={formik.touched.DueDate && String(formik.errors.DueDate)}
                                        className={classes.input}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="Lender"
                                        name="Lender"
                                        label="المقرض"
                                        type="text"
                                        value={formik.values.Lender}
                                        onChange={formik.handleChange}
                                        error={formik.touched.Lender && Boolean(formik.errors.Lender)}
                                        helperText={formik.touched.Lender && String(formik.errors.Lender)}
                                        className={classes.input}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="LoanPurpose"
                                        name="LoanPurpose"
                                        label="غرض القرض"
                                        type="text"
                                        value={formik.values.LoanPurpose}
                                        onChange={formik.handleChange}
                                        error={formik.touched.LoanPurpose && Boolean(formik.errors.LoanPurpose)}
                                        helperText={formik.touched.LoanPurpose && String(formik.errors.LoanPurpose)}
                                        className={classes.input}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="RepaymentStatus-label">حالة السداد</InputLabel>
                                    <Select
                                        labelId="RepaymentStatus-label"
                                        id="RepaymentStatus"
                                        name="RepaymentStatus"
                                        value={formik.values.RepaymentStatus}
                                        onChange={formik.handleChange}
                                        error={formik.touched.RepaymentStatus && Boolean(formik.errors.RepaymentStatus)}
                                        className={classes.input}
                                    >
                                        <MenuItem value="Paid">مدفوع</MenuItem>
                                        <MenuItem value="Compromised">معرض للخطر</MenuItem>
                                        <MenuItem value="Pending">قيد الانتظار</MenuItem>
                                        <MenuItem value="Overdue">متأخر</MenuItem>
                                        <MenuItem value="Defaulted">تسوية</MenuItem>
                                    </Select>
                                    {formik.touched.RepaymentStatus && formik.errors.RepaymentStatus &&
                                        <FormHelperText>{String(formik.errors.RepaymentStatus)}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <DialogActions>
                                    <Button color="primary" type="submit">
                                        حفظ
                                    </Button>
                                    <Button onClick={() => setOpen(false)} color="primary">
                                        إلغاء
                                    </Button>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </ThemeProvider>
    );
}

export default LoanForm;
