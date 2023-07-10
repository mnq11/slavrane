import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import {Member, Tasks} from "../../../../../../hooks/useMember";
import Button from "@material-ui/core/Button";
import TableComponent from "./TableComponent";
import {getTasksForMember} from "../../../../../../API/api";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({ label, checked, onChange, member }) => {
    const [tasks, setTasks] = useState<Tasks[]>([]);

    useEffect(() => {
        if (checked) {
            getTasksForMember(member.MemberID)
                .then(tasks => setTasks(tasks))
                .catch(error => console.error('Failed to fetch tasks: ', error));
        }
    }, [checked, member.MemberID]);

    const handleNewTask = () => {
        console.log("Create new task...");
        // Navigate to new task creation page or open a modal
    }

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
                <div> {/* Here is the missing opening div tag */}
                    <h4>Tasks:</h4>
                    <Button variant="contained" color="primary" onClick={handleNewTask}>Create New Task</Button>

                    <TableComponent tasks={tasks} />
                </div>
            )}
        </>
    );
};

export default CheckboxComponent;
