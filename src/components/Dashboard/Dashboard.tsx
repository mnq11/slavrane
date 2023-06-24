// Dashboard.tsx
import React, {useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Sidebar from "./Sidebar";
import {useUser} from '../../hooks/useUser'; // import useUser hook

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    main: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 64, // height of AppBar
        width: '100vw', // Set width to 100% of viewport width
    },
}));

const Dashboard: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [user] = useUser(); // use the useUser hook
    useEffect(() => {
        setOpen(true);
        console.log('user in the dashboard : ',user);
    }, [user]);
    if (!user) {
        return null;
    }
    return (
        <main className={classes.main} style={{marginLeft: open ? 240 : 0}}>
            <Grid container>
                {open && (
                    <Sidebar open={open} setOpen={setOpen}/>
                )}
                <Grid item xs={open ? 9 : 12}>
                    <Paper className={classes.paper}>
                        <h3>Welcome, {user?.name}</h3>
                        <p>Your email is {user?.email}</p>
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
};

export default Dashboard;
