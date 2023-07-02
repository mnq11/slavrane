// AdminPanelStyles.ts
import { makeStyles } from '@material-ui/core/styles';

export const AdminPanelStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
    },
    tableContainer: {
        marginTop: theme.spacing(2),
        boxShadow: '0px 0px 14px 0px rgba(0,0,0,0.1)',
    },
    welcome: {
        color: '#3f51b5',
        marginBottom: theme.spacing(2),
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
}));

export const membersPanelStyles = makeStyles((theme) => ({
    tableContainer: {
        marginTop: theme.spacing(2),
        boxShadow: '0px 0px 14px 0px rgba(0,0,0,0.2)',
    },
    table: {
        minWidth: 650,
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover, // change color of every other row
        },
    },
    tableCell: {
        fontWeight: 'bold', // make text bold
    },
}));

export const FamilyPanelStyles = makeStyles((theme) => ({
    tableContainer: {
        marginTop: theme.spacing(2),
        boxShadow: '0px 0px 14px 0px rgba(0,0,0,0.2)',
    },
    table: {
        minWidth: 650,
    },
}));
