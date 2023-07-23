import React, {useEffect, useState} from 'react';
import {Expense, Income, Loan, Member, Savings} from "../../../../hooks/useMember";
import {
    getFamilyMembers,
    getIncomesForFamily,
    getTotalExpense,
    getTotalLoan,
    getTotalSaving
} from "../../../../API/api";

import IncomesList from './IncomesList';
import ExpensesList from './ExpensesList';
import SavingsList from './SavingsList';
import LoansList from './LoansList';
import MembersList from './MembersList';

interface AnalystProps {
    member: Member;
}

const Analyst: React.FC<AnalystProps> = ({member}) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [savings, setSavings] = useState<Savings[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if (member.FamilyID) {
            setIsLoading(true);

            getFamilyMembers(member.FamilyID)
                .then((res) => {
                    if (Array.isArray(res)) {
                        setMembers(res);
                    } else {
                        throw new Error('Unexpected data format from server');
                    }
                })
                .catch((err) => {
                    setError(err.message);
                });

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
                        setExpenses(res);
                    } else {
                        throw new Error('Unexpected data format from server');
                    }
                })
                .catch((err) => {
                    setError(err.message);
                });

            getTotalSaving(member.FamilyID)
                .then((res) => {
                    if (Array.isArray(res)) {
                        setSavings(res);
                    } else {
                        throw new Error('Unexpected data format from server');
                    }
                });

            getTotalLoan(member.FamilyID)
                .then((res) => {
                    if (Array.isArray(res)) {
                        setLoans(res);
                    } else {
                        throw new Error('Unexpected data format from server');
                    }
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
                {/*<IncomesList incomes={incomes}/>*/}
                <ExpensesList expenses={expenses}/>
                {/*<SavingsList savings={savings}/>*/}
                {/*<LoansList loans={loans}/>*/}
                {/*<MembersList members={members}/>*/}
            </>}
        </div>
    );
};

export default Analyst;
