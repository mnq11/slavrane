// Dashboard.tsx
import React, {useEffect, useState} from 'react';
import {useMediaQuery, useTheme, IconButton} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import {useMember} from '../../hooks/useMember';
import {useDashboardStyles} from "./DashboardStyleing/Dashboard.styles";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import Sidebar from './Sidebar';
import Loading from '../ErrorHandling/Loading';
import Welcome from "./SidebarComponents/User/Welcome";
const Dashboard: React.FC = () => {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user] = useMember();
    const navigate = useNavigate();
    const classes = useDashboardStyles();
    const [content, setContent] = useState<JSX.Element | null>(user ? <Welcome member={user} /> : <Welcome member={null} />);

    const handleContentChange = (newContent: JSX.Element) => {
        setContent(newContent);
    };

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            const timer = setTimeout(() => {
                navigate('/login');
                setError('No user found. Redirecting to login.');
            }, 2000);
            return () => {
                clearTimeout(timer);
                setError(null);
            };
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
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} onContentChange={handleContentChange} member={user} />
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                {content} {/* Removed the div with classes.toolbar */}
            </main>
            <Loading loading={loading} error={error} />
        </div>
    );
};

export default Dashboard;
