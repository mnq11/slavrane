// components/Dashboard.tsx
import React, {useEffect} from 'react';
import {Card, Text} from '@nextui-org/react';
import Sidebar from "../Sidebar";

// Define a type for the user info


interface DashboardProps {
    isLoggedIn: boolean;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>; // Add this
}

const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn, user,setUser }) => {
    useEffect(() => {
        // Fetch user info from local storage
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUser(JSON.parse(storedUserInfo)); // Change this line
        }
    }, [isLoggedIn]);  // Add isLoggedIn as a dependency

    useEffect(() => {
        // This will run whenever userInfo changes
        if (user) {
            console.log(`User info: ${user}`);
        }

    }, [user]);// Add userInfo as a dependency

    return (
        <Card>
            <Sidebar/>

            <Text h3>Welcome, {user?.name}</Text>
            <Text>Your email is {user?.email}</Text>

        </Card>
    );
};

export default Dashboard;
