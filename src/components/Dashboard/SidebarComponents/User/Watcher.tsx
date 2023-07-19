import React, { useEffect, useState } from 'react';

interface Stock {
    symbol: string;
    name: string;
    price: number;
}

const Watcher: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    useEffect(() => {
        const apiKey = 'your-alpha-vantage-api-key';
        const symbol = 'MSFT'; // Microsoft stock symbol
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const stockPrice = {
                    symbol: symbol,
                    name: 'Microsoft Corporation', // Ideally, you should get this from the API as well
                    price: parseFloat(data['Global Quote']['05. price']),
                };
                setStocks([stockPrice]);
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <div>
            <h2>Stock Prices</h2>
            {stocks.map((stock) => (
                <div key={stock.symbol}>
                    <h3>{stock.name}</h3>
                    <p>${stock.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Watcher;
