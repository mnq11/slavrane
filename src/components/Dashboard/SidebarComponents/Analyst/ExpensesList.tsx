import React from 'react';
import {Expense} from "../../../../hooks/useMember";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
    TooltipProps
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF1493', '#8B4513', '#2E8B57', '#DB7093', '#9ACD32', '#FFD700'];

export const formatLargeNumber = (value: number) => {
    if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + ' مليون';
    }
    if (value >= 1e3) {
        return (value / 1e3).toFixed(2) + ' الف';
    }
    return value.toString();
};
const CustomTooltip = ({active, payload}: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        let category = payload[0].name;  // use the name as category
        if (payload[0].payload && payload[0].payload.category) {
            category = payload[0].payload.category;  // if available, still get category from the payload
        }
        return (
            <div className="tooltip-container">
                <div className="custom-tooltip" style={{backgroundColor: payload[0].color || '#ccc'}}>
                    <p className="label">{`${category} : ${value !== undefined ? formatLargeNumber(value) : 'N/A'}`}</p>
                </div>
            </div>
        );
    }
    return null;
};


const ExpensesList: React.FC<{ expenses: Expense[] }> = ({expenses}) => {
    const stats = expenses.reduce((acc, expense) => {
        acc.totalAmount += Number(expense.Amount);

        const categoryKey = expense.Category.replace(/\s+/g, '_');
        acc.categories[categoryKey] = (acc.categories[categoryKey] || []);
        acc.categories[categoryKey].push(expense);

        const date = new Date(expense.Date);
        const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; // Months are 0-indexed in JavaScript Date
        acc.years[yearMonth] = (acc.years[yearMonth] || {});
        acc.years[yearMonth][categoryKey] = (acc.years[yearMonth][categoryKey] || 0) + Number(expense.Amount);

        acc.frequency[expense.Frequency] = (acc.frequency[expense.Frequency] || 0) + Number(expense.Amount);
        acc.recurring[expense.Recurring ? 'Yes' : 'No'] = (acc.recurring[expense.Recurring ? 'Yes' : 'No'] || 0) + 1;

        return acc;
    }, {
        totalAmount: 0,
        categories: {} as Record<string, Expense[]>,
        years: {} as Record<string, Record<string, number>>,
        frequency: {} as Record<string, number>,
        recurring: {} as Record<string, number>,
    });

    // generate dateData
    const dateData = Object.entries(stats.years)
        .sort((a, b) => a[0].localeCompare(b[0]))  // this will sort your year-month keys in ascending order
        .map(([yearMonth, categories]) => {
            const [year, month] = yearMonth.split('-');
            return {year, month, ...Object.fromEntries(Object.entries(categories).map(([k, v]) => [normalizeCategoryName(k.replace(/_/g, ' ')), v]))};
        });
    function normalizeCategoryName(name: string) {
        return name.replace(/_/g, ' ');
    }

    const categoryData = Object.entries(stats.categories).map(([category, expenses], index) => ({
        category: normalizeCategoryName(category),
        Amount: expenses.reduce((total, expense) => total + Number(expense.Amount), 0),
        fill: COLORS[index % COLORS.length]
    }));



    const frequencyData = Object.entries(stats.frequency).map(([name, value]) => ({name, value}));


    return (
        <>

            <div className="chart-container" >
                <div dir="rtl" style={{ textAlign: 'center' }}><h2>نفقات الأسرة</h2></div>
                <div dir="rtl" style={{ textAlign: 'center' }}><p>المبلغ الإجمالي {formatLargeNumber(stats.totalAmount)}</p></div>
                <BarChart width={600} height={300} data={categoryData}>
                    <XAxis dataKey="category"/>
                    <YAxis tickFormatter={formatLargeNumber}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <CartesianGrid stroke="#f5f5f5"/>
                    <Bar dataKey="Amount" name="المبلغ">
                        {categoryData.map((entry) => (
                            <Cell key={entry.category} fill={entry.fill}/>
                        ))}
                    </Bar>
                    <Legend/>
                </BarChart>
                <div dir="rtl" style={{ textAlign: 'center' }}><h3>إحصائيات حسب بالتاريخ</h3></div>

                <LineChart width={600} height={300} data={dateData}>
                    <XAxis dataKey={(data) => `${data.year}-${data.month}`}/>
                    <YAxis tickFormatter={formatLargeNumber}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <CartesianGrid stroke="#ccc"/>
                    {Object.keys(stats.categories).map((category, index) => (
                        <Line key={category} type="monotone" dataKey={normalizeCategoryName(category)}
                              stroke={COLORS[index % COLORS.length]}/>
                    ))}
                </LineChart>

                <div dir="rtl" style={{ textAlign: 'center' }}><h3>إحصائيات حسب التكرار</h3></div>
                <PieChart width={400} height={400} >
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={frequencyData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={(entry) => `${entry.name}: ${formatLargeNumber(entry.value)}`}
                    >
                        {frequencyData.map((entry, index) => <Cell key={`cell-${index}`}
                                                                   fill={COLORS[index % COLORS.length]}/>)}
                    </Pie>

                    <Legend/>
                    <Tooltip content={<CustomTooltip/>}/>
                </PieChart>

            </div>

        </>
    );
};

export default ExpensesList;
