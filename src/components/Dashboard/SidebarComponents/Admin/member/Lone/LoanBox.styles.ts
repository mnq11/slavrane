// LoanBox.styles.ts
import { makeStyles } from '@material-ui/core/styles';

export const useLoanBoxStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(2),
        '& > *': { // Targets all direct children
            margin: theme.spacing(1), // Adds spacing around the children (top, right, bottom, left)
        },
    },
    dialog: {
        '& .MuiDialog-paper': { // Targets the dialog paper
            padding: theme.spacing(2), // Adds padding inside the dialog
        },
    },
}));

