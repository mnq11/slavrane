// components/Dashboard.tsx
import React from 'react';
import { Card, Text } from '@nextui-org/react';

const Dashboard: React.FC = () => {
    return (
        // Dashboard.tsx
        <Card style={{ padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Text h2>Dashboard</Text>
            {/* Add dashboard content here */}
        </Card>
    );
};

export default Dashboard;
