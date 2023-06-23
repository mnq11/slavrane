// components/Home.tsx
import React from 'react';
import { Card, Text } from '@nextui-org/react';

const Home: React.FC = () => {
    return (
        <Card style={{ padding: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Text h2>Home</Text>
            {/* Add home content here */}
        </Card>
    );
};

export default Home;
