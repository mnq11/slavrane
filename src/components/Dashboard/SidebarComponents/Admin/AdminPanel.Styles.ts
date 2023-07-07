import {makeStyles} from '@material-ui/core/styles';

// Define your color scheme
const colors = {
    darkBlue: '#3f51b5',
    lightBlue: '#303f9f',
    white: '#fff',
    red: '#f44336',
    darkRed: '#d32f2f',
    green: '#4caf50',
    darkGreen: '#388e3c',

};

export const MemberDetailsViewStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: '100vh',
    },
    title: {
        marginBottom: theme.spacing(2),
        color: colors.darkBlue,
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: colors.darkBlue,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.lightBlue,
        },
    },
    card: {
        padding: theme.spacing(2),
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    toggleAllCard: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue,
        color: colors.white,
    },
    toggleAllButton: {
        fontWeight: 'bold',
    },
}));

export const FamiliesViewStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    row: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e0e0e0',
        },
    },

    button: {
        margin: theme.spacing(1),
        backgroundColor: colors.green,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.darkGreen,
        },
    },
    updateButton: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(2),
        backgroundColor: colors.darkBlue,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.lightBlue,
        },
    },
    deleteButton: {
        margin: theme.spacing(1),
        backgroundColor: colors.red,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.darkRed,
        },
    },
    dialog: {
        padding: theme.spacing(2),
    },
    dialogTitle: {
        color: colors.darkBlue,
    },
    dialogContent: {
        marginBottom: theme.spacing(2),
    },
    dialogActions: {
        justifyContent: 'space-between',
    },
    createButton: {
        margin: theme.spacing(1),
        backgroundColor: colors.green,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.darkGreen,
        },
    },

    card: {
        padding: theme.spacing(2),
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    toggleAllCard: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',

        '&:hover': {
            backgroundColor: '#e0e0e0',
        },
    },
}));


export const MembersViewStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    table: {
        marginTop: theme.spacing(2),
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: colors.darkBlue,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.lightBlue,
        },
    },
    updateButton: {
        margin: theme.spacing(1),
        backgroundColor: colors.lightBlue,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.darkBlue,
        },
    },
    deleteButton: {
        margin: theme.spacing(1),
        backgroundColor: colors.red,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.darkRed,
        },
    },
    createButton: {
        margin: theme.spacing(1),
        backgroundColor: colors.green,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.darkGreen,
        },
    },
}));

export const DetailedCardStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
    item: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}));
