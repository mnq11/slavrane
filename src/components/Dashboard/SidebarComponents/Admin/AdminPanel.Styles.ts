import { makeStyles } from '@material-ui/core/styles';

export const MemberDetailsViewStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: '100vh',
    },
    title: {
        marginBottom: theme.spacing(2),
        color: '#3f51b5', // dark blue title
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#3f51b5', // dark blue button
    },
    card: {
        padding: theme.spacing(2),
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff', // white card
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)', // shadow for depth
    },
    toggleAllCard: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#3f51b5', // dark blue card
        color: '#fff', // white text
    },
    toggleAllButton: {
        fontWeight: 'bold',
    },
}));

export const FamiliesViewStyles = makeStyles({
    row: {
        cursor: 'pointer',
        '&:hover': {
        },
    },
    table: {
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)', // shadow for depth
    },
});
