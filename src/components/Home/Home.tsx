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
        width: '100%', // Add this line
        margin: 0, // Add this line
        boxSizing: 'border-box', // Add this line
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();

    // You can now use darkMode and setDarkMode in this component

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
