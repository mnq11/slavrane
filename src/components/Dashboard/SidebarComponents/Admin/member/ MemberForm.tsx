// MemberForm.tsx

import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Select,
    MenuItem, CircularProgress, FormHelperText
} from '@material-ui/core';
import {Member} from "../../../../../hooks/useMember";
import {MemberFormStyles} from "./AdminMember.Styles";

interface MemberFormProps {
    title: string;
    member?: Member;
    onSubmit: (member: Member) => void;
    onCancel: () => void;
    familyId?: number;

}

const MemberForm: React.FC<MemberFormProps> = ({title, member, onSubmit, onCancel, familyId}) => {
    const [name, setName] = useState(member ? member.MemberName : "John Doe");
    const [email, setEmail] = useState(member ? member.Email : "john.doe@example.com");
    const [password, setPassword] = useState(member ? member.Password : "password123");
    const [contactNumber, setContactNumber] = useState(member ? member.ContactNumber : "1234567890");
    const [dob, setDob] = useState(member ? member.DateOfBirth : "2000-01-01");
    const [familyIdState] = useState(familyId || (member ? member.FamilyID : 1));
    const [role, setRole] = useState<'normal' | 'moderator' | 'admin' | 'analyst' | undefined>(member ? member.Role : 'normal');
    const [score, setScore] = useState(member ? member.score : 50);
    const [gender, setGender] = useState(member ? member.Gender : "Male");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = MemberFormStyles();

    const validateInput = () => {
        setError("");
        setError("");
        if (name === "" || email === "" || password === "" || contactNumber === "" || dob === "" || !score || !gender) {
            setError("All fields are required");
            return false;
        }

        // Email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return false;
        }

        // Password validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }

        // ContactNumber validation - make sure it is a number
        if (isNaN(Number(contactNumber))) {
            setError("Contact number must be a number");
            return false;
        }

        // Score validation - make sure it is a number
        if (isNaN(score)) {
            setError("Score must be a number");
            return false;
        }

        return true;
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
                setError('Failed to submit the form. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };
    return (
        <Dialog open onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    className={classes.textField}
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label="Password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />

                <Select
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'normal' | 'moderator' | 'admin' | 'analyst')}
                >
                    <MenuItem value={"normal"}>Normal</MenuItem>
                    <MenuItem value={"moderator"}>Moderator</MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"analyst"}>Analyst</MenuItem>
                </Select>
                <Select
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as string)}
                >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
                <TextField
                    className={classes.textField}
                    label="Score"
                    type="number"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                />
                {error && <FormHelperText error>{error}</FormHelperText>}
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} disabled={loading} onClick={handleSubmit}>
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
                <Button className={classes.button} onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MemberForm;
