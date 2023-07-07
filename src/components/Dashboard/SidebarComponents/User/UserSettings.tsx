// UserSettings.tsx
import React from 'react';
import { Typography } from '@material-ui/core';
import {Member} from "../../../../hooks/useMember";
interface UserSettingsProps {
    member: Member | null;
}
const UserSettings: React.FC<UserSettingsProps> = ({ member }) => {

    if (!member) {
        return <Typography variant="h4">Loading...</Typography>;
    }

    return (
        <div>
            {/*<Typography variant="h4">User Settings Page</Typography>*/}
            {/*<Typography variant="h6">Full Name: {member.FullName}</Typography>*/}
            {/*<Typography variant="h6">Email: {member.Email}</Typography>*/}
            {/*<Typography variant="h6">Email: {member.PhoneNumber}</Typography>*/}
            {/*<Typography variant="h6">Tasks:</Typography>*/}
            {/*{member.Tasks && member.Tasks.map((task: Task) => ( // Changed "tasks" to "Tasks"*/}
            {/*    <div key={task.TaskID}>*/}
            {/*        <Typography variant="body1">Description: {task.Description}</Typography>*/}
            {/*        <Typography variant="body1">Due Date: {task.DueDate}</Typography>*/}
            {/*        <Typography variant="body1">Status: {task.Status}</Typography>*/}
            {/*    </div>*/}
            {/*))}*/}

            {/* Display other member properties here */}
        </div>
    );
};

export default UserSettings;
