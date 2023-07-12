// LoanBox.styles.ts
import { makeStyles } from '@material-ui/core/styles';

export const useSliderSwitchStyles = makeStyles({
    switchBase: {
        color: 'grey',
        '&$checked': {
            color: 'blue',
        },
        '&$checked + $track': {
            backgroundColor: 'blue',
        },
    },
    checked: {},
    track: {},
});
