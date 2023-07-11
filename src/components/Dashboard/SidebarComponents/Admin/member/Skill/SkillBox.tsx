import React, { useState, useEffect } from 'react';
import {
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Member, Skill } from '../../../../../../hooks/useMember';
import SkillsTableComponent from './SkillsTableComponent';
import { getSkillsForMember, createSkill } from '../../../../../../API/api';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const SkillBox: React.FC<CheckboxProps> = ({ label, checked, onChange, member }) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = Yup.object({
        SkillName: Yup.string().required('Required'),
        SkillLevel: Yup.string().required('Required'),
        DateAcquired: Yup.date().required('Required'),
        Certification: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            MemberID: member.MemberID,
            SkillName: '',
            SkillLevel: '',
            DateAcquired: '',
            Certification: '',
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
            createSkill(skillData)
                .then((newSkill) => {
                    setSkills([newSkill, ...skills]);
                    setOpen(false);
                    enqueueSnackbar('Skill created successfully', { variant: 'success' });
                })
                .catch((error) => {
                    enqueueSnackbar('Failed to create skill: ' + error.message, { variant: 'error' });
                });
        },
    });

    useEffect(() => {
        if (checked) {
            getSkillsForMember(member.MemberID)
                .then((skills) => setSkills(skills))
                .catch((error) => {
                    enqueueSnackbar('Failed to fetch skills: ' + error.message, { variant: 'error' });
                });
        }
    }, [checked, member.MemberID, enqueueSnackbar]);

    const handleNewSkill = () => {
        setOpen(true);
    };

    return (
        <>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} color="primary" />}
                label={label}
            />
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
                                <TextField
                                    fullWidth
                                    id="SkillLevel"
                                    name="SkillLevel"
                                    label="Skill Level"
                                    value={formik.values.SkillLevel}
                                    onChange={formik.handleChange}
                                    error={formik.touched.SkillLevel && Boolean(formik.errors.SkillLevel)}
                                    helperText={formik.touched.SkillLevel && formik.errors.SkillLevel}
                                />
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

                    <SkillsTableComponent skills={skills} />
                </div>
            )}
        </>
    );
};

export default SkillBox;
