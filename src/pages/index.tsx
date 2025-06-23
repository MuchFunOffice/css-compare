import React from 'react';
import { Link } from 'umi';
import './index.css';

export default function HomePage() {
  return (
    <div className='home-container'>
      <div className='hero-section'>
        <div className='hero-content'>
          <h1 className='hero-title'>
            CSS vs CSS-in-JS
            <span className='highlight'>性能对比</span>
          </h1>
          <p className='hero-description'>深入对比传统CSS与styled-components在真实场景下的性能表现， 助您做出最佳技术选择</p>
          <div className='hero-actions'>
            <Link to='/performance-comparison' className='btn btn-primary'>
              开始对比测试
            </Link>
            <a href='#features' className='btn btn-secondary'>
              了解更多
            </a>
          </div>
        </div>
        <div className='hero-visual'>
          <div className='code-comparison'>
            <div className='code-block css-block'>
              <div className='code-header'>传统 CSS</div>
              <div className='code-content'>
                <div className='code-line'>.button &#123;</div>
                <div className='code-line'> background: #007bff;</div>
                <div className='code-line'> color: white;</div>
                <div className='code-line'>&#125;</div>
              </div>
            </div>
            <div className='vs-divider'>VS</div>
            <div className='code-block styled-block'>
              <div className='code-header'>CSS-in-JS</div>
              <div className='code-content'>
                <div className='code-line'>const Button = styled.button`</div>
                <div className='code-line'> background: #007bff;</div>
                <div className='code-line'> color: white;</div>
                <div className='code-line'>`;</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id='features' className='features-section'>
        <div className='section-header'>
          <h2>为什么选择我们的对比测试？</h2>
          <p>我们确保测试的客观性和准确性</p>
        </div>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>🎯</div>
            <h3>DOM结构一致</h3>
            <p>两种测试使用完全相同的DOM结构和数据量，确保对比的公平性</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>🔬</div>
            <h3>真实场景</h3>
            <p>1000个复杂组件的大规模测试，模拟真实应用场景</p>
          </div>
          <div className='feature-card'>
            <div className='feature-icon'>📈</div>
            <h3>实时监控</h3>
            <p>使用Performance API进行实时性能监控和数据收集</p>
          </div>
        </div>
      </section>

      <section className='comparison-preview'>
        <div className='section-header'>
          <h2>快速开始测试</h2>
          <p>选择您想要测试的技术方案</p>
        </div>
        <div className='test-cards'>
          <Link to='/css-performance' className='test-card css-card'>
            <div className='card-header'>
              <div className='card-icon'>🎨</div>
              <h3>传统 CSS 测试</h3>
            </div>
            <div className='card-content'>
              <p>测试使用外部CSS文件和className的传统方式</p>
              <ul>
                <li>无运行时开销</li>
                <li>浏览器缓存友好</li>
                <li>更小的包体积</li>
              </ul>
            </div>
            <div className='card-footer'>
              <span className='test-label'>立即测试 →</span>
            </div>
          </Link>

          <Link to='/styled-performance' className='test-card styled-card'>
            <div className='card-header'>
              <div className='card-icon'>💅</div>
              <h3>CSS-in-JS 测试</h3>
            </div>
            <div className='card-content'>
              <p>测试使用styled-components的CSS-in-JS方式</p>
              <ul>
                <li>组件级样式隔离</li>
                <li>动态样式计算</li>
                <li>TypeScript支持</li>
              </ul>
            </div>
            <div className='card-footer'>
              <span className='test-label'>立即测试 →</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
