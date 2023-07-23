import React from 'react';
import { Expense } from "../../../../hooks/useMember";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF1493', '#8B4513', '#2E8B57', '#DB7093', '#9ACD32', '#FFD700'];

//Expense List Component
const ExpensesList: React.FC<{expenses: Expense[]}> = ({expenses}) => {
    const stats = expenses.reduce((acc, expense) => {
        acc.totalAmount += Number(expense.Amount);
        acc.categories[expense.Category] = (acc.categories[expense.Category] || []);
        acc.categories[expense.Category].push(expense);

        const date = new Date(expense.Date);
        const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; // Months are 0-indexed in JavaScript Date
        acc.years[yearMonth] = (acc.years[yearMonth] || 0) + Number(expense.Amount);

        acc.frequency[expense.Frequency] = (acc.frequency[expense.Frequency] || 0) + Number(expense.Amount);
        acc.recurring[expense.Recurring ? 'Yes' : 'No'] = (acc.recurring[expense.Recurring ? 'Yes' : 'No'] || 0) + 1;

        return acc;
    }, {
        totalAmount: 0,
        categories: {} as Record<string, Expense[]>,
        years: {} as Record<string, number>,
        frequency: {} as Record<string, number>,
        recurring: {} as Record<string, number>,
    });

    const categoryData = Object.entries(stats.categories).map(([category, expenses], index) => ({
        category,
        Amount: expenses.reduce((total, expense) => total + Number(expense.Amount), 0),
        fill: COLORS[index % COLORS.length]
    }));


    const dateData = Object.entries(stats.years).map(([yearMonth, count]) => {
        const [year, month] = yearMonth.split('-');
        return {year, month, count};
    });

    const frequencyData = Object.entries(stats.frequency).map(([name, value]) => ({name, value}));

    return (
        <>
            <h2>Family Expenses:</h2>
            <p>Total Amount: {stats.totalAmount}</p>
            <h3>Category breakdown:</h3>
            <BarChart width={600} height={300} data={categoryData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="Amount" name="Amount">
                    {categoryData.map((entry, index) => (
                        <Cell key={entry.category} fill={entry.fill} />
                    ))}
                </Bar>
                <Legend />
            </BarChart>
            <h3>Yearly breakdown:</h3>
            <LineChart width={600} height={300} data={dateData}>
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey={(data) => `${data.year}-${data.month}`} />
                <YAxis />
                <Tooltip />
            </LineChart>

            <h3>Frequency breakdown:</h3>
            <PieChart width={400} height={400}>
                <Pie dataKey="value" isAnimationActive={false} data={frequencyData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {frequencyData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
            <h2>Individual Expenses:</h2>
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

export default ExpensesList;
