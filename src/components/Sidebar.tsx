// components/Sidebar.tsx
import React from 'react';
import { Card, Text } from '@nextui-org/react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        padding: '20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
    },
});

const Sidebar: React.FC = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Text h2>Sidebar</Text>
            {/* Add sidebar content here */}
        </Card>
    );
};

export default Sidebar;
