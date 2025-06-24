import React, { useState } from 'react';
import styles from './index.less';

// 混合使用示例组件：用户卡片
const UserCard: React.FC<{
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  onClick?: () => void;
}> = ({ name, role, avatar, status, onClick }) => {
  // Tailwind 用于通用的布局和间距，CSS Module 用于组件特有的样式
  return (
    <div
      className={`
        p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer
        ${styles.userCard}
      `}
      onClick={onClick}
    >
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <img src={avatar} alt={name} className='w-12 h-12 rounded-full object-cover' />
          <div className={`${styles.statusIndicator} ${styles[`status-${status}`]}`} />
        </div>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-white'>{name}</h3>
          <p className='text-sm text-white'>{role}</p>
        </div>
      </div>
    </div>
  );
};

// 产品卡片组件：展示更复杂的混合使用
const ProductCard: React.FC<{
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  onAddToCart?: () => void;
}> = ({ title, price, originalPrice, image, category, isNew, onAddToCart }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl ${styles.productCard}`}>
      {isNew && <div className={`absolute top-4 left-4 z-10 ${styles.badge} ${styles.newBadge}`}>NEW</div>}

      <div className='relative overflow-hidden'>
        <img src={image} alt={title} className='w-full h-48 object-cover transition-transform duration-300 hover:scale-105' />
        <div className={styles.overlay} />
      </div>

      <div className='p-4'>
        <span className='text-xs uppercase tracking-wide text-white font-medium'>{category}</span>
        <h3 className='mt-1 text-lg font-semibold text-white line-clamp-2'>{title}</h3>

        <div className='mt-3 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <span className='text-xl font-bold text-white'>¥{price}</span>
            {originalPrice && <span className='text-sm text-white line-through'>¥{originalPrice}</span>}
          </div>

          <button
            className={`${styles.addToCartBtn} px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200`}
            onClick={onAddToCart}
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
};

// 通知组件：演示条件样式的混合使用
const Notification: React.FC<{
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}> = ({ type, message, onClose }) => {
  // Tailwind 处理基础布局，CSS Module 处理主题色彩
  const baseClasses = 'flex items-center p-4 rounded-lg shadow-md animate-pulse';

  return (
    <div className={`${baseClasses} ${styles.notification} ${styles[`notification-${type}`]}`}>
      <div className='flex-1'>
        <p className='text-sm font-medium'>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className='ml-4 text-white hover:text-gray-200 transition-colors'>
          ✕
        </button>
      )}
    </div>
  );
};

// 主页面组件
const TailwindCSSModulePage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<
    Array<{ id: number; type: 'success' | 'warning' | 'error' | 'info'; message: string }>
  >([]);

  const handleUserClick = (name: string) => {
    setSelectedUser(name);
    addNotification('info', `选择了用户：${name}`);
  };

  const addNotification = (type: 'success' | 'warning' | 'error' | 'info', message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const handleAddToCart = (productTitle: string) => {
    addNotification('success', `${productTitle} 已加入购物车！`);
  };

  return (
    <div className={`min-h-screen ${styles.pageContainer}`}>
      {/* 固定位置的通知栏 */}
      <div className='fixed top-4 right-4 z-50 space-y-2'>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
          />
        ))}
      </div>

      {/* 页面头部 */}
      <header className={`${styles.header} py-8`}>
        <div className='max-w-6xl mx-auto px-4'>
          <h1 className='text-4xl font-bold text-center mb-4'>
            <span className={styles.highlight}>Tailwind CSS</span> × <span className={styles.highlight}>CSS Module</span>
          </h1>
          <p className='text-xl text-center text-gray-100'>混合使用最佳实践指南</p>
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-4 py-8'>
        {/* 策略说明部分 */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6 text-white'>混合使用策略</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className={`p-6 rounded-lg ${styles.strategyCard} ${styles.tailwindStrategy}`}>
              <h3 className='text-xl font-semibold mb-3 flex items-center'>
                <span className='mr-2'>🎨</span>
                Tailwind CSS 负责
              </h3>
              <ul className='space-y-2 text-white'>
                <li>• 布局和间距（flex, grid, padding, margin）</li>
                <li>• 响应式设计（sm:, md:, lg: 前缀）</li>
                <li>• 状态变化（hover:, focus:, active:）</li>
                <li>• 通用动画和过渡效果</li>
                <li>• 颜色系统的基础调色板</li>
              </ul>
            </div>

            <div className={`p-6 rounded-lg ${styles.strategyCard} ${styles.moduleStrategy}`}>
              <h3 className='text-xl font-semibold mb-3 flex items-center'>
                <span className='mr-2'>🔧</span>
                CSS Module 负责
              </h3>
              <ul className='space-y-2 text-white'>
                <li>• 组件特有的样式定制</li>
                <li>• 复杂的视觉效果和装饰</li>
                <li>• 品牌相关的颜色和主题</li>
                <li>• 自定义动画和关键帧</li>
                <li>• 伪元素和特殊选择器</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 用户卡片演示 */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6 text-white'>用户卡片组件演示</h2>
          <p className='text-gray-300 mb-6'>演示如何在用户卡片中混合使用 Tailwind 的布局类和 CSS Module 的自定义样式</p>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <UserCard
              name='张小明'
              role='前端开发工程师'
              avatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
              status='online'
              onClick={() => handleUserClick('张小明')}
            />
            <UserCard
              name='李小红'
              role='UI/UX 设计师'
              avatar='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
              status='busy'
              onClick={() => handleUserClick('李小红')}
            />
            <UserCard
              name='王小强'
              role='后端开发工程师'
              avatar='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
              status='offline'
              onClick={() => handleUserClick('王小强')}
            />
          </div>
          {selectedUser && (
            <div className='mt-4 p-4 bg-blue-900 rounded-lg'>
              <p className='text-blue-100'>
                当前选择的用户：<strong>{selectedUser}</strong>
              </p>
            </div>
          )}
        </section>

        {/* 产品卡片演示 */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6 text-white'>产品卡片组件演示</h2>
          <p className='text-gray-300 mb-6'>展示更复杂的混合使用场景，结合 Tailwind 的响应式特性和 CSS Module 的定制样式</p>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <ProductCard
              title='高级机械键盘'
              price={899}
              originalPrice={1299}
              image='https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop'
              category='数码配件'
              isNew={true}
              onAddToCart={() => handleAddToCart('高级机械键盘')}
            />
            <ProductCard
              title='无线蓝牙耳机'
              price={299}
              image='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop'
              category='音频设备'
              onAddToCart={() => handleAddToCart('无线蓝牙耳机')}
            />
            <ProductCard
              title='智能手表'
              price={1599}
              originalPrice={1999}
              image='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop'
              category='智能穿戴'
              onAddToCart={() => handleAddToCart('智能手表')}
            />
          </div>
        </section>

        {/* 最佳实践总结 */}
        <section className={`${styles.bestPractices} p-8 rounded-xl`}>
          <h2 className='text-2xl font-semibold mb-6 text-center text-white'>最佳实践总结</h2>

          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4 text-green-400'>✅ 推荐做法</h3>
              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <span className='text-green-400 mr-2'>•</span>
                  <span className='text-gray-300'>使用 Tailwind 处理布局、间距、响应式</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-green-400 mr-2'>•</span>
                  <span className='text-gray-300'>用 CSS Module 处理组件特有的设计系统</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-green-400 mr-2'>•</span>
                  <span className='text-gray-300'>保持类名语义化，便于维护</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-green-400 mr-2'>•</span>
                  <span className='text-gray-300'>利用 CSS 变量实现主题切换</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-green-400 mr-2'>•</span>
                  <span className='text-gray-300'>组件内部样式优先使用 CSS Module</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4 text-red-400'>❌ 避免的做法</h3>
              <ul className='space-y-3'>
                <li className='flex items-start'>
                  <span className='text-red-400 mr-2'>•</span>
                  <span className='text-gray-300'>过度依赖 Tailwind，忽略组件封装</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-red-400 mr-2'>•</span>
                  <span className='text-gray-300'>在 CSS Module 中重复 Tailwind 的功能</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-red-400 mr-2'>•</span>
                  <span className='text-gray-300'>混用时忽略样式优先级问题</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-red-400 mr-2'>•</span>
                  <span className='text-gray-300'>不统一的命名约定和代码风格</span>
                </li>
                <li className='flex items-start'>
                  <span className='text-red-400 mr-2'>•</span>
                  <span className='text-gray-300'>忽略 CSS Bundle 大小的优化</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-8 p-6 bg-gradient-to-r rounded-lg'>
            <h4 className='font-semibold mb-2 text-white'>核心理念</h4>
            <p className='text-white'>
              <strong>Tailwind CSS</strong> 提供快速开发和一致性，
              <strong>CSS Module</strong> 提供组件封装和定制化。 两者结合使用时，应该发挥各自的优势，形成互补而非竞争的关系。
            </p>
          </div>
        </section>

        {/* 操作按钮区域 */}
        <section className='mt-12 text-center'>
          <div className='flex flex-wrap justify-center gap-4'>
            <button
              className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
              onClick={() => addNotification('info', '这是一个信息提示')}
            >
              触发信息通知
            </button>
            <button
              className='px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
              onClick={() => addNotification('success', '操作成功完成！')}
            >
              触发成功通知
            </button>
            <button
              className='px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors'
              onClick={() => addNotification('warning', '请注意这个警告')}
            >
              触发警告通知
            </button>
            <button
              className='px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
              onClick={() => addNotification('error', '发生了一个错误')}
            >
              触发错误通知
            </button>
          </div>
        </section>
      </main>

      <footer className='mt-16 py-8 text-center text-gray-300 border-t border-gray-600'>
        <p>Built with ❤️ using Tailwind CSS + CSS Module</p>
      </footer>
    </div>
  );
};

export default TailwindCSSModulePage;
