
// components/ContactUs.tsx
import React from 'react';
import { Card, Typography } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        maxWidth: '100%',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1px',
        textAlign: 'center',
        marginTop: '2px',
    },
}));
const ContactUs: React.FC = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Typography variant="h2">Contact Us</Typography>
            <Typography variant="body1">This is a placeholder for your contact us content.</Typography>
        </Card>
    );
};

export default ContactUs;
