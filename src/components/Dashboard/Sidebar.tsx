// Sidebar.tsx
import React from 'react';
import {Drawer, List, ListItem, ListItemText, IconButton} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useSidebarStyles} from "./DashboardStyleing/Dashboard.styles";
import {Member} from "../../hooks/useMember"; // Import the User interface
import Welcome from './SidebarComponents/Welcome';
import UserSettings from './SidebarComponents/UserSettings';
import Role from "./SidebarComponents/Role";
import Family from "./SidebarComponents/Family";
import Task from "./SidebarComponents/Task";
import Resource from "./SidebarComponents/Resource";
import Skill from "./SidebarComponents/Skill";
import Income from "./SidebarComponents/Income";
import Expense from "./SidebarComponents/Expense";
import Savings from "./SidebarComponents/Savings";

interface SidebarProps {
    open: boolean;
    handleDrawerClose: () => void;
    onContentChange: (newContent: JSX.Element) => void;
    member: Member | null;
}

const Sidebar: React.FC<SidebarProps> = ({open, handleDrawerClose, onContentChange, member}) => {
    const sidebarClasses = useSidebarStyles();

    const menuItems = member ? [
        {label: 'Welcome', content: <Welcome member={member} />},
        {label: 'Family', content: <Family member={member} />}, // Replace with your actual component
        {label: 'Role', content: <Role member={member} />}, // Replace with your actual component
        {label: 'Task', content: <Task member={member} />}, // Replace with your actual component
        {label: 'Resource', content: <Resource member={member} />}, // Replace with your actual component
        {label: 'Skill', content: <Skill member={member} />}, // Replace with your actual component
        {label: 'Income', content: <Income member={member} />}, // Replace with your actual component
        {label: 'Expense', content: <Expense member={member} />}, // Replace with your actual component
        {label: 'Savings', content: <Savings member={member} />}, // Replace with your actual component
        {label: 'Member Settings', content: <UserSettings />},
        // Add more items here
    ] : [
        {label: 'Welcome', content: <Welcome member={{ FullName: 'Guest' }} />},
        // Add more items here
    ];

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
                <IconButton onClick={handleDrawerClose} className={sidebarClasses.closeButton}>
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>
            </div>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index} onClick={() => onContentChange(item.content)} className={sidebarClasses.listItem}>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;