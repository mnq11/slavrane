import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    FormHelperText,
    InputAdornment
} from '@material-ui/core';
import { Member, useMember } from "../../../../../hooks/useMember";
import { MemberFormStyles } from "./Styling/AdminMember.Styles";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PhoneIcon from '@material-ui/icons/Phone';
import CakeIcon from '@material-ui/icons/Cake';

interface MemberFormProps {
    title: string;
    member?: Member;
    onSubmit: (member: Member) => void;
    onCancel: () => void;
    familyId?: number;
}

const MemberForm: React.FC<MemberFormProps> = ({ title, member, onSubmit, onCancel, familyId }) => {
    const [name, setName] = useState(member ? member.MemberName : "John Doe");
    const [email, setEmail] = useState(member ? member.Email : "john.doe@example.com");
    const [password, setPassword] = useState(member ? member.Password : "password123");
    const [contactNumber, setContactNumber] = useState(member ? member.ContactNumber : "1234567890");
    const [dob, setDob] = useState(member ? member.DateOfBirth : "2000-01-01");
    const [familyIdState] = useState(familyId || (member ? member.FamilyID : 1));
    const [role, setRole] = useState<'normal' | 'moderator' | 'admin' | 'analyst' | undefined>(member ? member.Role : 'normal');
    const [score, setScore] = useState(member ? member.score : 50);
    const [gender, setGender] = useState(member ? member.Gender : "Male");
    const [loading, setLoading] = useState(false);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [contactNumberError, setContactNumberError] = useState("");
    const [dobError, setDobError] = useState("");
    const [scoreError, setScoreError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [user] = useMember();

    const classes = MemberFormStyles();

    const validateInput = () => {
        let isValid = true;

        if (name === "") {
            setNameError("اسم المستخدم مطلوب");
            isValid = false;
        } else {
            setNameError("");
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (email === "") {
            setEmailError("البريد الإلكتروني مطلوب");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("صيغة البريد الإلكتروني غير صحيحة");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (password === "") {
            setPasswordError("كلمة المرور مطلوبة");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("يجب أن تكون كلمة المرور على الأقل 6 أحرف");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (contactNumber === "") {
            setContactNumberError("رقم الهاتف مطلوب");
            isValid = false;
        } else if (isNaN(Number(contactNumber))) {
            setContactNumberError("يجب أن يكون رقم الهاتف رقمًا");
            isValid = false;
        } else {
            setContactNumberError("");
        }

        if (dob === "") {
            setDobError("تاريخ الميلاد مطلوب");
            isValid = false;
        } else {
            setDobError("");
        }

        if (!score) {
            setScoreError("النقاط مطلوبة");
            isValid = false;
        } else if (isNaN(score)) {
            setScoreError("يجب أن تكون النقاط رقمًا");
            isValid = false;
        } else {
            setScoreError("");
        }

        if (!gender) {
            setGenderError("الجنس مطلوب");
            isValid = false;
        } else {
            setGenderError("");
        }

        return isValid;
    }

    const handleSubmit = async () => {
        if (validateInput()) {
            setLoading(true);
            try {
                await onSubmit({
                    MemberID: member ? member.MemberID : undefined,
                    FamilyID: familyIdState,
                    MemberName: name,
                    Role: role,
                    score: score,
                    DateOfBirth: dob,
                    Gender: gender,
                    Email: email,
                    Password: password,
                    ContactNumber: contactNumber
                });
                onCancel();
            } catch (error) {
                console.log('فشل في تقديم النموذج. يرجى المحاولة مرة أخرى.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Dialog open onClose={onCancel} dir="rtl">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    className={classes.textField}
                    label="الاسم الكامل"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    error={Boolean(nameError)}
                    helperText={nameError}
                />
                <TextField
                    className={classes.textField}
                    label="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(emailError)}
                    helperText={emailError}
                />
                <TextField
                    className={classes.textField}
                    label="إنشاء كلمة مرور"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                />
                <TextField
                    className={classes.textField}
                    label="رقم الهاتف"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(contactNumberError)}
                    helperText={contactNumberError}
                />
                <TextField
                    className={classes.textField}
                    label="تاريخ الميلاد"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CakeIcon />
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={Boolean(dobError)}
                    helperText={dobError}
                />
                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel id="gender-select-label">الجنس</InputLabel>
                    <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value as string)}
                        label="الجنس"
                        error={Boolean(genderError)}
                    >
                        <MenuItem value={'Male'}>ذكر</MenuItem>
                        <MenuItem value={'Female'}>أنثى</MenuItem>
                    </Select>
                    <FormHelperText error>{genderError}</FormHelperText>
                </FormControl>

                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel id="role-select-label">الدور</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'normal' | 'moderator' | 'admin' | 'analyst')}
                        label="الدور"
                    >
                        {user?.Role === 'admin' && <MenuItem value={'admin'}>مشرف</MenuItem>}
                        {(user?.Role === 'admin' || user?.Role === 'moderator') && <MenuItem value={'moderator'}>مراقب</MenuItem>}
                        {(user?.Role === 'admin' || user?.Role === 'moderator' || user?.Role === 'analyst') && <MenuItem value={'analyst'}>محلل</MenuItem>}
                        <MenuItem value={'normal'}>عادي</MenuItem>
                    </Select>
                </FormControl>


                <TextField
                    className={classes.textField}
                    label="النقاط"
                    type="number"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    variant="outlined"
                    error={Boolean(scoreError)}
                    helperText={scoreError}
                />
            </DialogContent>
            <DialogActions>
                <IconButton color="primary" disabled={loading} onClick={handleSubmit}>
                    {loading ? <CircularProgress size={24} /> : <SaveIcon />}
                </IconButton>
                <IconButton color="secondary" onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
        </Dialog>
    );
}

export default MemberForm;
