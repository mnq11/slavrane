// components/WelcomeCard.tsx
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
    button: {
        marginTop: theme.spacing(2),
    },
}));

const WelcomeCard: React.FC = () => {
    const classes = useStyles();


    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>Welcome to Our Platform</Typography>
                    <Typography variant="h5" gutterBottom>
                        We provide the best services for you. Explore our platform and discover all the features we have to offer.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Our platform offers a wide range of features designed to help you manage your tasks efficiently. With our user-friendly interface, you can easily navigate through the platform and find what you need. We are committed to providing you with the best experience possible.
                    </Typography>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Explore Now
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default WelcomeCard;
