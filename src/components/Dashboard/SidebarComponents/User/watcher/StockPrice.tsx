import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import useFetch from './useFetch';
import { formatDateString } from './dateFormatters';
import { StockSelector } from './StockSelector';
import ChartContainer from './ChartContainer';
import { VolumeChart } from "./VolumeChart";

const API_TOKEN = 'pk_a5f774be288845379c8f4de8a3118692';

export function StockPrice() {
    const [symbol, setSymbol] = useState('AAPL');
    const [range, setRange] = useState('1d');
    const fetchUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${range}?token=${API_TOKEN}`;
    const { data, isLoading, error } = useFetch(fetchUrl);

    useEffect(() => {
        if(data) {
            // @ts-ignore
            data.forEach((datapoint) => {
                if (!datapoint.date.endsWith('Z')) {
                    datapoint.date += 'Z';
                }
            });
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <StockSelector
                symbol={symbol}
                range={range}
                setSymbol={setSymbol}
                setRange={setRange}
            />
            {data && (
                <ChartContainer title="Stock Prices">
                    <ResponsiveContainer>
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey={range === '1d' ? 'minute' : 'date'}
                                type="category"
                                allowDataOverflow={true}
                                name='Date'
                                tickFormatter={(str) => formatDateString(str, range)}
                            />
                            <YAxis
                                domain={['auto', 'auto']}
                                allowDataOverflow={true}
                                name='Price'
                            >
                                <Label value="Stock Price ($)" offset={-10} position="insideLeft" angle={-90} />
                            </YAxis>
                            <Tooltip
                                labelFormatter={(value) => formatDateString(value, range)}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="open" stroke="#8884d8" dot={false} />
                            <Line type="monotone" dataKey="close" stroke="#82ca9d" dot={false} />
                            <Line type="monotone" dataKey="high" stroke="#ffc658" dot={false} />
                            <Line type="monotone" dataKey="low" stroke="#ff7300" dot={false} />
                            <Line type="monotone" dataKey="average" stroke="#8485d8" dot={false} />

                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            )}
            <ChartContainer title="Volume">
                {data && <VolumeChart data={data} range={range} />}
            </ChartContainer>
        </div>
    );
}

export default StockPrice;
