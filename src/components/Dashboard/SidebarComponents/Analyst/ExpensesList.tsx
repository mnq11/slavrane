import React from 'react';
import {Expense} from "../../../../hooks/useMember";

//Expense List Component
const ExpensesList: React.FC<{expenses: Expense[]}> = ({expenses}) => (
    <>
        <h2>Family Expenses:</h2>
        <ul>
            {expenses.map((expense, index) => (
                <li key={index}>
                    <p>Expense ID: {expense.ExpenseID}</p>
                    <p>Family ID: {expense.FamilyID}</p>
                    <p>Member ID: {expense.MemberID}</p>
                    <p>Category: {expense.Category}</p>
                    <p>Amount: {expense.Amount}</p>
                    <p>Date: {new Date(expense.Date).toLocaleDateString()}</p>
                    <p>Recurring: {expense.Recurring ? "Yes" : "No"}</p>
                    <p>Frequency: {expense.Frequency}</p>
                </li>
            ))}
        </ul>
    </>
);

export default ExpensesList;
