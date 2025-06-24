# Tailwind CSS × CSS Module 混合使用最佳实践

## 概述

本示例展示了如何在 React 项目中有效地结合 Tailwind CSS 和 CSS Module，发挥两种技术的优势，创建可维护、可扩展的样式架构。

## 核心理念

### 🎨 Tailwind CSS 负责的领域
- **布局和间距**: `flex`, `grid`, `p-*`, `m-*`, `space-*`
- **响应式设计**: `sm:`, `md:`, `lg:`, `xl:` 前缀
- **状态变化**: `hover:`, `focus:`, `active:`, `disabled:`
- **通用动画**: `transition-*`, `duration-*`, `ease-*`
- **基础颜色**: `text-*`, `bg-*` 等系统颜色

### 🔧 CSS Module 负责的领域
- **组件特有样式**: 品牌色彩、自定义形状
- **复杂视觉效果**: 渐变、阴影、动画关键帧
- **伪元素和选择器**: `::before`, `::after`, `:nth-child`
- **主题系统**: CSS 变量、暗色模式
- **高级动画**: `@keyframes` 自定义动画

## 文件结构

```
src/pages/template/tailwind-css/
├── index.tsx          # 主组件文件
├── index.less         # CSS Module 样式文件
└── README.md          # 说明文档
```

## 实现策略

### 1. 样式类名混合使用

```tsx
// ✅ 推荐：Tailwind 处理布局，CSS Module 处理定制
<div className={`p-6 rounded-lg shadow-md ${styles.userCard}`}>
  <div className="flex items-center space-x-4">
    <img className="w-12 h-12 rounded-full object-cover" />
    <div className={styles.statusIndicator} />
  </div>
</div>
```

### 2. 组件化的最佳实践

#### 用户卡片组件
```tsx
const UserCard: React.FC<UserCardProps> = ({ name, role, avatar, status }) => {
  return (
    <div className={`
      p-6 rounded-lg shadow-md hover:shadow-lg 
      transition-shadow duration-300 cursor-pointer
      ${styles.userCard}
    `}>
      {/* Tailwind 处理布局 */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img className="w-12 h-12 rounded-full object-cover" />
          {/* CSS Module 处理状态指示器 */}
          <div className={`${styles.statusIndicator} ${styles[`status-${status}`]}`} />
        </div>
      </div>
    </div>
  );
};
```

### 3. 条件样式处理

```tsx
// ✅ 推荐：使用 CSS Module 处理主题变体
<div className={`${baseClasses} ${styles.notification} ${styles[`notification-${type}`]}`}>
  {message}
</div>
```

```less
// 对应的 CSS Module 样式
.notification {
  border-left: 4px solid;
  backdrop-filter: blur(10px);
  
  &.notification-success {
    background: linear-gradient(135deg, #10b981, #059669);
    border-left-color: #065f46;
  }
  
  &.notification-error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    border-left-color: #991b1b;
  }
}
```

## 技术特性

### 响应式设计
- Tailwind 的响应式前缀: `sm:grid-cols-2 lg:grid-cols-3`
- CSS Module 的媒体查询: 处理复杂的响应式逻辑

### 主题支持
- CSS 变量定义主题色彩
- 自动适配暗色模式 `@media (prefers-color-scheme: dark)`
- 高对比度模式支持 `@media (prefers-contrast: high)`

### 无障碍访问
- 减少动画模式 `@media (prefers-reduced-motion: reduce)`
- 语义化的状态指示器
- 键盘导航友好的交互设计

### 性能优化
- CSS Module 的自动代码分割
- Tailwind 的 PurgeCSS 移除未使用样式
- 合理的动画性能优化

## 组件演示

### 1. 用户卡片
展示基础的混合使用模式：
- Tailwind: 布局、间距、悬停效果
- CSS Module: 左侧装饰条、状态指示器

### 2. 产品卡片
复杂组件的混合使用：
- Tailwind: 响应式网格、图片处理
- CSS Module: 徽章样式、悬停覆盖层、按钮渐变

### 3. 通知组件
动态样式的处理：
- Tailwind: 基础布局和动画
- CSS Module: 主题色彩和玻璃态效果

## 最佳实践总结

### ✅ 推荐做法

1. **职责分离**: Tailwind 处理通用样式，CSS Module 处理特定组件样式
2. **语义化命名**: CSS Module 类名要有明确的语义
3. **响应式优先**: 优先使用 Tailwind 的响应式系统
4. **性能考虑**: 避免重复定义 Tailwind 已有的功能
5. **维护性**: 保持一致的代码风格和命名约定

### ❌ 避免的做法

1. **重复功能**: 不要在 CSS Module 中重写 Tailwind 的基础功能
2. **过度定制**: 避免为了定制而放弃 Tailwind 的便利性
3. **样式优先级冲突**: 注意 CSS Module 和 Tailwind 的样式优先级
4. **忽略 Bundle 大小**: 合理控制 CSS 文件大小
5. **不一致的使用模式**: 团队内要保持统一的使用规范

## 工具链配置

### Tailwind CSS 配置
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      // 自定义扩展
    }
  }
};
```

### CSS Module 配置
```javascript
// webpack.config.js 或 vite.config.js
{
  test: /\.less$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      }
    },
    'less-loader'
  ]
}
```

## 总结

Tailwind CSS 和 CSS Module 的混合使用不是竞争关系，而是互补关系。通过合理的职责分工：

- **Tailwind CSS** 提供快速开发、一致性和响应式能力
- **CSS Module** 提供组件封装、主题定制和复杂效果

这种混合使用模式能够：
1. 提高开发效率
2. 保持代码可维护性
3. 支持复杂的设计需求
4. 确保样式的可扩展性

通过本示例的学习，你可以在实际项目中灵活运用这两种技术，创建既美观又高效的用户界面。 