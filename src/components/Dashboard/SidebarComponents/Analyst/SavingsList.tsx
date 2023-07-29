import React, { useMemo } from 'react';
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { Savings } from "../../../../hooks/useMember";
import { TooltipProps } from 'recharts';
import { formatLargeNumber } from "./ExpensesList";
import './chartsStyling.css';

interface SavingsListProps {
    savings: Savings[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({active, payload}: TooltipProps<any, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{backgroundColor: payload[0].payload.fill}}>
                <p>{`${payload[0].name} : ${formatLargeNumber(payload[0].value)}`}</p>
            </div>
        );
    }
    return null;
};

const ChartContainer = ({title, children}: {title: string, children: React.ReactNode}) => (
    <div className="chart-container">
        <h3>{title}</h3>
        <div className="tooltip-container" >
            {children}
        </div>
    </div>
);

const SavingsList: React.FC<SavingsListProps> = ({ savings }) => {
    const totalSavings = useMemo(() =>
        savings.reduce((sum, saving) => sum + Number(saving.Amount), 0), [savings]
    );

    const pieChartData = useMemo(() =>
            savings.map((saving, index) => ({
                name: `الهدف ${formatLargeNumber(Number(saving.SavingsGoal))}`,
                value: Number(saving.Amount),
                fill: COLORS[index % COLORS.length],
            })),
        [savings]
    );

    const barChartData = useMemo(() =>
            savings.map(saving => ({
                name: `الهدف: ${formatLargeNumber(Number(saving.SavingsGoal))}`,
                Amount: Number(saving.Amount)
            })),
        [savings]
    );

    return (
        <div className="savings-list">
            <h2>قائمة الادخار:</h2>
            <h3>إحصائيات:</h3>
            <p>إجمالي مبلغ الادخار: {formatLargeNumber(totalSavings)}</p>
            <ChartContainer title='مخطط دائري - مبلغ الادخار حسب الهدف:'>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({name, value}) => ` ${(Number(value) / totalSavings * 100).toFixed(2)}%`}
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip content={CustomTooltip}/>
                </PieChart>
            </ChartContainer>

            <ChartContainer title='مخطط الشريط - مبلغ حسب الهدف الادخار:'>
                <BarChart width={600} height={300} data={barChartData}>
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(tickItem) => formatLargeNumber(tickItem)} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={CustomTooltip}/>
                    <Bar dataKey="Amount" fill="#8884d8" />
                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default SavingsList;
