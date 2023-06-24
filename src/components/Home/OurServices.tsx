// components/OurServices.tsx
import React from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));

const OurServices: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>Our Services</Typography>
                    <Typography variant="h5" gutterBottom>
                        We offer a wide range of services to meet the diverse needs of our users.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Our services include but are not limited to: user management, data analysis, reporting, and more. We are constantly working to improve and expand our services to better serve our users. We are committed to providing high-quality, reliable services that our users can depend on.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default OurServices;
