import React from 'react';
import {Income} from "../../../../hooks/useMember";

//Income List Component
const IncomesList: React.FC<{incomes: Income[]}> = ({incomes}) => (
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

export default IncomesList;
