// Sidebar.tsx
import React from 'react';
import {Drawer, List, ListItem, ListItemText, IconButton} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useSidebarStyles} from "./DashboardStyleing/Dashboard.styles";
import {Member} from "../../hooks/useMember"; // Import the User interface
import Welcome from './SidebarComponents/User/Welcome';
import UserSettings from './SidebarComponents/User/UserSettings';
import Family from "./SidebarComponents/User/Family";
import Task from "./SidebarComponents/User/Task";
import Resource from "./SidebarComponents/User/Resource";
import Skill from "./SidebarComponents/User/Skill";
import Income from "./SidebarComponents/User/Income";
import Expense from "./SidebarComponents/User/Expense";
import Savings from "./SidebarComponents/User/Savings";
import AdminPanel from "./SidebarComponents/Admin/AdminPanel";
import Analyst from "./SidebarComponents/Analyst/Analyst";
import Moderator from "./SidebarComponents/Moderator/Moderator";
import Watcher from "./SidebarComponents/User/Watcher";

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
        ...(member.Role === 'admin' ? [{label: 'Admin Panel', content: <AdminPanel member={member} />}] : []),
        ...(member.Role === 'moderator' || member.Role === 'admin' ? [{label: 'Moderation', content: <Moderator member={member} />}] : []),
        ...(member.Role === 'analyst' || member.Role === 'moderator' || member.Role === 'admin' ? [{label: 'Analyses', content: <Analyst member={member} />}] : []),
        {label: 'Family', content: <Family member={member} />},
        {label: 'Task', content: <Task member={member} />},
        {label: 'Resource', content: <Resource member={member} />},
        {label: 'Skill', content: <Skill member={member} />},
        {label: 'Income', content: <Income member={member} />},
        {label: 'Expense', content: <Expense member={member} />},
        {label: 'Savings', content: <Savings member={member} />},
        {label: 'Member Settings', content: <UserSettings member={member}/>},
        {label: 'Watcher', content: <Watcher />},

        // Add more items here
    ] : [
        {label: 'Welcome', content: <Welcome member={member} />},
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
