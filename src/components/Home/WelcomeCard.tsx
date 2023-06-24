// components/WelcomeCard.tsx
import React from 'react';
import { Card, Text, Button } from '@nextui-org/react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        maxWidth: '800px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
    },
    button: {
        marginTop: '20px',
    },
}));

const WelcomeCard: React.FC = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Text h2>Welcome to Our Platform</Text>
            <Text >
                We provide the best services for you. Explore our platform and discover all the features we have to offer.
            </Text>
            <Button color="primary" auto className={classes.button}>
                Explore Now
            </Button>
        </Card>
    );
};

export default WelcomeCard;
