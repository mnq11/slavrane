// components/Expense.tsx
import React from 'react';
import { Member } from '../../../../hooks/useMember';

interface ExpenseProps {
    member: Member;
}

const Expense: React.FC<ExpenseProps> = ({ member }) => {


    return (
        <div>
            {/*<h1>{member.FullName}'s Expenses</h1>*/}
            {/*{expenses.map((Expense) => (*/}
            {/*    <div key={Expense.ExpenseID}>*/}
            {/*        <p>Expense ID: {Expense.ExpenseID}</p>*/}
            {/*        <p>Expense Category: {Expense.Category}</p>*/}
            {/*        <p>Expense Amount: {Expense.Amount}</p>*/}
            {/*        <p>Expense Frequency: {Expense.Frequency}</p>*/}
            {/*        <p>Expense Start Date: {Expense.StartDate}</p>*/}
            {/*        <p>Expense End Date: {Expense.EndDate}</p>*/}
            {/*    </div>*/}
            {/*// ))}*/}
        </div>
    );
};

export default Expense;
