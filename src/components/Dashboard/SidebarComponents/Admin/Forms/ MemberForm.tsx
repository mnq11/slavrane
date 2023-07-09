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
    MenuItem
} from '@material-ui/core';
import {Member} from "../../../../../hooks/useMember";

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

    const validateInput = () => {
        setError("");
        if (name === "" || email === "" || password === "" || contactNumber === "" || dob === "" || !familyId || !role || !score || !gender) {
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

    const handleSubmit = () => {
        if (validateInput()) {
            onSubmit({
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
        }
    };

    return (
        <Dialog open onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
                <TextField
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
                    label="Score"
                    type="number"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                />
                {error && <p>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MemberForm;
