import React, { useEffect, useState } from 'react';
import {Expense, Income, Member} from "../../../../hooks/useMember";
import {getIncomesForFamily, getTotalExpense} from "../../../../API/api";
import IncomesList from './IncomesList'; // Import IncomesList component
import ExpensesList from './ExpensesList'; // Import ExpensesList component

interface AnalystProps {
    member: Member;
}

const Analyst: React.FC<AnalystProps> = ({ member }) => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses,setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if(member.FamilyID) {
            setIsLoading(true);

            // Fetch family income details from API
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

            // Fetch family expense details from API
            getTotalExpense(member.FamilyID)
                .then((res) => {
                    if (Array.isArray(res)) {
                        setExpenses(res);
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

    return (
        <div>
            <h1>Welcome, {member.MemberName}</h1>
            <p>You are logged in as an analyst.</p>
            <h2>Family Overview:</h2>
            {/* Conditional rendering based on loading and error states */}
            {error ? <p>Error: {error}</p> : isLoading ? <p>Loading...</p> : <>
                <IncomesList incomes={incomes} />
                <ExpensesList expenses={expenses} />
            </>}
        </div>
    );
};

export default Analyst;
