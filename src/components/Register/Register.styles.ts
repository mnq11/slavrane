// Register.styles.ts
import { makeStyles } from '@material-ui/core/styles';

const useRegisterStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default useRegisterStyles;