// components/Home.tsx
import React from 'react';
import WelcomeCard from './WelcomeCard';
import AboutUs from './AboutUs';
import OurServices from './OurServices';
import Testimonials from './Testimonials';
import ContactUs from './ContactUs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <WelcomeCard />
            <AboutUs />
            <OurServices />
            <Testimonials />
            <ContactUs />
        </div>
    );
};

export default Home;
