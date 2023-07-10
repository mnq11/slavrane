// FormInput.tsx
import React from 'react';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import {MemberFormStyles} from "../Dashboard/SidebarComponents/Admin/member/AdminMember.Styles";

interface FormInputProps {
    label: string;
    id: string;
    name: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, id, name, type, onChange, value, error }) => {
    const classes = MemberFormStyles();

    return (
        <FormControl error={Boolean(error)} margin="normal" fullWidth>
            <TextField
                    className={classes.textField}
                id={id}
                label={value || type !== 'date' ? label : ' '}
                name={name}
                type={type}
                onChange={onChange}
                value={value}
                variant="outlined"
                error={Boolean(error)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};

export default FormInput;