import { makeStyles, createStyles } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: theme.palette.type === 'dark' ? 'linear-gradient(135deg, #670d10 0%,#092756 100%)' : 'linear-gradient(135deg, #ff6b6b 0%,#ffe66d 100%)',
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(3),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            width: 300,
            height: 300,
            [theme.breakpoints.up('md')]: {
                width: '50%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '80%',
            },
        },
        form: {
            width: '100%',
        },
        textField: {
            marginBottom: theme.spacing(2),
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.text.secondary,
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.text.secondary,
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.text.secondary,
                },
            },
        },
        submitButton: {
            marginTop: theme.spacing(2),
            background: theme.palette.primary.main,
            border: `1px solid ${theme.palette.secondary.main}`,
            color: theme.palette.text.primary,
            textShadow: '1px 1px 1px rgba(0,0,0,0.4)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s',
            '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            },
        },
    })
);

export default useStyles;
