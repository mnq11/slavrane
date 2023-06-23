import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, Typography } from '@material-ui/core';

interface LoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', { email, password });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
                toast.success("Logged in successfully!");
                console.log('Token :',token);
                console.log('response :',response);

            } else {
                toast.error('Invalid login credentials');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while logging in');
        }
    };

    return (
        <Box display="flex" flexDirection="column" width={300} margin="auto" padding={2} borderRadius={1} boxShadow={1} bgcolor="#f7f7f7">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" variant="outlined" fullWidth />
            <TextField placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" variant="outlined" fullWidth />
            <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px' }}>Login</Button>
        </Box>
    );
};

export default Login;
