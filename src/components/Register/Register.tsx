import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Box, Button, Container, Typography} from '@material-ui/core';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const Register: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            userType: 'regular',
            phone: '',
            address: '',
            city: '',
            town: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
            userType: Yup.string()
                .oneOf(['admin', 'regular', 'guest', 'serviceProvider', 'customer'], 'Invalid user type'),
            phone: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            town: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3001/users/register', values);
                console.log(response.data);
                toast.success("Registration successful!");
            } catch (error) {
                console.error(error);
                // @ts-ignore
                if (error.response && error.response.status === 400) {
                    toast.error("Email already in use.");
                } else {
                    toast.error("An error occurred while registering");
                }
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <FormInput label="Name" id="name" name="name" type="text" onChange={formik.handleChange}
                               value={formik.values.name}
                               error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}/>
                    <FormInput label="Email" id="email" name="email" type="email" onChange={formik.handleChange}
                               value={formik.values.email}
                               error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}/>
                    <FormInput label="Password" id="password" name="password" type="password"
                               onChange={formik.handleChange} value={formik.values.password}
                               error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}/>
                    <FormSelect label="User Type" id="userType" name="userType" onChange={formik.handleChange}
                                value={formik.values.userType}
                                options={['admin', 'regular', 'guest', 'serviceProvider', 'customer']}/>
                    <FormInput label="Phone Number" id="phone" name="phone" type="text" onChange={formik.handleChange}
                               value={formik.values.phone}/>
                    <FormInput label="Address" id="address" name="address" type="text" onChange={formik.handleChange}
                               value={formik.values.address}/>
                    <FormInput label="City" id="city" name="city" type="text" onChange={formik.handleChange}
                               value={formik.values.city}/>
                    <FormInput label="Town" id="town" name="town" type="text" onChange={formik.handleChange}
                               value={formik.values.town}/>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Register
                    </Button>

                </form>
            </Box>
        </Container>
    );
};

export default Register;
