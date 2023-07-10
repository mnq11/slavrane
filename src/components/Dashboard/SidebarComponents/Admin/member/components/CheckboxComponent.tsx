// CheckboxComponent.tsx
import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import {Member} from "../../../../../../hooks/useMember";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({ label, checked, onChange, member }) => {
    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        color="primary"
                    />
                }
                label={label}
            />
            {checked && (
                <div>
                    <h3>Member details:</h3>
                    <p>{`Member ID: ${member.MemberID}`}</p>
                    <p>{`Name: ${member.MemberName}`}</p>
                    <p>{`Email: ${member.Email}`}</p>
                    <p>{`Contact Number: ${member.ContactNumber}`}</p>
                    <p>{`Date of Birth: ${member.DateOfBirth}`}</p>
                    <p>{`Score: ${member.score}`}</p>
                </div>
            )}
        </>
    );
};

export default CheckboxComponent;
