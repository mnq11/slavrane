// App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppStateProvider } from './AppStateContext';
import NavigationBar from "./components/Navigation/NavigationBar";
import { useDarkMode } from './hooks/useDarkMode';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const Home = lazy(() => import('./components/Home/Home'));

function App() {
    const [darkMode, setDarkMode] = useDarkMode();

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
            <AppStateProvider>
                <Router>
                    <NavigationBar darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <ToastContainer/>
                    <div style={{ width: '100%', height: '100%' }}> {/* Add this line */}
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                                <Route path="/" element={<Home/>}/>
                            </Routes>
                        </Suspense>
                    </div> {/* Add this line */}
                </Router>
            </AppStateProvider>
        </ThemeProvider>
    );
}

export default App;
