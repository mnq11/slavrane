import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Switch, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface NavigationBarProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
}));

const NavigationBar: React.FC<NavigationBarProps> = ({ isLoggedIn, setIsLoggedIn, darkMode, setDarkMode }) => {
    const classes = useStyles();

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Add actual logout logic here
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <RouterLink to="/" className={classes.link}>Home</RouterLink>
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} name="checkedA" inputProps={{ 'aria-label': 'secondary checkbox' }}/>
                    {isLoggedIn ? (
                        <>
                            <Button color="inherit">
                                <RouterLink to="/dashboard" className={classes.link}>Dashboard</RouterLink>
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Box display="flex">
                            <Button color="inherit">
                                <RouterLink to="/login" className={classes.link}>Login</RouterLink>
                            </Button>
                            <Button color="inherit">
                                <RouterLink to="/register" className={classes.link}>Register</RouterLink>
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavigationBar;
