import React, { useEffect, useState } from 'react';
import {Expense, Income, Member} from "../../../../hooks/useMember";
import {getIncomesForFamily, getTotalExpense} from "../../../../API/api";

interface AnalystProps {
    member: Member;
}

const Analyst: React.FC<AnalystProps> = ({ member }) => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses,setExpenses] = useState<Expense[]>([]); // Changed from Expense to expenses
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if(member.FamilyID) {
            setIsLoading(true);

            getIncomesForFamily(member.FamilyID)
                .then((res) => {
                    if (Array.isArray(res)) {
                        setIncomes(res);
                    } else {
                        throw new Error('Unexpected data format from server');
                    }
                })
                .catch((err) => {
                    setError(err.message);
                });

            getTotalExpense(member.FamilyID)
                .then((res) => {
                    if (Array.isArray(res)) {
                        setExpenses(res); // Save the returned expenses
                    } else {
                        throw new Error('Unexpected data format from server');
                    }
                })
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [member.FamilyID]);

    const renderIncomes = () => {
        if (error) {
            return <p>Error: {error}</p>;
        }

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <>
                <h2>Family Incomes:</h2>
                <ul>
                    {incomes.map((income, index) => (
                        <li key={index}>
                            <p>Income ID: {income.IncomeID}</p>
                            <p>Family ID: {income.FamilyID}</p>
                            <p>Member ID: {income.MemberID}</p>
                            <p>Source: {income.Source}</p>
                            <p>Amount: {income.Amount}</p>
                            <p>Date: {new Date(income.Date).toLocaleDateString()}</p>
                            <p>Frequency: {income.Frequency}</p>
                        </li>
                    ))}
                </ul>
            </>
        );
    };
    const renderExpenses = () => {
        return (
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
    };

    return (
        <div>
            <h1>Welcome, {member.MemberName}</h1>
            <p>You are logged in as an analyst.</p>
            <h2>Family Overview:</h2>
            {renderIncomes()}
            {renderExpenses()}
        </div>
    );
};

export default Analyst;