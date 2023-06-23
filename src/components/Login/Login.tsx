import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, Typography, useTheme, makeStyles } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& .MuiButton-root': {
            margin: theme.spacing(1),
        },
    },
    box: {
        transition: '0.3s',
        '&:hover': {
            boxShadow: `0 0 11px ${alpha(theme.palette.primary.main, 0.5)}`,
        },
    },
}));

interface LoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', { email, password });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));  // Store user info in local storage
                setIsLoggedIn(true);
                setUser(user);
                toast.success("Logged in successfully!");

                navigate('/dashboard');

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
        <Box className={classes.box} display="flex" flexDirection="column" width={300} margin="auto" padding={2} borderRadius={1} boxShadow={1} bgcolor={theme.palette.background.paper}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" variant="outlined" fullWidth />
                <TextField placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" variant="outlined" fullWidth />
                <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            </form>
        </Box>
    );
};

export default Login;
