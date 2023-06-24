// components/Login/Login.tsx
import React, {useContext} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box, Button, TextField, Typography, useTheme, makeStyles, CircularProgress} from '@material-ui/core';
import {alpha} from '@material-ui/core/styles/colorManipulator';
import {useNavigate} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {loginUser} from "../../API/api";
import {AppStateContext} from '../../AppStateContext';

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




const Login: React.FC = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('Login must be used within AppStateProvider');
    }
    const {dispatch} = context;


    const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleLogin = async (values: { email: string; password: string; }, {setSubmitting, setErrors}: any) => {
        try {
            const {token, user} = await loginUser(values.email, values.password);
            if (token) {
                dispatch({type: 'LOGIN', payload: user});
                toast.success("Logged in successfully!");
                navigate('/dashboard');
            } else {
                toast.error('Invalid login credentials');
            }
        } catch (error) {
            console.error(error);
            // @ts-ignore
            toast.error(error.response?.data?.message || 'An error occurred while logging in');
            // @ts-ignore
            setErrors({api: error.response?.data?.message || 'An error occurred while logging in'});
        }
        setSubmitting(false);
    };
    return (
        <Box className={classes.box} display="flex" flexDirection="column" width={300} margin="auto" padding={2}
             borderRadius={1} boxShadow={1} bgcolor={theme.palette.background.paper}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                {({isSubmitting}) => (
                    <Form className={classes.root}>
                        <Field name="email" as={TextField} placeholder="Email" margin="normal" variant="outlined"
                               fullWidth/>
                        <ErrorMessage name="email" component="div"/>
                        <Field name="password" as={TextField} type="password" placeholder="Password" margin="normal"
                               variant="outlined" fullWidth/>
                        <ErrorMessage name="password" component="div"/>
                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <CircularProgress size={24}/> : 'Login'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default Login;
