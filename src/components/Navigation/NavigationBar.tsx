// NavigationBar.tsx
import React, {useCallback, useMemo} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Switch, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useAppState} from '../../hooks/useAppState';

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

interface NavigationBarProps {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({darkMode, setDarkMode}) => {
    const {state, dispatch} = useAppState();
    const classes = useStyles();

    const handleLogout = useCallback(() => {
        dispatch({type: 'LOGOUT'});
    }, [dispatch]);

    const handleThemeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDarkMode(event.target.checked);
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
            {path: "/logout", label: "Logout", onClick: handleLogout}
        ] : [
            {path: "/login", label: "Login"},
            {path: "/register", label: "Register"}
        ];
    }, [state.isLoggedIn, handleLogout]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {homeLink}
                    </Typography>
                    <Switch
                        checked={darkMode}
                        onChange={handleThemeChange}
                        name="checkedA"
                        inputProps={{'aria-label': 'Toggle dark mode'}}
                    />
                    <Box display="flex">
                        {buttons.map(({path, label, onClick}) => (
                            <Button color="inherit" onClick={onClick} key={path}>
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
