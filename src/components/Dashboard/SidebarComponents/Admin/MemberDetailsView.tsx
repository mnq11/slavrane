// MemberDetailsView.tsx
import React from 'react';
import {Expense, Family, Income, Member, Resource, Role, Savings, Skill, Task} from "../../../../hooks/useMember";


interface MemberDetailsViewProps {
    member: Member;
    tasks: Task[];
    resources: Resource[];
    incomes: Income[];
    expenses: Expense[];
    family: Family | null;
    roles: Role[];
    savings: Savings[];
    skills: Skill[];
}


const MemberDetailsView: React.FC<MemberDetailsViewProps> = ({ member, tasks, resources, incomes, expenses, family, roles, savings, skills }) => {
    // Render the member details, tasks, resources, incomes, expenses, family, roles, savings, and skills here
    return (
        <div>
            <h2>{member.FullName}</h2>
            <h3>Family</h3>
            {family ? <div>{family.FamilyName}</div> : <div>No family data available</div>}
            <h3>Tasks</h3>
            {
                tasks.map(task => (
                    <div key={task.TaskID}>{task.Description}</div>
                ))
            }
            <h3>Resources</h3>
            {
                resources.map(resource => (
                    <div key={resource.ResourceID}>{resource.ResourceType}</div>
                ))
            }
            <h3>Incomes</h3>
            {
                incomes.map(income => (
                    <div key={income.IncomeID}>{income.Amount}</div>
                ))
            }
            <h3>Expenses</h3>
            {
                expenses.map(expense => (
                    <div key={expense.ExpenseID}>{expense.Amount}</div>
                ))
            }

            <h3>Roles</h3>
            {
                roles.map(role => (
                    <div key={role.RoleID}>{role.RoleName}</div>
                ))
            }
            <h3>Savings</h3>
            {
                savings.map(saving => (
                <div key={saving.id}>{saving.amount}</div>))
            }
            <h3>Skills</h3>
            {
                skills.map(skill => (
                    <div key={skill.SkillID}>{skill.SkillName}</div>
                ))
            }
        </div>
    );
};

export default MemberDetailsView;
