// styles.ts

import {makeStyles} from '@material-ui/core/styles';

const colors = {
    darkBlue: '#0d47a1',
    lightBlue: '#1976d2',
    white: '#fff',
    red: '#f44336',
    darkRed: '#c62828',
    green: '#2e7d32',
    darkGreen: '#1b5e20',
    darkYellow: '#a27c20',
    lightYellow: '#c4a929',
};
export const MemberDetailsStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1),
            padding: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(2),
        backgroundColor: colors.green,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.darkGreen,
        },
    },
    updateButton: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(3),
        backgroundColor: colors.darkYellow,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.lightYellow,
        },
    },
    deleteButton: {
        margin: theme.spacing(2),
        backgroundColor: colors.red,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.darkRed,
        },
    },
    backButton: {
        margin: theme.spacing(2),
        backgroundColor: colors.darkBlue,
        color: colors.white,
        '&:hover': {
            backgroundColor: colors.lightBlue,
        }
    }
}));


export const MembersCardsViewStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
    },
    textField: {
        margin: theme.spacing(2, 0),
    },
    button: {
        margin: theme.spacing(2, 0),
        float: 'right',
        backgroundColor: colors.green,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.15s ease-in-out',
        '&:hover': {
            transform: 'scale3d(1.05, 1.05, 1)'
        },
    },
    cardContent: {
        padding: theme.spacing(2),
    },
    pagination: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
}));

export const MemberFormStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: theme.spacing(1),
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
        },
        '& .MuiInputAdornment-positionStart': {
            marginRight: '10px',
        },
    },
    select: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
        '& .MuiInputLabel-root': {
            color: '#4a4a4a',
            fontSize: '1.2em',
        },
        '& .Mui-focused .MuiInputLabel-root': {
            color: '#00acc1',
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
        '& .MuiListItem-button:hover': {
            backgroundColor: '#e0f7fa',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    dialogActions: {
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        backgroundColor: '#e3f2fd',
    },
    errorText: {
        color: 'red',
    },
}));
