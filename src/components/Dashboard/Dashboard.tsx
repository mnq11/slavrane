// Dashboard.tsx
import React, {useEffect, useState} from 'react';
import {useMediaQuery, useTheme, IconButton, Typography} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../../hooks/useUser';
import {useDashboardStyles} from "./DashboardStyleing/Dashboard.styles";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import Sidebar from './Sidebar';
import Loading from '../ErrorHandling/Loading';

const Dashboard: React.FC = () => {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user] = useUser();
    const navigate = useNavigate();
    const classes = useDashboardStyles();

    useEffect(() => {
        if (!user) {
            const timer = setTimeout(() => {
                navigate('/login');
                setError(true);
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
            >
                <MenuIcon />
            </IconButton>
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.toolbar} />
                {/* Add your main content here */}
                <Typography variant="h6">Main Content</Typography>
            </main>
            <Loading loading={loading} error={error} />
        </div>
    );
};

export default Dashboard;
