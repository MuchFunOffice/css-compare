import React, { useState } from 'react';

// 优势演示组件
const ResponsiveCard: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 sm:p-4 md:p-6 lg:p-8'>
      <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4'>{title}</h3>
      <p className='text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base'>{content}</p>
    </div>
  );
};

// 劣势演示组件1 - HTML冗长问题
const VerboseComponent: React.FC = () => {
  return (
    <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6'>
      <h3 className='text-lg font-semibold text-red-800 dark:text-red-200 mb-4'>劣势演示：HTML 冗长</h3>
      <div className='space-y-4'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3 mb-2 sm:mb-0'>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
              <span className='text-white text-sm font-bold'>1</span>
            </div>
            <span className='text-gray-900 dark:text-white font-medium'>这个组件有很多类名</span>
          </div>
          <button className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md'>
            操作按钮
          </button>
        </div>
        <p className='text-sm text-red-600 dark:text-red-400'>
          如您所见，这个简单的组件就使用了大量的 Tailwind 类名，HTML 变得很冗长。
        </p>
      </div>
    </div>
  );
};

// 劣势演示组件2 - 复杂动画和自定义样式困难
const ComplexAnimationComponent: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6'>
      <h3 className='text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4'>劣势演示：复杂动画限制</h3>
      <div className='space-y-4'>
        <div className='flex items-center justify-center'>
          <div
            className={`w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-transform duration-500 ${
              isAnimating ? 'transform rotate-180 scale-150' : ''
            }`}
            style={{
              // 需要使用内联样式来实现复杂动画
              animation: isAnimating ? 'customPulse 2s infinite, customBounce 1s ease-in-out' : 'none',
            }}
          />
        </div>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className='w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-colors'
        >
          {isAnimating ? '停止动画' : '开始复杂动画'}
        </button>
        <p className='text-sm text-yellow-600 dark:text-yellow-400'>
          复杂的自定义动画和样式仍需要写 CSS 或内联样式，Tailwind 的原子类无法覆盖所有场景。
        </p>
      </div>
      <style>{`
        @keyframes customPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes customBounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-30px,0); }
          70% { transform: translate3d(0,-15px,0); }
          90% { transform: translate3d(0,-4px,0); }
        }
      `}</style>
    </div>
  );
};

const TailwindDemo: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // 切换主题
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // 统一在 document.documentElement 上管理 dark 类
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500'>
        {/* 顶部导航 */}
        <nav className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center space-x-4'>
                <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>TW</span>
                </div>
                <h1 className='text-xl font-bold text-gray-900 dark:text-white'>Tailwind CSS 演示</h1>
              </div>
              <button
                onClick={toggleTheme}
                className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                aria-label='切换主题'
              >
                {darkMode ? (
                  <span className='text-yellow-500 text-xl'>☀️</span>
                ) : (
                  <span className='text-gray-700 text-xl'>🌙</span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* 主要内容 */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          {/* 页面标题 */}
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6'>
              Tailwind CSS
            </h1>
            <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
              一个功能类优先的 CSS 框架，用于快速构建现代化的用户界面
            </p>
          </div>

          {/* 优势展示区域 */}
          <section className='mb-16'>
            <h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-12'>✨ Tailwind CSS 的优势</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <ResponsiveCard
                title='🚀 开发效率'
                content='无需离开 HTML 即可快速构建样式，原子类的方式让开发更加高效，减少了 CSS 文件的切换。'
              />
              <ResponsiveCard
                title='📱 响应式设计'
                content='内置的响应式前缀（sm:、md:、lg:、xl:）让响应式设计变得轻而易举，无需编写媒体查询。'
              />
              <ResponsiveCard
                title='🎨 设计系统'
                content='提供了一致的设计规范，包括颜色、间距、字体大小等，确保整个项目的设计一致性。'
              />
              <ResponsiveCard
                title='🌙 主题支持'
                content='轻松实现深色模式和主题切换，通过 dark: 前缀就能控制暗色主题下的样式。'
              />
              <ResponsiveCard
                title='⚡ 性能优化'
                content='通过 PurgeCSS 自动移除未使用的样式，最终产出的 CSS 文件非常小，提升加载性能。'
              />
              <ResponsiveCard
                title='🔧 高度可定制'
                content='通过配置文件可以完全自定义设计系统，包括颜色、字体、间距等所有设计标记。'
              />
            </div>
          </section>

          {/* 响应式演示 */}
          <section className='mb-16'>
            <h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-8'>📱 响应式设计演示</h2>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-center'>
                  <div className='text-red-600 dark:text-red-400 font-semibold'>默认 (xs)</div>
                  <div className='text-sm text-gray-600 dark:text-gray-400 mt-2'>1列布局</div>
                </div>
                <div className='bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg text-center hidden sm:block'>
                  <div className='text-yellow-600 dark:text-yellow-400 font-semibold'>sm: (≥640px)</div>
                  <div className='text-sm text-gray-600 dark:text-gray-400 mt-2'>2列布局</div>
                </div>
                <div className='bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center hidden lg:block'>
                  <div className='text-green-600 dark:text-green-400 font-semibold'>lg: (≥1024px)</div>
                  <div className='text-sm text-gray-600 dark:text-gray-400 mt-2'>4列布局</div>
                </div>
                <div className='bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg text-center hidden lg:block'>
                  <div className='text-blue-600 dark:text-blue-400 font-semibold'>xl: (≥1280px)</div>
                  <div className='text-sm text-gray-600 dark:text-gray-400 mt-2'>更宽屏幕</div>
                </div>
              </div>
              <p className='text-center text-gray-600 dark:text-gray-400 mt-6 text-sm'>调整浏览器窗口大小，观察布局变化</p>
            </div>
          </section>

          {/* 劣势展示区域 */}
          <section className='mb-16'>
            <h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-12'>⚠️ Tailwind CSS 的劣势</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <VerboseComponent />
              <ComplexAnimationComponent />
            </div>
          </section>

          {/* 总结 */}
          <section className='text-center'>
            <div className='bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white'>
              <h2 className='text-3xl font-bold mb-4'>总结</h2>
              <p className='text-lg leading-relaxed max-w-4xl mx-auto'>
                Tailwind CSS 是一个强大的工具，特别适合快速原型开发和维护大型项目的设计一致性。 虽然存在 HTML
                冗长和复杂样式处理的局限性，但其带来的开发效率提升和设计系统化的优势是显著的。 选择使用 Tailwind CSS
                需要根据项目需求和团队偏好来决定。
              </p>
            </div>
          </section>
        </div>

        {/* 页脚 */}
        <footer className='bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <p className='text-gray-600 dark:text-gray-400'>Built with ❤️ using Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TailwindDemo;
