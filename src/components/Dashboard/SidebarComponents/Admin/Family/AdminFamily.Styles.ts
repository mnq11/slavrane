import {makeStyles} from "@material-ui/core/styles";

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

export const FamiliesViewStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    row: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e0e0e0',
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

    card: {
        padding: theme.spacing(3),
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        borderRadius: '5px',
    },

    pagination: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        borderRadius: '5px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .2)',
    },
    textField: {
        marginBottom: 10,

    }
}));
export const DialogComponentStyles = makeStyles({
    dialog: {
        minWidth: '40vw', // or any other value that suits your needs
    },
    title: {
        textAlign: 'center',
        color: '#3f51b5', // choose a color that matches your theme
    },
    content: {
        color: '#333',
        fontSize: '1rem', // adjust size as needed
    },
    textField: {
        marginTop: 15,
    },
    actions: {
        justifyContent: 'center',
    },
    cancelButton: {
        color: '#f50057', // choose a color that matches your theme
    },
    confirmButton: {
        color: '#4caf50', // choose a color that matches your theme
    },
});
export const FamilyDetailsStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        borderRadius: '5px',
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

}))

export const FamilyFormStyles = makeStyles((theme) => ({
        root: {
            padding: theme.spacing(3),

        }
    }
));
