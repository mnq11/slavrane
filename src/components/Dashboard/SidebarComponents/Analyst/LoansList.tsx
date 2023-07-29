import React from 'react';
import { Loan } from "../../../../hooks/useMember";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, XAxis, YAxis, CartesianGrid, Bar, Label, LabelList } from 'recharts';
import './chartsStyling.css';
import {formatLargeNumber} from "./ExpensesList";

interface LoansListProps {
    loans: Loan[];
}

const CustomizedLabel = (props: any) => {
    const {x, y, stroke, value} = props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{formatLargeNumber(value)}</text>
};

const LoansList: React.FC<LoansListProps> = ({ loans }) => {
    let data = loans.map((loan, index) => ({
        name: loan.Lender,
        value: Number(loan.Amount),
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Generate random color for each sector
    }));

    // Sorting data in descending order of values
    data.sort((a, b) => b.value - a.value);

    return (
        <div>
            <div className="chart-container">
                <h2>قروض حسب الجهات المانحة (رسم بياني دائري):</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={({ name, value, percent }) => `${name}: ${formatLargeNumber(value)} (${(percent * 100).toFixed(0)}%)`}
                        >
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                            }
                        </Pie>
                        <Tooltip
                            wrapperClassName="custom-tooltip"
                            itemStyle={{ color: '#000' }}
                            cursor={false}
                            formatter={(value) => formatLargeNumber(Number(value))}
                        />

                        <Legend wrapperStyle={{ bottom: 0 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h2>قروض حسب الجهات المانحة (رسم بياني شريطي):</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" >
                            <Label value="المقرضين" offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis tickFormatter={(value) => formatLargeNumber(value)}>
                            <Label value="المبلغ" angle={-90} position="insideLeft" />
                        </YAxis>
                        <Tooltip
                            contentStyle={{ textAlign: 'left' }}
                            wrapperClassName="custom-tooltip"
                            itemStyle={{ color: '#000' }}
                            cursor={false}
                            formatter={(value) => formatLargeNumber(Number(value))}
                        />
                        <Bar dataKey="value" fill="#8884d8">
                            <LabelList dataKey="value" content={CustomizedLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LoansList;
