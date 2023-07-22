import styled from 'styled-components';
import React from "react";

const Container = styled.div`
  width: 90%;
  height: 600px; // specify a fixed height
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-radius: 8px;
  margin-bottom: 30px;
  padding: 20px;
`;

const ChartTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

interface ChartContainerProps {
    title: string;
    children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => (
    <Container>
        <ChartTitle>{title}</ChartTitle>
        {children}
    </Container>
);

export default ChartContainer;
