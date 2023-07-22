import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import { formatDateString, formatVolumeString } from './dateFormatters';

interface VolumeDataPoint {
    date: string;
    volume: number;
}

interface VolumeChartProps {
    data: VolumeDataPoint[];
    range: string;
}

export const VolumeChart: React.FC<VolumeChartProps> = ({data, range}) => (
    <ResponsiveContainer>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
                dataKey="date"
                tickFormatter={(str) => formatDateString(str, range)}
            />
            <YAxis
                tickFormatter={(value) => formatVolumeString(value)}
            />
            <Tooltip
                labelFormatter={(value) => formatDateString(value, range)}
            />
            <Legend/>
            <Line type="monotone" dataKey="volume" stroke="#8884d8" dot={false}/>
        </LineChart>
    </ResponsiveContainer>
);
