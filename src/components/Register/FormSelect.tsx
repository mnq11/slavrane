import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface FormSelectProps {
    label: string;
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
    value: string;
    options: string[];
}

const FormSelect: React.FC<FormSelectProps> = ({ label, id, name, onChange, value, options }) => {
    return (
        <FormControl variant="outlined" margin="normal">
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FormSelect;
