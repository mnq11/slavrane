import React from 'react';
import {
    Checkbox, FormControlLabel, TextField, Button, Select, MenuItem,
    DialogActions, Grid, FormControl, InputLabel, Typography,
    Card, CardContent, Box, IconButton, Tooltip, FormHelperText
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CategoryIcon from '@material-ui/icons/Category';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MoneyIcon from '@material-ui/icons/Money';
import RepeatIcon from '@material-ui/icons/Repeat';
import InfoIcon from '@material-ui/icons/Info';
import {makeStyles} from "@material-ui/core/styles";

interface ExpenseFormProps {
    formik: any;
    categories: string[];
    mode: 'create' | 'update';
    handleCloseDialog: () => void;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    icon: {
        marginLeft: theme.spacing(1),
    },
    card: {
        padding: theme.spacing(2),
        margin: 'auto',
        borderRadius: 15,
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        transition: "0.3s",
    }, buttonIcon: {
        marginRight: theme.spacing(1),
        fontSize: 25,
        color: theme.palette.common.white,
        verticalAlign: 'middle',
    },
    button: {
        padding: theme.spacing(1, 2),
        textTransform: 'none',
        direction: 'rtl',
        fontSize: 16, // Increase the font size
        borderRadius: theme.shape.borderRadius, // Apply theme border radius
        width: '100%', // Full width button
    },
    cancelButton: {
        marginTop: theme.spacing(1), // Add some margin to the top
        marginBottom: theme.spacing(2), // Add some margin to the bottom
        backgroundColor: theme.palette.error.main, // Change the background color
        color: theme.palette.common.white, // Change the text color
        '&:hover': {
            backgroundColor: theme.palette.error.dark, // Change the background color on hover
        },
    },
    createButton: {
        marginTop: theme.spacing(2), // Add some margin to the top
    },
    dialogAction: {
        flexDirection: 'column', // Change direction to column
    },
    iconStyle: {
        verticalAlign: 'middle',
        paddingRight: theme.spacing(1),
        color: theme.palette.primary.main
    },
    infoButton: {
        marginRight: theme.spacing(1),
    }
}));

const ExpenseForm: React.FC<ExpenseFormProps> = ({formik, categories, mode, handleCloseDialog}) => {
    const classes = useStyles();
    const {
        handleChange,
        handleSubmit,
        values,
        touched,
        errors,
        isSubmitting,
        handleBlur
    } = formik;

    return (
        <form onSubmit={handleSubmit} dir="rtl">
            <DialogActions className={classes.dialogAction}>
                <Button
                    onClick={handleCloseDialog}
                    startIcon={<CloseIcon className={classes.buttonIcon}/>}
                    variant="contained"
                    className={`${classes.button} ${classes.cancelButton}`}
                >إلغاء</Button>
            </DialogActions>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6">نموذج النفقات</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl} fullWidth
                                         error={touched.Category && Boolean(errors.Category)}>
                                <InputLabel id="Category-label">
                                    <CategoryIcon className={classes.icon}/>الفئة
                                </InputLabel>
                                <Select
                                    id="Category"
                                    name="Category"
                                    value={values.Category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    ))}
                                </Select>
                                {touched.Category && errors.Category && (
                                    <FormHelperText>{errors.Category}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="Date"
                                name="Date"
                                label={
                                    <>
                                        <DateRangeIcon className={classes.iconStyle}/>
                                        التاريخ
                                    </>
                                }
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={values.Date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.Date && Boolean(errors.Date)}
                                helperText={touched.Date && errors.Date}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="Amount"
                                name="Amount"
                                label={<><MoneyIcon className={classes.icon}/>المبلغ</>}
                                type="number"
                                value={values.Amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.Amount && Boolean(errors.Amount)}
                                helperText={touched.Amount && errors.Amount}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.Recurring}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="Recurring"
                                            color="primary"
                                        />
                                    }
                                    label="متكرر"
                                />
                                <IconButton className={classes.infoButton} size="small">
                                    <Tooltip title="قم بالتحقق من هذا إذا كانت النفقة متكررة">
                                        <InfoIcon fontSize="small"/>
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl} fullWidth
                                         error={touched.Frequency && Boolean(errors.Frequency)}>
                                <InputLabel id="Frequency-label">
                                    <RepeatIcon className={classes.icon}/>التكرار
                                </InputLabel>
                                <Select
                                    id="Frequency"
                                    name="Frequency"
                                    value={values.Frequency}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value={'One-time'}>مرة واحدة</MenuItem>
                                    <MenuItem value={'Daily'}>يوميا</MenuItem>
                                    <MenuItem value={'Weekly'}>أسبوعي</MenuItem>
                                    <MenuItem value={'Monthly'}>شهريا</MenuItem>
                                    <MenuItem value={'Annual'}>سنويا</MenuItem>
                                </Select>

                                {touched.Frequency && errors.Frequency && (
                                    <FormHelperText>{errors.Frequency}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <DialogActions className={classes.dialogAction}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isSubmitting}
                            className={`${classes.button} ${classes.createButton}`}
                        >
                            {mode === 'create' ? 'إنشاء' : 'تحديث'}
                        </Button>
                    </DialogActions>
                </CardContent>
            </Card>
        </form>
    );
}

export default ExpenseForm;