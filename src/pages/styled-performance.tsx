import React, { useState } from 'react';
import styled from 'styled-components';
import { usePerformanceMeasure } from '../utils/performanceUtils';

// Styled Components
const PerformanceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const PerformanceHeader = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const PerformanceTitle = styled.h1`
  margin: 0 0 20px 0;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
`;

const PerformanceMetrics = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const MetricLabel = styled.span`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const MetricValue = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffd700;
`;

const PerformanceContent = styled.div`
  margin-bottom: 30px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const GridItem = styled.div<{ status: string }>`
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid
    ${(props) => (props.status === 'active' ? '#28a745' : props.status === 'pending' ? '#ffc107' : '#6c757d')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${(props) => (props.status === 'active' ? '#d4edda' : props.status === 'pending' ? '#fff3cd' : '#d1ecf1')};
  color: ${(props) => (props.status === 'active' ? '#155724' : props.status === 'pending' ? '#856404' : '#0c5460')};
`;

const ItemDescription = styled.p`
  margin: 0 0 16px 0;
  color: #6c757d;
  line-height: 1.5;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ variant: 'primary' | 'secondary' | 'outline' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => {
    if (props.variant === 'primary') {
      return `
        background-color: #007bff;
        color: white;
        &:hover {
          background-color: #0056b3;
        }
      `;
    } else if (props.variant === 'secondary') {
      return `
        background-color: #dc3545;
        color: white;
        &:hover {
          background-color: #c82333;
        }
      `;
    } else {
      return `
        background-color: transparent;
        color: #6c757d;
        border: 1px solid #6c757d;
        &:hover {
          background-color: #6c757d;
          color: white;
        }
      `;
    }
  }}
`;

const PerformanceFooter = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const FooterStats = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const StatNumber = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #495057;
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledPerformancePage: React.FC = () => {
  const { renderTime, mountTime } = usePerformanceMeasure('CSS-in-JS');
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      title: `项目 ${i + 1}`,
      description: `这是第 ${i + 1} 个项目的描述信息`,
      status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'completed',
    }))
  );

  return (
    <PerformanceContainer>
      <PerformanceHeader>
        <PerformanceTitle>CSS-in-JS 性能测试页面</PerformanceTitle>
        <PerformanceMetrics>
          <MetricItem>
            <MetricLabel>渲染时间:</MetricLabel>
            <MetricValue>{renderTime.toFixed(2)}ms</MetricValue>
          </MetricItem>
          <MetricItem>
            <MetricLabel>挂载时间:</MetricLabel>
            <MetricValue>{mountTime.toFixed(2)}ms</MetricValue>
          </MetricItem>
        </PerformanceMetrics>
      </PerformanceHeader>

      <PerformanceContent>
        <GridContainer>
          {items.map((item) => (
            <GridItem key={item.id} status={item.status}>
              <ItemHeader>
                <ItemTitle>{item.title}</ItemTitle>
                <StatusBadge status={item.status}>{item.status}</StatusBadge>
              </ItemHeader>
              <ItemDescription>{item.description}</ItemDescription>
              <ItemActions>
                <ActionButton variant='primary'>编辑</ActionButton>
                <ActionButton variant='secondary'>删除</ActionButton>
                <ActionButton variant='outline'>查看</ActionButton>
              </ItemActions>
            </GridItem>
          ))}
        </GridContainer>
      </PerformanceContent>

      <PerformanceFooter>
        <FooterStats>
          <StatItem>
            <StatNumber>{items.length}</StatNumber>
            <StatLabel>总项目数</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{items.filter((i) => i.status === 'active').length}</StatNumber>
            <StatLabel>活跃项目</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{items.filter((i) => i.status === 'completed').length}</StatNumber>
            <StatLabel>已完成</StatLabel>
          </StatItem>
        </FooterStats>
      </PerformanceFooter>
    </PerformanceContainer>
  );
};

export default StyledPerformancePage;
