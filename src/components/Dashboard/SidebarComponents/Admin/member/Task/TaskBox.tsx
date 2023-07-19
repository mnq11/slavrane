import React, {useState, useEffect} from 'react';
import {FormControlLabel, Button,  Switch,} from '@material-ui/core';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Member, Tasks} from "../../../../../../hooks/useMember";
import TasksTableComponent from "./TasksTableComponent";
import {getTasksForMember, createTask, deleteTask, updateTask} from "../../../../../../API/api";
import {useSliderSwitchStyles} from "../Lone/LoanBox.styles";
import TaskForm from "./TaskForm";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
    member: Member;
}

const TaskBox: React.FC<CheckboxProps> = ({label, checked, onChange, member}) => {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Tasks | null>(null);

    const classes = useSliderSwitchStyles();

    useEffect(() => {
        if (checked) {
            getTasksForMember(member.MemberID)
                .then(tasks => setTasks(tasks))
                .catch(error => {
                    toast.error('Failed to fetch tasks: ' + error.message);
                });
        }
    }, [checked, member.MemberID]);

    const handleNewTask = () => {
        setOpen(true);
        toast.info('Creating a new task');
    }

    const handleSubmit = (values: any) => {
        const taskData = {
            TaskID: editingTask ? editingTask.TaskID : undefined,
            MemberID: member.MemberID,
            TaskName: values.TaskName,
            Description: values.Description,
            DueDate: values.DueDate,
            TaskStatus: values.TaskStatus,
            Priority: values.Priority
        };
        if (editingTask) {
            updateTask(taskData)
                .then(updatedTask => {
                    setTasks(tasks.map(task => task.TaskID === editingTask?.TaskID ? updatedTask : task));
                    setOpen(false);
                    toast.success('Task updated successfully');
                })
                .catch(error => {
                    toast.error('Failed to update task: ' + error.message);
                });
        } else {
            createTask(taskData)
                .then(newTask => {
                    setTasks([newTask, ...tasks]);
                    setOpen(false);
                    toast.success('Task created successfully');
                })
                .catch(error => {
                    toast.error('Failed to create task: ' + error.message);
                });
        }
    };

    const handleUpdateTask = async (TaskID: number, TaskData: Tasks) => {
        setEditingTask(TaskData);
        setOpen(true);
    };


    const handleDeleteTask = (TaskID: number) => {
        deleteTask(TaskID)
            .then(() => {
                setTasks(tasks.filter(task => task.TaskID !== TaskID));
                if (editingTask && editingTask.TaskID === TaskID) {
                    setOpen(false);
                    setEditingTask(null); // clear the editing income
                }
                toast.success('Task deleted successfully');
            })
            .catch((error) => {
                toast.error(`Failed to delete task: ${error.message}`);
            });
    };

    return (
        <>
            <div className={classes.container}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={onChange}
                            color="primary"
                            className={classes.switch}
                        />
                    }
                    label={label}
                    labelPlacement="start"
                    className={classes.label}
                />
            </div>
            {checked && (
                <div>
                    <h4>Tasks {member.MemberID}</h4>

                    <Button variant="contained" color="primary" onClick={handleNewTask}>Create New Task</Button>

                    <TaskForm
                        open={open}
                        onClose={() => setOpen(false)}
                        onSubmit={handleSubmit}
                        initialValues={{
                            MemberID: member.MemberID || -1,
                            TaskName: editingTask?.TaskName || 'Enter new task name',
                            Description: editingTask?.Description || 'Enter task description',
                            DueDate: editingTask?.DueDate || new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().slice(0,10),
                            TaskStatus: editingTask?.TaskStatus ||"Not Started",
                            Priority: editingTask?.Priority || 1
                        }}
                    />

                    <TasksTableComponent tasks={tasks} handleUpdateTask={handleUpdateTask}
                                         handleDeleteTask={handleDeleteTask}/>
                </div>
            )}
        </>
    );
};

export default TaskBox;
