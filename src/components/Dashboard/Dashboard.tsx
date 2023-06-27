// Dashboard.tsx
import React, {useEffect, useState} from 'react';
import {useMediaQuery, useTheme, IconButton} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import {useUser} from '../../hooks/useUser';
import {useDashboardStyles} from "./DashboardStyleing/Dashboard.styles";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import Sidebar from './Sidebar';
import Loading from '../ErrorHandling/Loading';
import Welcome from "./Welcome";

const Dashboard: React.FC = () => {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user] = useUser();
    const navigate = useNavigate();
    const classes = useDashboardStyles();
    const [content, setContent] = useState<JSX.Element | null>(<Welcome />); // Set default content to Welcome

    const handleContentChange = (newContent: JSX.Element) => {
        setContent(newContent);
    };
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
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={classes.menuButton}
            >
                <MenuIcon fontSize="large" />
            </IconButton>
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} onContentChange={handleContentChange} />
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.toolbar} />
                {content}
            </main>
            <Loading loading={loading} error={error} />
        </div>
    );
};

export default Dashboard;
