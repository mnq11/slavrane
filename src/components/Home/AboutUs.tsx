// components/AboutUs.tsx
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

const AboutUs: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>About Us</Typography>
                    <Typography variant="h5" gutterBottom>
                        We are a team of dedicated professionals committed to providing the best services for our users.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Our team is composed of experts in various fields, all working together to create a platform that meets the needs of our users. We are driven by our passion for innovation and our commitment to excellence. We believe in the power of technology to transform lives and we are dedicated to making a positive impact through our platform.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AboutUs;
