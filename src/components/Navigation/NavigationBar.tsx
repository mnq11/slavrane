// NavigationBar.tsx
import React, {useCallback, useMemo} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Box, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useAppState} from '../../hooks/useAppState';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import {alpha} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.default,
    },
    title: {
        flexGrow: 1,
        fontFamily: '"Josefin Sans", sans-serif',
        fontSize: '2.5rem',
        letterSpacing: '0.1rem',
        transition: 'all 0.3s ease',
        color: theme.palette.type === 'dark' ? theme.palette.text.primary : theme.palette.text.primary,
        padding: theme.spacing(0, 2), // added padding
        '&:hover': {
            color: theme.palette.type === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.main,
        },
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
        transition: 'color 0.7s ease-in-out',
        '&:hover': {
            color: theme.palette.secondary.main,
        },
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1), // added margin
        transition: 'transform 0.7s',
        color: theme.palette.type === 'dark' ? theme.palette.text.primary : theme.palette.text.primary,
        '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: theme.palette.type === 'dark' ? alpha(theme.palette.secondary.main, 0.1) : alpha(theme.palette.primary.main, 0.1),
        },
    },
    toolbar: {
        ...theme.mixins.toolbar, // Add this line
        padding: theme.spacing(0, 2), // padding on left and right
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.background.paper,
    },

    appBar: {
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // added boxShadow
        zIndex: theme.zIndex.drawer + 1,

    },
    themeIcon: {
        color: theme.palette.type === 'dark' ? theme.palette.text.primary : theme.palette.text.primary,
        marginRight: theme.spacing(2), // added margin
        transition: 'transform 0.3s ease, color 0.3s ease', // added transition
        '&:hover': {
            transform: 'scale(1.2)',
            color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark, // change color on hover
        },
    },
    icon: {
        transition: 'color 0.3s ease', // added transition
    },
}));


interface NavigationBarProps {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({darkMode, setDarkMode}) => {
    const {state, dispatch} = useAppState();
    const classes = useStyles();

    const handleLogout = useCallback(() => {
        dispatch({type: 'LOGOUT'});
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }, [dispatch]);

    const handleThemeChange = useCallback(() => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    }, [setDarkMode]);
    useCallback((path: string, label: string) => (
        <Button color="inherit" aria-label={label}>
            <RouterLink to={path} className={classes.link}>{label}</RouterLink>
        </Button>
    ), [classes.link]);
    const homeLink = useMemo(() => <RouterLink to="/" className={classes.link}>Home</RouterLink>, [classes.link]);

    const buttons = useMemo(() => {
        return state.isLoggedIn ? [
            {path: "/dashboard", label: "Dashboard"},
            {path: "/", label: "Logout", onClick: handleLogout}
        ] : [
            {path: "/login", label: "Login"},
            {path: "/register", label: "Register"}
        ];
    }, [state.isLoggedIn, handleLogout]);


    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="transparent" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        {homeLink}
                    </Typography>
                    <IconButton onClick={handleThemeChange} className={classes.themeIcon}>
                        {darkMode ? <Brightness7Icon className={classes.icon}/> : <Brightness4Icon className={classes.icon}/>}
                    </IconButton>

                    <Box display="flex">
                        {buttons.map(({path,label, onClick}) => (
                            <Button color="inherit" onClick={onClick} key={path} className={classes.button}>
                                <RouterLink to={path} className={classes.link}>{label}</RouterLink>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavigationBar;

