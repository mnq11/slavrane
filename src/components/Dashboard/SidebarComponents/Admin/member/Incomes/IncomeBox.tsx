import React, { useState, useEffect } from 'react';
import {
    Checkbox, FormControlLabel, Dialog, DialogTitle,
    DialogContent, TextField, DialogActions, Button, Select, MenuItem, Switch,
    Grid, Paper, Box, IconButton, FormHelperText, FormControl, InputLabel
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { Member, Income } from "../../../../../../hooks/useMember";
import IncomesTableComponent from "./IncomesTableComponent";
import {getIncomesForMember, createIncome, deleteIncome, updateIncome} from "../../../../../../API/api";
import {IncomeStyles} from "./Incom.styles";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}
const incomeSources = ['Job', 'Business', 'Investment', 'Other'];

const IncomeBox: React.FC<CheckboxProps> = ({ label, checked, onChange, member }) => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [open, setOpen] = useState(false);
    const [editingIncome, setEditingIncome] = useState<Income | null>(null);

    const classes = IncomeStyles();

    const validationSchema = Yup.object({
        Source: Yup.string().required('Required'),
        Date: Yup.date().required('Required'),
        Amount: Yup.number().typeError('Amount must be a number').required('Required'),
        Recurring: Yup.string().required('Required'),
        Frequency: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: editingIncome || {
            FamilyID: member.FamilyID,
            MemberID: member.MemberID,
            Source: 'Default Source',
            Date: new Date().toISOString().split('T')[0],
            Amount: 0,
            Recurring: 'false',
            Frequency: 'One-time',
        },
        validationSchema,
        onSubmit: (values) => {
            const incomeData: Income = {
                IncomeID: editingIncome ? editingIncome.IncomeID : undefined,
                FamilyID: member.FamilyID,
                MemberID: member.MemberID,
                Source: values.Source,
                Amount: values.Amount,
                Date: values.Date,
                Recurring: values.Recurring,
                Frequency: values.Frequency,

            };

            if (editingIncome) {
                updateIncome(incomeData)
                    .then((updatedIncome) => {
                        setIncomes(incomes.map(income => income.IncomeID === editingIncome!.IncomeID ? updatedIncome : income));
                        setOpen(false);
                        setEditingIncome(null); // clear the editing income
                        toast.success('Income updated successfully');
                    })
                    .catch((error) => {
                        toast.error(`Failed to update income: ${error.message}`);
                    });
            } else {
                createIncome(incomeData)
                    .then((newIncome) => {
                        newIncome.Date = newIncome.Date.split('T')[0];
                        setIncomes([newIncome, ...incomes]);
                        setOpen(false);
                        toast.success('Income created successfully');
                    })
                    .catch((error) => {
                        toast.error(`Failed to create income: ${error.message}`);
                    });
            }
        },
    });


    useEffect(() => {
        if (checked) {
            getIncomesForMember(member.MemberID)
                .then((incomes) => {
                    setIncomes(incomes);
                })
                .catch((error) => {
                    toast.error(`Failed to fetch incomes: ${error.message}`);
                });
        }
    }, [checked, member.MemberID]);

    const handleNewIncome = () => {
        setOpen(true);
        toast.info('Creating a new income');
    };
    const handleDeleteIncome = (incomeId: number) => {
        deleteIncome(incomeId)
            .then(() => {
                setIncomes(incomes.filter(income => income.IncomeID !== incomeId));
                if(editingIncome && editingIncome.IncomeID === incomeId){
                    setOpen(false);
                    setEditingIncome(null); // clear the editing income
                }
                toast.success('Income deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete income: ${error.message}`);
            });
    };

    const handleUpdateIncome = async (incomeId: number, incomeData: Income) => {
        setEditingIncome(incomeData);
        setOpen(true);
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
                                <h4>Incomes {member.MemberName}</h4>
                                <IconButton color="primary" onClick={handleNewIncome}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Box>

                            <Dialog open={open} onClose={() => {
                                setOpen(false);
                                toast.info('Income creation cancelled');
                            }}>
                                <DialogTitle>Create New Income</DialogTitle>
                                <DialogContent>
                                    <form onSubmit={formik.handleSubmit}>
                                        <FormControl variant="filled" fullWidth>
                                            <InputLabel id="Source-label">Source</InputLabel>
                                            <Select
                                                labelId="Source-label"
                                                id="Source"
                                                name="Source"
                                                value={formik.values.Source}
                                                onChange={formik.handleChange}
                                                error={formik.touched.Source && Boolean(formik.errors.Source)}
                                            >
                                                {incomeSources.map((source, index) => (
                                                    <MenuItem value={source} key={index}>
                                                        {source}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {formik.touched.Source && formik.errors.Source ? (
                                                <FormHelperText>{formik.errors.Source}</FormHelperText>
                                            ) : null}
                                        </FormControl>

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
                                                    checked={formik.values.Recurring === 'true'}
                                                    onChange={(event) => {
                                                        formik.setFieldValue("Recurring", event.target.checked ? 'true' : 'false');
                                                    }}
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
                                        {formik.touched.Frequency && formik.errors.Frequency ? (
                                            <div>{formik.errors.Frequency}</div>
                                        ) : null}
                                        <DialogActions className={classes.dialogAction}>
                                            <IconButton color="primary" onClick={() => {
                                                setOpen(false);
                                                toast.info('Income creation cancelled');
                                            }}>
                                                <CloseIcon />
                                            </IconButton>
                                            <Button type="submit" color="primary" startIcon={<SaveIcon />}>
                                                Save
                                            </Button>
                                        </DialogActions>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <IncomesTableComponent incomes={incomes} handleUpdateIncome={handleUpdateIncome} handleDeleteIncome={handleDeleteIncome} />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default IncomeBox;
