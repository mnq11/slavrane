import { makeStyles } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    main: (props: { open: boolean }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 64, // height of AppBar
        width: '100vw', // Set width to 100% of viewport width
        marginLeft: props.open ? 240 : 0,
        transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    sidebarControl: {
        position: 'fixed',
        top: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1,
        transition: theme.transitions.create('right', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    rotate: {
        transform: 'rotate(180deg)',
    },
}));
export const useSidebarStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
        marginTop: 64, // height of AppBar
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));
