import { makeStyles } from '@material-ui/core/styles';

export const drawerWidth = 240;

export const useDashboardStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    toolbar: {
        ...theme.mixins.toolbar, // Add this line
        padding: theme.spacing(0, 2), // padding on left and right
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.background.paper,
    },backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
export const useSidebarStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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
