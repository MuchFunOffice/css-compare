import React, { useState } from 'react';
import './css-performance.css';
import { usePerformanceMeasure } from '../utils/performanceUtils';

const CSSPerformancePage: React.FC = () => {
  const { renderTime, mountTime } = usePerformanceMeasure('CSS');
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      title: `项目 ${i + 1}`,
      description: `这是第 ${i + 1} 个项目的描述信息`,
      status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'completed',
    }))
  );

  return (
    <div className='performance-container'>
      <div className='performance-header'>
        <h1 className='performance-title'>CSS 性能测试页面</h1>
        <div className='performance-metrics'>
          <div className='metric-item'>
            <span className='metric-label'>渲染时间:</span>
            <span className='metric-value'>{renderTime.toFixed(2)}ms</span>
          </div>
          <div className='metric-item'>
            <span className='metric-label'>挂载时间:</span>
            <span className='metric-value'>{mountTime.toFixed(2)}ms</span>
          </div>
        </div>
      </div>

      <div className='performance-content'>
        <div className='grid-container'>
          {items.map((item) => (
            <div key={item.id} className={`grid-item ${item.status}`}>
              <div className='item-header'>
                <h3 className='item-title'>{item.title}</h3>
                <span className={`status-badge status-${item.status}`}>{item.status}</span>
              </div>
              <p className='item-description'>{item.description}</p>
              <div className='item-actions'>
                <button className='action-button primary'>编辑</button>
                <button className='action-button secondary'>删除</button>
                <button className='action-button outline'>查看</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='performance-footer'>
        <div className='footer-stats'>
          <div className='stat-item'>
            <span className='stat-number'>{items.length}</span>
            <span className='stat-label'>总项目数</span>
          </div>
          <div className='stat-item'>
            <span className='stat-number'>{items.filter((i) => i.status === 'active').length}</span>
            <span className='stat-label'>活跃项目</span>
          </div>
          <div className='stat-item'>
            <span className='stat-number'>{items.filter((i) => i.status === 'completed').length}</span>
            <span className='stat-label'>已完成</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSPerformancePage;
