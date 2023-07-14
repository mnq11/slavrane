// LoanBox.styles.ts
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useSliderSwitchStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                flexGrow: 1,

        }, container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(2),
            backgroundColor: '#f9f9f9',
            borderRadius: theme.spacing(1),
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: theme.spacing(2),
        },switch: {
            alignSelf: 'center',
        }, label: {
            marginRight: theme.spacing(2),
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#333',
        },
        switchBase: {
            padding: 2,
            '&$checked': {
                transform: 'translateX(36px)',
                '& + $track': {
                    backgroundColor: '#4caf50', // green
                    opacity: 1,
                    border: 'none',
                },
                '& $thumb': {
                    backgroundColor: '#fff',
                },
            },
            '&$focusVisible $thumb': {
                border: '6px solid #fff',
            },
        },
        thumb: {
            width: 30,
            height: 30,
            backgroundColor: '#000', // black
            transition: theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.shortest,
            }),
        },
        track: {
            borderRadius: 34 / 2,
            backgroundColor: '#000', // black
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.shortest,
            }),
        },
        checked: {},
        focusVisible: {},
        onLabel: {
            position: 'absolute',
            left: '8px',
            color: '#fff', // white
            fontSize: '0.8rem',
        },
        offLabel: {
            position: 'absolute',
            right: '8px',
            color: '#808080',
            fontSize: '0.8rem',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },dialogAction: {
            justifyContent: 'center',
        }
    })
);
