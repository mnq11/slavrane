
// Sidebar.tsx
import React from 'react';
import {Drawer, List, ListItem, ListItemText, IconButton} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useSidebarStyles} from "./DashboardStyleing/Dashboard.styles";
import Welcome from './Welcome';
import UserSettings from './UserSettings';

interface SidebarProps {
    open: boolean;
    handleDrawerClose: () => void;
    onContentChange: (newContent: JSX.Element) => void;
}

const menuItems = [
    {label: 'Welcome', content: <Welcome />},
    {label: 'User Settings', content: <UserSettings />},
    // Add more items here
];

const Sidebar: React.FC<SidebarProps> = ({open, handleDrawerClose, onContentChange}) => {
    const sidebarClasses = useSidebarStyles();

    return (
        <Drawer
            className={sidebarClasses.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: sidebarClasses.drawerPaper,
            }}
            onClose={handleDrawerClose}
        >
            <div className={sidebarClasses.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index} onClick={() => onContentChange(item.content)}>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;