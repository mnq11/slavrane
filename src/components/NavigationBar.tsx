// components/NavigationBar.tsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Text, Spacer, Row } from '@nextui-org/react';

interface NavigationBarProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleLogout = () => {
        setIsLoggedIn(false);
        // Add actual logout logic here
    };

    return (
        <Row justify="space-between" align="center" style={{ padding: '20px' }}>
            <Text h3>
                <RouterLink to="/">Home</RouterLink>
            </Text>
            {isLoggedIn ? (
                <Button auto onClick={handleLogout}>Logout</Button>
            ) : (
                <>
                    <Button auto>
                        <RouterLink to="/login">Login</RouterLink>
                    </Button>
                    <Spacer x={0.5} />
                    <Button auto>
                        <RouterLink to="/register">Register</RouterLink>
                    </Button>
                </>
            )}
        </Row>
    );
};

export default NavigationBar;
