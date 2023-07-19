// Income.styles.ts
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const IncomeStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        title: {
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginBottom: theme.spacing(2),
        },
        switchBox: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
        },
        dialogAction: {
            justifyContent: 'space-around',
        },
    }));