// UserGreeting.tsx
import React from 'react';
import { Typography } from '@material-ui/core';

interface UserGreetingProps {
    name: string;
    email: string;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ name, email }) => (
    <>
        <Typography variant="h4">Welcome, {name}</Typography>
        <Typography>Your email is {email}</Typography>
    </>
);

export default UserGreeting;
