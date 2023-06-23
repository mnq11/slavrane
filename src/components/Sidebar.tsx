// components/Sidebar.tsx
import React from 'react';
import { Card, Text } from '@nextui-org/react';

const Sidebar: React.FC = () => {
    return (
        <Card style={{ padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Text h2>Sidebar</Text>
            {/* Add sidebar content here */}
        </Card>
    );
};

export default Sidebar;
