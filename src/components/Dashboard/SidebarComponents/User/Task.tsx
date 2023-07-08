// components/Task.tsx
import React from 'react';
import { Member, Task as TaskType } from '../../../../hooks/useMember';

interface TaskProps {
    member: Member;
}

const Task: React.FC<TaskProps> = ({ member }) => {
    const tasks = member.Tasks;

    if (!tasks || tasks.length === 0) {
        return <div>No task information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.MemberName}'s Tasks</h1>
            {tasks.map((task: TaskType) => (
                <div key={task.TaskID}>
                    <p>Task ID: {task.TaskID}</p>
                    <p>Task Description: {task.Description}</p>
                    <p>Due Date: {task.DueDate}</p>
                    <p>Status: {task.Status}</p>
                    <p>Created At: {task.createdAt}</p>
                    <p>Updated At: {task.updatedAt}</p>
                </div>
            ))}
        </div>
    );
};

export default Task;
