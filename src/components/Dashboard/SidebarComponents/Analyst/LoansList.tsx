import React from 'react';
import { Loan } from "../../../../hooks/useMember";

interface LoansListProps {
    loans: Loan[];
}

const LoansList: React.FC<LoansListProps> = ({ loans }) => (
    <div>
        <h2>Loans List:</h2>
        <ul>
            {loans.map(loan => (
                <li key={loan.LoanID}>
                    <p>Lender: {loan.Lender}</p>
                    <p>Amount: {loan.Amount}</p>
                    <p>Due Date: {loan.DueDate}</p>
                    <p>Interest Rate: {loan.InterestRate}%</p>
                </li>
            ))}
        </ul>
    </div>
);

export default LoansList;
