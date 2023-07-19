import React from 'react';
import {
    Checkbox, FormControlLabel, TextField, Button, Select, MenuItem,
    DialogActions, Grid, FormControl, InputLabel, Icon, Typography,
    Card, CardContent, Box, IconButton, Tooltip
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
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
    dialogAction: {
        justifyContent: 'space-around',
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    card: {
        padding: theme.spacing(2),
        margin: 'auto',
        borderRadius: 15,
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        transition: "0.3s",
    },
    infoButton: {
        marginLeft: theme.spacing(1),
    }
}));

const ExpenseForm: React.FC<ExpenseFormProps> = ({formik, categories, mode, handleCloseDialog}) => {
    const classes = useStyles();

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Expense Form</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl} fullWidth error={formik.touched.Category && Boolean(formik.errors.Category)}>
                                <InputLabel id="Category-label">
                                    <Icon className={classes.icon}><CategoryIcon /></Icon>
                                    Category
                                </InputLabel>
                                <Select
                                    id="Category"
                                    name="Category"
                                    value={formik.values.Category}
                                    onChange={formik.handleChange}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="Date"
                                name="Date"
                                label={<><DateRangeIcon className={classes.icon} />Date</>}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.Date}
                                onChange={formik.handleChange}
                                error={formik.touched.Date && Boolean(formik.errors.Date)}
                                helperText={formik.touched.Date && formik.errors.Date}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="Amount"
                                name="Amount"
                                label={<><MoneyIcon className={classes.icon} />Amount</>}
                                type="number"
                                value={formik.values.Amount}
                                onChange={formik.handleChange}
                                error={formik.touched.Amount && Boolean(formik.errors.Amount)}
                                helperText={formik.touched.Amount && formik.errors.Amount}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
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
                                <IconButton className={classes.infoButton} size="small">
                                    <Tooltip title="Check this if the expense is recurring">
                                        <InfoIcon fontSize="small" />
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl} fullWidth error={formik.touched.Frequency && Boolean(formik.errors.Frequency)}>
                                <InputLabel id="Frequency-label">
                                    <Icon className={classes.icon}><RepeatIcon /></Icon>
                                    Frequency
                                </InputLabel>
                                <Select
                                    id="Frequency"
                                    name="Frequency"
                                    value={formik.values.Frequency}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value={'One-time'}>One-time</MenuItem>
                                    <MenuItem value={'Daily'}>Daily</MenuItem>
                                    <MenuItem value={'Weekly'}>Weekly</MenuItem>
                                    <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                    <MenuItem value={'Annual'}>Annual</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <DialogActions className={classes.dialogAction}>
                        <Button
                            onClick={handleCloseDialog}
                            color="primary"
                            startIcon={<CloseIcon/>}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" startIcon={<SaveIcon/>} variant="contained">
                            {mode === 'create' ? 'Create' : 'Update'}
                        </Button>
                    </DialogActions>
                </CardContent>
            </Card>
        </form>
    );
}

export default ExpenseForm;
