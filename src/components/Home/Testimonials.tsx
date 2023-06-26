// components/Testimonials.tsx
import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
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

const Testimonials: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} sm={8} md={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h2" gutterBottom>Testimonials</Typography>
                    <Typography variant="h5" gutterBottom>
                        "This platform is amazing! It has everything I need and more. The customer service is also top-notch." - User A
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        "I've been using this platform for a while now and I'm very satisfied with the services. It's easy to use and very reliable." - User B
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        "The best platform I've ever used. Highly recommended!" - User C
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Testimonials;
