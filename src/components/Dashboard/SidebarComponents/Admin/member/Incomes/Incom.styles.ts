// Income.styles.ts
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const IncomeStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
        }, label: {
            marginRight: theme.spacing(2),
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#333',
        },
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing(2),
        },
        switch: {
            alignSelf: 'center',
        },
        dialogAction: {
            justifyContent: 'center',
        },
    }));
