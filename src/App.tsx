// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import {createTheme, ThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState(null); // Add this
    const [darkMode, setDarkMode] = React.useState(false);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    type: darkMode ? 'dark' : 'light',
                },
            }),
        [darkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <ToastContainer />
                <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} setDarkMode={setDarkMode} />
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} /> {/* Pass setUser to Login */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} user={user} setUser={setUser} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
