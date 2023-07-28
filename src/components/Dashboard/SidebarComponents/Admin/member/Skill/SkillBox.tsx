import React, { useState, useEffect } from 'react';
import {Switch, Grid, Card, CardContent, Typography, Box, IconButton, ThemeProvider} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Skill, Member } from '../../../../../../hooks/useMember';
import SkillsTableComponent from './SkillsTableComponent';
import { getSkillsForMember, createSkill, deleteSkill, updateSkill } from '../../../../../../API/api';
import { toast } from "react-toastify";
import { useLoanBoxStyles } from "../Lone/LoanBox.styles";
import SkillForm from "./SkillForm";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {Divider, theme} from "antd";

interface SkillBoxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const SkillBox: React.FC<SkillBoxProps> = ({ label, checked, onChange, member }) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [open, setOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

    const { enqueueSnackbar } = useSnackbar();
    const classes = useLoanBoxStyles();

    const onSubmit = (values: any) => {
        const skillData = {
            MemberID: member.MemberID,
            SkillName: values.SkillName,
            SkillLevel: values.SkillLevel,
            DateAcquired: values.DateAcquired,
            Certification: values.Certification,
        };

        if (editingSkill) {
            updateSkill({ ...skillData, SkillID: editingSkill.SkillID })
                .then((updatedSkill) => {
                    setSkills(skills.map(skill => skill.SkillID === updatedSkill.SkillID ? updatedSkill : skill));
                    setOpen(false);
                    setEditingSkill(null);
                    enqueueSnackbar('تم تحديث المهارة بنجاح', { variant: 'success' });
                    toast.success('تم تحديث المهارة بنجاح');
                })
                .catch((error) => {
                    enqueueSnackbar('فشل تحديث المهارة: ' + error.message, { variant: 'error' });
                    toast.error('فشل تحديث المهارة: ' + error.message);
                });
        } else {
            createSkill(skillData)
                .then((newSkill) => {
                    setSkills([newSkill, ...skills]);
                    setOpen(false);
                    setEditingSkill(null);
                    enqueueSnackbar('تم إنشاء المهارة بنجاح', { variant: 'success' });
                    toast.success('تم إنشاء المهارة بنجاح');
                })
                .catch((error) => {
                    enqueueSnackbar('فشل إنشاء المهارة: ' + error.message, { variant: 'error' });
                    toast.error('فشل إنشاء المهارة: ' + error.message);
                });
        }
    };

    useEffect(() => {
        if (checked) {
            getSkillsForMember(member.MemberID)
                .then((skills) => setSkills(skills))
                .catch((error) => {
                    enqueueSnackbar('فشل جلب المهارات: ' + error.message, { variant: 'error' });
                });
        }
    }, [checked, member.MemberID, enqueueSnackbar]);

    const handleNewSkill = () => {
        setOpen(true);
        setEditingSkill(null);
        toast.info('إنشاء مهارة جديدة');
    };

    const handleUpdateSkill = async (skillID: number, SkillData: Skill) => {
        setEditingSkill(SkillData);
        setOpen(true);
    };

    const handleDeleteSkill = (skillID: number) => {
        deleteSkill(skillID)
            .then(() => {
                setSkills(skills.filter(skill => skill.SkillID !== skillID));
                if (editingSkill && editingSkill.SkillID === skillID) {
                    setOpen(false);
                    setEditingSkill(null);
                }
                toast.success('تم حذف المهارة بنجاح');
            })
            .catch((error) => {
                toast.error(`فشل حذف المهارة: ${error.message}`);
            });
    };
    const initialValues = editingSkill && editingSkill.MemberID !== undefined ? editingSkill : {
        SkillID: 0,
        MemberID: member.MemberID,
        SkillName: 'اسم المهارة الافتراضي',
        SkillLevel: 1,
        DateAcquired: new Date().toISOString().split('T')[0],
        Certification: 'الشهادة الافتراضية',
    };
    return (
        <ThemeProvider theme={theme}>

        <Grid item xs={12}>
            <Card className={classes.card}>
                <CardContent>
                    <Box className={classes.switchBox}>
                        <Typography variant="h5">{label}</Typography>
                        <Switch
                            checked={checked}
                            onChange={onChange}
                            color="primary"
                        />
                    </Box>
                    {checked && (
                        <>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <IconButton color="primary" onClick={handleNewSkill}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Box>
                            <Divider />
                            <SkillForm
                                open={open}
                                onSubmit={onSubmit}
                                onClose={() => setOpen(false)}
                                initialValues={initialValues}
                            />
                            <SkillsTableComponent skills={skills} handleUpdateSkill={handleUpdateSkill} handleDeleteSkill={handleDeleteSkill} />
                        </>
                    )}
                </CardContent>
            </Card>
        </Grid>
        </ThemeProvider>
    );
};

export default SkillBox;
