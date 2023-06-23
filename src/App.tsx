// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { NextUIProvider } from '@nextui-org/react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <NextUIProvider>
            <Router>
                <ToastContainer />
                <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                {isLoggedIn && <Sidebar />}
                <Routes>
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Router>
        </NextUIProvider>
    );
}

export default App;
