// Register.tsx
import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {Button, Container, Typography, CircularProgress} from '@material-ui/core';
import FormInput from './FormInput';
import {registerMember} from '../../API/api';
import useRegisterStyles from "./Register.styles";

const Register: React.FC = () => {
    const classes = useRegisterStyles();
    const formik = useFormik({
        initialValues: {
            FamilyID: '',
            RoleID: '250',
            FullName: '',
            DateOfBirth: '',
            Email: '',
            PhoneNumber: '',
            Password: '',
        },
        validationSchema: Yup.object({
            FamilyID: Yup.string()
                .required('Required'),
            RoleID: Yup.string()
                .required('Required'),
            FullName: Yup.string()
                .required('Required'),
            DateOfBirth: Yup.date()
                .required('Required'),
            Email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            PhoneNumber: Yup.string()
                .required('Required'),
            Password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .matches(/\d/, 'Must contain a number')
                .matches(/[!@#$%^&*()]/, 'Must contain a special character')
                .required('Required'),
        }),
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            try {
                const response = await registerMember(values);
                console.log(response);
                toast.success("Registration successful!");
            } catch (error) {
                console.error(error);
                // @ts-ignore
                toast.error(error.message);
                setErrors({Email: 'Email already in use.'});
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.container}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <FormInput label="Family ID" id="FamilyID" name="FamilyID" type="text"
                               onChange={formik.handleChange}
                               value={formik.values.FamilyID}
                               error={formik.touched.FamilyID && formik.errors.FamilyID ? formik.errors.FamilyID : undefined}/>
                   <FormInput label="Full Name" id="FullName" name="FullName" type="text"
                               onChange={formik.handleChange}
                               value={formik.values.FullName}
                               error={formik.touched.FullName && formik.errors.FullName ? formik.errors.FullName : undefined}/>
                    <FormInput label="Date of Birth" id="DateOfBirth" name="DateOfBirth" type="date"
                               onChange={formik.handleChange}
                               value={formik.values.DateOfBirth}
                               error={formik.touched.DateOfBirth && formik.errors.DateOfBirth ? formik.errors.DateOfBirth : undefined}/>
                    <FormInput label="Email" id="Email" name="Email" type="email" onChange={formik.handleChange}
                               value={formik.values.Email}
                               error={formik.touched.Email && formik.errors.Email ? formik.errors.Email : undefined}/>
                    <FormInput label="Phone Number" id="PhoneNumber" name="PhoneNumber" type="text"
                               onChange={formik.handleChange}
                               value={formik.values.PhoneNumber}
                               error={formik.touched.PhoneNumber && formik.errors.PhoneNumber ? formik.errors.PhoneNumber : undefined}/>
                    <FormInput label="Password" id="Password" name="Password" type="password"
                               onChange={formik.handleChange}
                               value={formik.values.Password}
                               error={formik.touched.Password && formik.errors.Password ? formik.errors.Password : undefined}/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? <CircularProgress size={24}/> : 'Register'}
                    </Button>
                </form>
            </div>
        </Container>
    );


};

export default Register;
