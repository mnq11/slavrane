import React, {useEffect} from 'react';
import {Grid, Paper, CircularProgress, Typography, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../../hooks/useUser';
import UserGreeting from './UserGreeting';
import {useDashboardStyles, useSidebarStyles} from "./Dashboard.styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(!isMobile);
    const [user] = useUser();
    const navigate = useNavigate();
    const classes = useDashboardStyles({open});
    const sidebarClasses = useSidebarStyles();
    useEffect(() => {
        if (!user) {
            const timer = setTimeout(() => navigate('/login'), 2000);
            return () => clearTimeout(timer);
        }
    }, [user, navigate]);

    useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    if (!user) {
        return (
            <div className={classes.loadingContainer}>
                <CircularProgress />
                <Typography variant="h6">Loading your data...</Typography>
            </div>
        );
    }

    return (
        <main className={classes.main}>
            <Drawer
                className={sidebarClasses.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: sidebarClasses.drawerPaper,
                }}
            >
                <div className={sidebarClasses.drawerHeader}>
                    <IconButton onClick={() => setOpen(!open)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    {/* Add your sidebar items here */}
                    <ListItem button>
                        <ListItemIcon>
                            {/* Your icon */}
                        </ListItemIcon>
                        <ListItemText primary={"Your text"} />
                    </ListItem>
                </List>
            </Drawer>
            <IconButton
                onClick={() => setOpen(!open)}
                edge="start"
                color="inherit"
                aria-label="menu"
                className={clsx(classes.sidebarControl, open && classes.rotate)} // Apply the rotate class when open is true
            >
                <ChevronLeftIcon />
            </IconButton>
            <Grid container>
                <Grid item xs={12} md={open ? 9 : 12}>
                    <Paper className={classes.paper}>
                        <UserGreeting name={user.name} email={user.email} />
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );

};

export default Dashboard;
