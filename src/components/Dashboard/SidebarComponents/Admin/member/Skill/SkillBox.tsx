import React, {useState, useEffect} from 'react';
import {
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button, Switch, Select, FormControl, InputLabel, MenuItem, FormHelperText,
} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {Skill, Member} from '../../../../../../hooks/useMember';
import SkillsTableComponent from './SkillsTableComponent';
import {getSkillsForMember, createSkill, deleteSkill, updateSkill} from '../../../../../../API/api';
import {toast} from "react-toastify";
import {useSliderSwitchStyles} from "../Lone/LoanBox.styles";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const SkillBox: React.FC<CheckboxProps> = ({label, checked, onChange, member}) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [open, setOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

    const {enqueueSnackbar} = useSnackbar();
    const classes = useSliderSwitchStyles();

    const validationSchema = Yup.object({
        SkillName: Yup.string().required('Required'),
        SkillLevel: Yup.string().required('Required'),
        DateAcquired: Yup.date().required('Required'),
        Certification: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            SkillID: 0,
            MemberID: member.MemberID,
            SkillName: 'Default Skill Name',
            SkillLevel: 1,
            DateAcquired: new Date().toISOString().split('T')[0], // This will set today's date as the default
            Certification: 'Default Certification',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const skillData = {
                MemberID: member.MemberID,
                SkillName: values.SkillName,
                SkillLevel: values.SkillLevel,
                DateAcquired: values.DateAcquired,
                Certification: values.Certification,
            };

            if (editingSkill) {
                updateSkill({...skillData, SkillID: values.SkillID})
                    .then((updatedSkill) => {
                        setSkills(skills.map(skill => skill.SkillID === updatedSkill.SkillID ? updatedSkill : skill));
                        setOpen(false);
                        setEditingSkill(null);
                        enqueueSnackbar('Skill updated successfully', {variant: 'success'});
                        toast.success('Skill updated successfully');
                    })
                    .catch((error) => {
                        enqueueSnackbar('Failed to update skill: ' + error.message, {variant: 'error'});
                        toast.error('Failed to update skill: ' + error.message);
                    });
            } else {
                createSkill(skillData)
                    .then((newSkill) => {
                        setSkills([newSkill, ...skills]);
                        setOpen(false);
                        setEditingSkill(null);
                        enqueueSnackbar('Skill created successfully', {variant: 'success'});
                        toast.success('Skill created successfully');

                    })
                    .catch((error) => {
                        enqueueSnackbar('Failed to create skill: ' + error.message, {variant: 'error'});
                        toast.error('Failed to create skill: ' + error.message);
                    });
            }
        },
    });
    useEffect(() => {
        if (checked) {
            getSkillsForMember(member.MemberID)
                .then((skills) => setSkills(skills))
                .catch((error) => {
                    enqueueSnackbar('Failed to fetch skills: ' + error.message, {variant: 'error'});
                });
        }
    }, [checked, member.MemberID, enqueueSnackbar]);

    const handleNewSkill = () => {
        setOpen(true);
        setEditingSkill(null);
        formik.resetForm();
        toast.info('Create New Skill');
    };

    const handleUpdateSkill = async (skillID: number, SkillData: Skill) => {
        setEditingSkill(SkillData);
        await formik.setValues({
            SkillID: SkillData.SkillID,
            MemberID: SkillData.MemberID,
            SkillName: SkillData.SkillName,
            SkillLevel: SkillData.SkillLevel,
            DateAcquired: SkillData.DateAcquired,
            Certification: SkillData.Certification
        });

        setOpen(true);
    };

    const handleDeleteSkill = (skillID: number) => {
        deleteSkill(skillID)
            .then(() => {
                setSkills(skills.filter(skill => skill.SkillID !== skillID));
                if (editingSkill && editingSkill.SkillID === skillID) {
                    setOpen(false);
                    setEditingSkill(null); // clear the editing income
                }
                toast.success('Skill deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete skill: ${error.message}`);
            });
    };
    return (
        <>
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
            {checked && (
                <div>
                    <h4>Skills {member.MemberID}</h4>

                    <Button variant="contained" color="primary" onClick={handleNewSkill}>
                        Create New Skill
                    </Button>

                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Create New Skill</DialogTitle>
                        <DialogContent>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="SkillName"
                                    name="SkillName"
                                    label="Skill Name"
                                    value={formik.values.SkillName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.SkillName && Boolean(formik.errors.SkillName)}
                                    helperText={formik.touched.SkillName && formik.errors.SkillName}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="SkillLevel-label">Skill Level</InputLabel>
                                    <Select
                                        labelId="SkillLevel-label"
                                        id="SkillLevel"
                                        name="SkillLevel"
                                        value={formik.values.SkillLevel}
                                        onChange={formik.handleChange}
                                        error={formik.touched.SkillLevel && Boolean(formik.errors.SkillLevel)}
                                    >
                                        {Array.from({length: 10}, (_, i) => i + 1).map((value) => (
                                            <MenuItem value={value} key={value}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.SkillLevel && formik.errors.SkillLevel && (
                                        <FormHelperText>{formik.errors.SkillLevel}</FormHelperText>
                                    )}
                                </FormControl>

                                <TextField
                                    fullWidth
                                    id="DateAcquired"
                                    name="DateAcquired"
                                    label="Date Acquired"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={formik.values.DateAcquired}
                                    onChange={formik.handleChange}
                                    error={formik.touched.DateAcquired && Boolean(formik.errors.DateAcquired)}
                                    helperText={formik.touched.DateAcquired && formik.errors.DateAcquired}
                                />
                                <TextField
                                    fullWidth
                                    id="Certification"
                                    name="Certification"
                                    label="Certification"
                                    value={formik.values.Certification}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Certification && Boolean(formik.errors.Certification)}
                                    helperText={formik.touched.Certification && formik.errors.Certification}
                                />
                                <DialogActions>
                                    <Button onClick={() => setOpen(false)} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Save
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <SkillsTableComponent skills={skills} handleUpdateSkill={handleUpdateSkill}
                                          handleDeleteSkill={handleDeleteSkill}/>
                </div>
            )}
        </>
    );
};

export default SkillBox;
