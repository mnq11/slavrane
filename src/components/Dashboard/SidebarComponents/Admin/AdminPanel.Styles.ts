import { makeStyles } from '@material-ui/core/styles';

export const MemberDetailsViewStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: '100vh',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
    card: {
        padding: theme.spacing(2),
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    toggleAllCard: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    toggleAllButton: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
    },
}));
