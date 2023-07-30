import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
    Label,
    LabelList
} from 'recharts';
import './chartsStyling.css';
import {formatLargeNumber} from "./ExpensesList";
import {Savings} from "../../../../hooks/useMember";

interface SavingsListProps {
    savings: Savings[];
}

const CustomizedLabel = (props: any) => {
    const {x, y, stroke, value} = props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{formatLargeNumber(value)}</text>
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`  الهدف${formatLargeNumber(label)}  : ${formatLargeNumber(payload[0].value)}   المتوفر`}</p>
            </div>
        );
    }
    return null;
};

const SavingsList: React.FC<SavingsListProps> = ({savings}) => {
    let data = savings.map((saving) => ({
        name: saving.SavingsGoal,
        value: Number(saving.Amount),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random color for each sector
    }));

    // Sorting data in descending order of values
    data.sort((a, b) => b.value - a.value);

    return (
        <div>
            <div className="chart-container">
                <div dir="rtl" style={{textAlign: 'center'}}>
                    <h2>الادخار حسب المبالغ المستهدفة </h2>
                </div>

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
                            label={({name, value, percent}) => `${name}: ${formatLargeNumber(value)} (${(percent * 100).toFixed(0)}%)`}
                        >
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color}/>)
                            }
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />

                        <Legend wrapperStyle={{bottom: 0}}/>
                    </PieChart>
                </ResponsiveContainer>

                <div dir="rtl" style={{textAlign: 'center'}}>
                    <h2>الادخار حسب المبالغ المستهدفة</h2>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name" tickFormatter={(value) => formatLargeNumber(value)}>
                            <Label value="الهدف" offset={-5} position="insideBottom"/>
                        </XAxis>
                        <YAxis tickFormatter={(value) => formatLargeNumber(value)}>
                            <Label value="المبلغ" angle={-90} position="insideLeft"/>
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" fill="#8884d8">
                            <LabelList dataKey="value" content={CustomizedLabel}/>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SavingsList;
