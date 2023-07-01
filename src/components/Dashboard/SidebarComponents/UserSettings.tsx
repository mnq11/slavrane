// UserSettings.tsx
import React from 'react';
import { Typography } from '@material-ui/core';
import { useMember, Task } from '../../../hooks/useMember';

const UserSettings: React.FC = () => {
    const [member] = useMember();

    if (!member) {
        return <Typography variant="h4">Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4">User Settings Page</Typography>
            <Typography variant="h6">Full Name: {member.FullName}</Typography>
            <Typography variant="h6">Email: {member.email}</Typography>
            <Typography variant="h6">Tasks:</Typography>
            {member.tasks && member.tasks.map((task: Task) => (
                <div key={task.id}>
                    <Typography variant="body1">Description: {task.Description}</Typography>
                    <Typography variant="body1">Due Date: {task.DueDate}</Typography>
                    <Typography variant="body1">Status: {task.Status}</Typography>
                </div>
            ))}

            {/* Display other member properties here */}
        </div>
    );
};

export default UserSettings;
