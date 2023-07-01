// components/Login/Login.tsx
import React, {useContext} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Typography, Paper} from '@material-ui/core';

import {useNavigate} from 'react-router-dom';

import {loginMember} from "../../API/api";
import {AppStateContext} from '../../AppStateContext';

import useStyles from './Login.styles';
import LoginForm, {LoginFormValues} from './LoginForm';
import {FormikHelpers} from 'formik';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('Login must be used within AppStateProvider');
    }
    const {dispatch} = context;

    const classes = useStyles();

    const handleLogin = async (values: LoginFormValues, {setSubmitting, setErrors}: FormikHelpers<LoginFormValues>) => {
        try {
            const {token, member} = await loginMember(values.email, values.password);
            if (token) {
                window.localStorage.setItem('token', token);
                window.localStorage.setItem('member', JSON.stringify(member));
                console.log('member', member);
                dispatch({type: 'LOGIN', payload: member});
                toast.success("Logged in successfully!");
                navigate('/dashboard');
            } else {
                handleLoginError('Invalid login credentials', setErrors);
            }

        } catch (error) {
            handleLoginError(error, setErrors);
            setSubmitting(false);
        }
    };

    const handleLoginError = (error: any, setErrors: (error: any) => void) => {
        let errorMessage = 'An error occurred while logging in. Please try again.';
        if (error.response) {
            errorMessage = error.response.data.message;
        } else if (error.request) {
            errorMessage = 'No response received from server. Please try again.';
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        toast.error(errorMessage);
        setErrors({email: errorMessage});
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5">Login</Typography>
                <LoginForm onSubmit={handleLogin}/>
            </Paper>
        </div>
    );
}


export default Login;
