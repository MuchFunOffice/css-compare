import React from 'react';
import { Link } from 'umi';
import './performance-comparison.css';

const PerformanceComparisonPage: React.FC = () => {
  return (
    <div className='comparison-container'>
      <div className='comparison-header'>
        <h1 className='comparison-title'>CSS vs CSS-in-JS 技术对比</h1>
        <p className='comparison-subtitle'>深入分析传统CSS与CSS-in-JS在开发体验、性能表现等方面的差异</p>
      </div>

      <div className='navigation-section'>
        <h2>示例页面</h2>
        <div className='nav-cards'>
          <Link to='/css-performance' className='nav-card css-card'>
            <div className='card-icon'>🎨</div>
            <h3>传统 CSS</h3>
            <p>使用外部CSS文件和className的传统方式</p>
            <span className='card-tag'>查看示例</span>
          </Link>
          <Link to='/styled-performance' className='nav-card styled-card'>
            <div className='card-icon'>💅</div>
            <h3>CSS-in-JS</h3>
            <p>使用styled-components的CSS-in-JS方式</p>
            <span className='card-tag'>查看示例</span>
          </Link>
        </div>
      </div>

      <div className='analysis-section'>
        <h2>技术差异对比</h2>
        <div className='analysis-content'>
          <div className='analysis-item'>
            <h3>🎯 传统 CSS 特点</h3>
            <ul>
              <li>
                <strong>性能优势：</strong>无运行时开销，浏览器缓存友好
              </li>
              <li>
                <strong>加载速度：</strong>样式文件可以并行加载和缓存
              </li>
              <li>
                <strong>内存使用：</strong>样式规则在浏览器中高效存储
              </li>
              <li>
                <strong>构建体积：</strong>CSS文件可以有效压缩和优化
              </li>
              <li>
                <strong>开发工具：</strong>成熟的CSS预处理器生态
              </li>
            </ul>
          </div>
          <div className='analysis-item'>
            <h3>💅 CSS-in-JS 特点</h3>
            <ul>
              <li>
                <strong>组件隔离：</strong>自动生成唯一类名，避免样式冲突
              </li>
              <li>
                <strong>动态样式：</strong>基于props和state的条件样式
              </li>
              <li>
                <strong>类型安全：</strong>TypeScript集成，编译时错误检查
              </li>
              <li>
                <strong>主题系统：</strong>运行时主题切换和变量注入
              </li>
              <li>
                <strong>开发体验：</strong>组件和样式代码紧密关联
              </li>
            </ul>
          </div>
        </div>

        <div className='recommendations'>
          <h3>📋 选择建议</h3>
          <div className='recommendation-grid'>
            <div className='recommendation'>
              <h4>适合传统 CSS 的场景：</h4>
              <ul>
                <li>性能要求极高的应用</li>
                <li>大型静态网站</li>
                <li>需要复用现有CSS代码库</li>
                <li>团队更熟悉传统CSS工作流</li>
              </ul>
            </div>
            <div className='recommendation'>
              <h4>适合 CSS-in-JS 的场景：</h4>
              <ul>
                <li>组件化程度高的应用</li>
                <li>需要动态主题切换</li>
                <li>团队注重类型安全</li>
                <li>复杂的条件样式需求</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='comparison-details'>
        <h2>详细技术对比</h2>
        <div className='comparison-table'>
          <div className='comparison-row header'>
            <div className='comparison-cell'>对比维度</div>
            <div className='comparison-cell'>传统 CSS</div>
            <div className='comparison-cell'>CSS-in-JS</div>
          </div>
          <div className='comparison-row'>
            <div className='comparison-cell'>
              <strong>运行时性能</strong>
            </div>
            <div className='comparison-cell'>✅ 无运行时开销</div>
            <div className='comparison-cell'>⚠️ 有一定运行时开销</div>
          </div>
          <div className='comparison-row'>
            <div className='comparison-cell'>
              <strong>样式隔离</strong>
            </div>
            <div className='comparison-cell'>⚠️ 需要命名约定</div>
            <div className='comparison-cell'>✅ 自动样式隔离</div>
          </div>
          <div className='comparison-row'>
            <div className='comparison-cell'>
              <strong>动态样式</strong>
            </div>
            <div className='comparison-cell'>⚠️ 需要额外逻辑</div>
            <div className='comparison-cell'>✅ 原生支持</div>
          </div>
          <div className='comparison-row'>
            <div className='comparison-cell'>
              <strong>类型安全</strong>
            </div>
            <div className='comparison-cell'>❌ 缺乏类型检查</div>
            <div className='comparison-cell'>✅ 完整类型支持</div>
          </div>
          <div className='comparison-row'>
            <div className='comparison-cell'>
              <strong>学习成本</strong>
            </div>
            <div className='comparison-cell'>✅ 学习成本低</div>
            <div className='comparison-cell'>⚠️ 需要学习新概念</div>
          </div>
          <div className='comparison-row'>
            <div className='comparison-cell'>
              <strong>生态成熟度</strong>
            </div>
            <div className='comparison-cell'>✅ 生态成熟</div>
            <div className='comparison-cell'>✅ 快速发展</div>
          </div>
        </div>
      </div>

      <div className='best-practices'>
        <h2>最佳实践建议</h2>
        <div className='practice-content'>
          <div className='practice-item'>
            <h3>传统 CSS 优化建议</h3>
            <ul>
              <li>使用CSS预处理器提高开发效率</li>
              <li>采用BEM等命名规范避免样式冲突</li>
              <li>利用CSS自定义属性实现主题系统</li>
              <li>合理使用CSS模块化方案</li>
            </ul>
          </div>
          <div className='practice-item'>
            <h3>CSS-in-JS 优化建议</h3>
            <ul>
              <li>避免在render函数中定义样式</li>
              <li>使用样式缓存减少重复计算</li>
              <li>考虑SSR时的样式提取策略</li>
              <li>合理使用静态样式vs动态样式</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparisonPage;
