import {makeStyles} from '@material-ui/core/styles';

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
        ...theme.mixins.toolbar,
        padding: theme.spacing(0, 2),
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
    },
}));

export const useSidebarStyles = makeStyles((theme) => ({

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaper: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
    },
    listItem: {
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100],
        },
    },
    closeButton: {
        marginTop: theme.spacing(8), // Add this line

        color: theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
    },
}));