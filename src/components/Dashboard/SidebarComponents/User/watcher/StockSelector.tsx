// StockSelector.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from "styled-components";
import companies from './companies.json';

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const SymbolSelect = styled.select`
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 8px;
  margin-right: 10px;
  font-size: 16px;
`;

const RangeSelect = styled.select`
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
`;

const CategorySelect = styled.select`
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  margin-right: 10px;
`;

interface StockSelectorProps {
    symbol: string;
    range: string;
    setSymbol: React.Dispatch<React.SetStateAction<string>>;
    setRange: React.Dispatch<React.SetStateAction<string>>;
}

type CompanyList = typeof companies;

export const StockSelector: React.FC<StockSelectorProps> = ({symbol, range, setSymbol, setRange}) => {
    const RANGES = ['1d', '1w', '1m', '3m', '6m', '1y', '5y'];
    const [companyList] = useState<CompanyList>(companies);
    const [category, setCategory] = useState<keyof typeof companies>("Technology");

    useEffect(() => {
        setCategory(Object.keys(companyList)[0] as keyof typeof companies);
        setSymbol(companyList[Object.keys(companyList)[0] as keyof typeof companies][0]);
    }, [setSymbol, companyList]);

    const changeSymbol = (event: ChangeEvent<HTMLSelectElement>) => {
        setSymbol(event.target.value);
    };

    const changeRange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRange(event.target.value);
    };

    const changeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value as keyof typeof companies;
        setCategory(newCategory);
        if (companyList[newCategory]?.length > 0) {
            setSymbol(companyList[newCategory][0]);
        }
    };




    return (
        <div>
            <SelectorContainer>
                <CategorySelect value={category} onChange={changeCategory}>
                    {Object.keys(companyList).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </CategorySelect>
                <SymbolSelect value={symbol} onChange={changeSymbol}>
                    {companyList[category]?.map((symbol) => (
                        <option key={symbol} value={symbol}>{symbol}</option>
                    ))}
                </SymbolSelect>
                <RangeSelect value={range} onChange={changeRange}>
                    {RANGES.map((range) => (
                        <option key={range} value={range}>{range}</option>
                    ))}
                </RangeSelect>
            </SelectorContainer>
        </div>
    );
};
