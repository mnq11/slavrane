// SkillBox.tsx
import React, {useState, useEffect} from 'react';
import {FormControlLabel, Button, Switch} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import {Skill, Member} from '../../../../../../hooks/useMember';
import SkillsTableComponent from './SkillsTableComponent';
import {getSkillsForMember, createSkill, deleteSkill, updateSkill} from '../../../../../../API/api';
import {toast} from "react-toastify";
import {useSliderSwitchStyles} from "../Lone/LoanBox.styles";
import SkillForm from "./SkillForm";

interface SkillBoxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const SkillBox: React.FC<SkillBoxProps> = ({label, checked, onChange, member}) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [open, setOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

    const {enqueueSnackbar} = useSnackbar();
    const classes = useSliderSwitchStyles();

    const onSubmit = (values: any) => {
        const skillData = {
            MemberID: member.MemberID,
            SkillName: values.SkillName,
            SkillLevel: values.SkillLevel,
            DateAcquired: values.DateAcquired,
            Certification: values.Certification,
        };

        if (editingSkill) {
            updateSkill({...skillData, SkillID: editingSkill.SkillID})  // Use editingSkill.SkillID instead of values.SkillID
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
    };

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
        toast.info('Create New Skill');
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
                toast.success('Skill deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete skill: ${error.message}`);
            });
    };
    const initialValues = editingSkill && editingSkill.MemberID !== undefined ? editingSkill : {
        SkillID: 0,
        MemberID: member.MemberID,
        SkillName: 'Default Skill Name',
        SkillLevel: 1,
        DateAcquired: new Date().toISOString().split('T')[0],
        Certification: 'Default Certification',
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

                    <SkillForm
                        open={open}
                        onSubmit={onSubmit}
                        onClose={() => setOpen(false)}
                        initialValues={initialValues}
                    />
                    <SkillsTableComponent skills={skills} handleUpdateSkill={handleUpdateSkill} handleDeleteSkill={handleDeleteSkill} />
                </div>
            )}
        </>
    );
};

export default SkillBox;
