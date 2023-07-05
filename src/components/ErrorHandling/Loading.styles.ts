// Loading.styles.ts
import { makeStyles } from '@material-ui/core/styles';

export const useLoadingStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    // other styles...
}));