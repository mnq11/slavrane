// LoginForm.tsx
import React from 'react';
import {Button, TextField, CircularProgress} from '@material-ui/core';
import {Formik, Field, Form, ErrorMessage, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import useStyles from './Login.styles';

export interface LoginFormValues {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (values: LoginFormValues, formikBag: FormikHelpers<LoginFormValues>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
    const classes = useStyles();

    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({isSubmitting}) => (
                <Form className={classes.form}>
                    <Field name="email" as={TextField} placeholder="Email" margin="normal" variant="outlined"
                           fullWidth className={classes.textField} autoFocus/>
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
    );
};

export default LoginForm;
