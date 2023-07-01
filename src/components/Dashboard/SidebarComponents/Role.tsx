// components/Task.tsx
import React from 'react';
import { Member } from '../../../hooks/useMember';

interface TaskProps {
    member: Member;
}

const Task: React.FC<TaskProps> = ({ member }) => {
    const tasks = member.tasks;

    if (!tasks || tasks.length === 0) {
        return <div>No task information available for this member.</div>;
    }

    return (
        <div>
            <h1>{member.FullName}'s Tasks</h1>
            {tasks.map((task) => (
                <div key={task.id}>
                    <p>Task ID: {task.id}</p>
                    <p>Task Description: {task.Description}</p>
                    <p>Created At: {task.createdAt}</p>
                    <p>Updated At: {task.updatedAt}</p>
                </div>
            ))}
        </div>
    );
};

export default Task;
