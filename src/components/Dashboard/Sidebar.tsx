// Sidebar.tsx
import React from 'react';
import {Drawer, List, ListItem, ListItemText, IconButton} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useSidebarStyles} from "./DashboardStyleing/Dashboard.styles";

interface SidebarProps {
    open: boolean;
    handleDrawerClose: () => void;
}

const menuItems = [
    {label: 'Item 1', onClick: () => console.log('Item 1 clicked')},
    {label: 'Item 2', onClick: () => console.log('Item 2 clicked')},
    // Add more items here
];

const Sidebar: React.FC<SidebarProps> = ({open, handleDrawerClose}) => {
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
                    <ListItem button key={index} onClick={item.onClick}>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
