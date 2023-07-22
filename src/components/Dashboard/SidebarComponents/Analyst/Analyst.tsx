import React, { useEffect, useState } from 'react';
import {Income, Member} from "../../../../hooks/useMember";
import { getIncomesForFamily } from "../../../../API/api";

interface AnalystProps {
    member: Member;
}

const Analyst: React.FC<AnalystProps> = ({ member }) => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        if(member.FamilyID) {
            setIsLoading(true);
            getIncomesForFamily(member.FamilyID)
                .then((res) => {
                    console.log('Data from server:', res);  // This will log the response
                    if (Array.isArray(res)) {
                        setIncomes(res);
                    } else {
                        console.log('Unexpected data format:', res);
                        setError('Unexpected data format from server');
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


    return (
        <div>
            <h1>Welcome, {member.MemberName}</h1>
            <p>You are logged in as an analyst.</p>
            <h2>Family Overview:</h2>
            {renderIncomes()}
        </div>
    );
};

export default Analyst;
