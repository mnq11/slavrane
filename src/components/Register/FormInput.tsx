import React from 'react';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';

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
    return (
        <FormControl error={Boolean(error)} margin="normal">
            <TextField
                id={id}
                label={label}
                name={name}
                type={type}
                onChange={onChange}
                value={value}
                variant="outlined"
                error={Boolean(error)}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};

export default FormInput;
