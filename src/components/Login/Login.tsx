// components/Login/Login.tsx
import React, {useContext, useEffect} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, TextField, Typography, useTheme, makeStyles, createStyles, CircularProgress, Paper} from '@material-ui/core';
import {alpha} from '@material-ui/core/styles/colorManipulator';
import {useNavigate} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {loginUser} from "../../API/api";
import {AppStateContext} from '../../AppStateContext';
import {useUser} from "../../hooks/useUser";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: theme.palette.type === 'dark' ? 'linear-gradient(135deg, #670d10 0%,#092756 100%)' : 'linear-gradient(135deg, #ff6b6b 0%,#ffe66d 100%)',
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(3),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            width: 300,
            height: 300,
            [theme.breakpoints.up('md')]: {
                width: '50%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '80%',
            },
        },
        form: {
            width: '100%',
        },
        textField: {
            marginBottom: theme.spacing(2),
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.text.secondary,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.text.secondary,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.text.secondary,
                },
            },
        },
        submitButton: {
            marginTop: theme.spacing(2),
            background: theme.palette.primary.main,
            border: `1px solid ${theme.palette.secondary.main}`,
            color: theme.palette.text.primary,
            textShadow: '1px 1px 1px rgba(0,0,0,0.4)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s',
            '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            },
        },
    })
);

const Login: React.FC = () => {

    const [user, setUser] = useUser();
    const navigate = useNavigate();


    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('Login must be used within AppStateProvider');
    }
    const {dispatch} = context;

    // const theme = useTheme();
    const classes = useStyles();

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
                setUser(user); // set user state
                dispatch({type: 'LOGIN', payload: user});
                toast.success("Logged in successfully!");
                navigate('/dashboard');
                console.log('userx in the login page after login : ', user);
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
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                    {({isSubmitting}) => (
                        <Form className={classes.form}>
                            <Field name="email" as={TextField} placeholder="Email" margin="normal" variant="outlined"
                                   fullWidth className={classes.textField}/>
                            <ErrorMessage name="email" component="div"/>
                            <Field name="password" as={TextField} type="password" placeholder="Password" margin="normal"
                                   variant="outlined" fullWidth className={classes.textField}/>
                            <ErrorMessage name="password" component="div"/>
                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}
                                    className={classes.submitButton}>
                                {isSubmitting ? <CircularProgress size={24}/> : 'Login'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </div>
    );
}

export default Login;
