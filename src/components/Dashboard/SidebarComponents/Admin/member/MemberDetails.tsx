import React, {useState} from 'react';
import {Member} from "../../../../../hooks/useMember";
import {Card, CardContent, Grid, IconButton, Typography} from '@material-ui/core';
import MemberForm from "./MemberForm";
import {deleteMember, updateMember} from "../../../../../API/api";
import {toast} from "react-toastify";
import TaskBox from './Task/TaskBox';
import {MemberDetailsStyles} from "./Styling/AdminMember.Styles";
import SkillBox from "./Skill/SkillBox";
import ExpenseBox from "./Expenses/ExpenseBox";
import IncomeBox from "./Incomes/IncomeBox";
import LoanBox from "./Lone/LoanBox";
import ResourceBox from "./Resource/ResourceBox";
import SavingsBox from "./Savings/SavingsBox";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface MemberDetailsProps {
    member: Member;
    onBackToFamilyDetails: () => void;
}

const BOXES = {
    TASK: 'مهمة',
    SKILL: 'مهارة',
    EXPENSE: 'نفقة',
    INCOME: 'دخل',
    LOAN: 'قرض',
    RESOURCE: 'مورد',
    SAVINGS: 'الادخار',
};

const MemberDetails: React.FC<MemberDetailsProps> = ({
                                                         member,
                                                         onBackToFamilyDetails,
                                                     }) => {
    const [editDialogOpen, setUpdateDialogOpen] = useState(false);
    const [activeBox, setActiveBox] = useState<string | null>(null);

    const classes = MemberDetailsStyles();
    const handleCheckboxChange = (box: string) => {
        setActiveBox(prev => prev !== box ? box : null);
    };

    const handleDelete = async () => {
        try {
            await deleteMember(member.MemberID);
            toast.success('تم حذف العضو بنجاح');
            onBackToFamilyDetails();
        } catch (error) {
            console.error("فشل في حذف العضو: ", error);
            toast.error('فشل في حذف العضو');
        }
    };

    const handleUpdate = async (updatedMember: Member) => {
        try {
            const updatedMemberWithId = {...updatedMember, MemberID: member.MemberID};
            await updateMember(updatedMemberWithId);
            setUpdateDialogOpen(false);
            toast.success('تم تحديث العضو بنجاح');
            onBackToFamilyDetails();
        } catch (error) {
            console.error("فشل في تحديث العضو: ", error);
            toast.error('فشل في تحديث العضو');
        }
    };

    return (
        <div>
            <Card className={classes.card} dir="rtl">
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" dir="rtl">اسم العضو: {member.MemberName}</Typography>
                            <Typography variant="body2" dir="rtl">البريد الالكتروني: {member.Email}</Typography>
                            <Typography variant="body2" dir="rtl">رقم الاتصال: {member.ContactNumber}</Typography>
                            <Typography variant="body2" dir="rtl">تاريخ الميلاد: {member.DateOfBirth}</Typography>
                            <Typography variant="body2" dir="rtl">النقاط: {member.score}</Typography>
                            <Typography variant="body2" dir="rtl">رقم الاتصال: {member.ContactNumber}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <IconButton className={classes.backButton} dir="rtl" onClick={onBackToFamilyDetails}>
                                <ArrowBackIcon fontSize="large"/>
                            </IconButton>
                            <IconButton className={classes.updateButton} dir="rtl"
                                        onClick={() => setUpdateDialogOpen(true)}>
                                <EditIcon fontSize="large"/>
                            </IconButton>
                            <IconButton className={classes.deleteButton} dir="rtl" onClick={handleDelete}>
                                <DeleteIcon fontSize="large"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
                {editDialogOpen && (
                    <MemberForm
                        title="تحديث العضو"
                        onSubmit={handleUpdate}
                        onCancel={() => setUpdateDialogOpen(false)}
                        member={member}
                    />
                )}
            </Card>
            <Card className={classes.card} dir="rtl">
                <ExpenseBox
                    label="النفقات"
                    checked={activeBox === BOXES.EXPENSE}
                    onChange={() => handleCheckboxChange(BOXES.EXPENSE)}
                    member={member}
                />
                <IncomeBox
                    label="الدخل"
                    checked={activeBox === BOXES.INCOME}
                    onChange={() => handleCheckboxChange(BOXES.INCOME)}
                    member={member}
                />
                <SkillBox
                    label="المهارات"
                    checked={activeBox === BOXES.SKILL}
                    onChange={() => handleCheckboxChange(BOXES.SKILL)}
                    member={member}
                />
                <TaskBox
                    label="المهام"
                    checked={activeBox === BOXES.TASK}
                    onChange={() => handleCheckboxChange(BOXES.TASK)}
                    member={member}
                />
                <ResourceBox
                    label="الموارد"
                    checked={activeBox === BOXES.RESOURCE}
                    onChange={() => handleCheckboxChange(BOXES.RESOURCE)}
                    member={member}
                />
                <SavingsBox
                    label="الادخار"
                    checked={activeBox === BOXES.SAVINGS}
                    onChange={() => handleCheckboxChange(BOXES.SAVINGS)}
                    member={member}
                />
                <LoanBox
                    label="القروض"
                    checked={activeBox === BOXES.LOAN}
                    onChange={() => handleCheckboxChange(BOXES.LOAN)}
                    member={member}
                />
            </Card>
        </div>
    );
};

export default MemberDetails;
