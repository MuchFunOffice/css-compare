# CSS vs CSS-in-JS 性能对比项目

这个项目用于对比传统 CSS 和 CSS-in-JS (styled-components) 的性能差异，确保测试的客观性和准确性。

## 🎯 项目目标

- 对比传统 CSS 与 CSS-in-JS 在渲染性能方面的差异
- 确保 DOM 结构完全一致
- 使用相同的性能测量方法
- 提供详细的性能分析和建议

## 📁 项目结构

```
src/
├── pages/
│   ├── performance-comparison.tsx  # 性能对比主页
│   ├── css-performance.tsx         # 传统 CSS 测试页面
│   ├── css-performance.css         # 传统 CSS 样式文件
│   └── styled-performance.tsx      # CSS-in-JS 测试页面
├── utils/
│   └── performanceUtils.ts         # 性能测量工具
└── layouts/
    └── index.tsx                   # 布局组件
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 访问页面

- 主页：http://localhost:8000/
- 性能对比：http://localhost:8000/performance-comparison
- CSS 测试：http://localhost:8000/css-performance
- CSS-in-JS 测试：http://localhost:8000/styled-performance

## 📊 测试方法

### 1. DOM 结构一致性

两个测试页面使用完全相同的：
- 组件结构
- 数据量（1000个列表项）
- 交互元素
- 样式效果

### 2. 性能测量指标

- **渲染时间 (Render Time)**: 组件完整渲染所需时间
- **绘制时间 (Paint Time)**: 浏览器绘制内容所需时间
- **布局时间 (Layout Time)**: 样式计算和布局所需时间
- **内存使用 (Memory Usage)**: JavaScript 堆内存使用量
- **样式重计算时间 (Style Recalc Time)**: 样式重新计算所需时间

### 3. 测试数据

- 1000个复杂列表项
- 每个项目包含：
  - 标题和描述文本
  - 状态标签（active/pending/completed）
  - 三个操作按钮
  - 悬停动画效果
  - 条件样式渲染

## 🔧 技术栈

- **框架**: Umi.js + React + TypeScript
- **CSS-in-JS**: styled-components
- **性能测量**: Performance API + PerformanceObserver
- **包管理**: pnpm

## 📈 性能分析工具

### PerformanceTracker 类

```typescript
const tracker = new PerformanceTracker();
tracker.startMeasuring('test-name');
// ... 执行测试代码 ...
tracker.endMeasuring('test-name');
const metrics = await tracker.getAllMetrics();
```

### useAdvancedPerformance Hook

```typescript
const { metrics, isLoading } = useAdvancedPerformance('component-name');
```

### BatchPerformanceTest 类

用于批量测试和对比分析：

```typescript
const batchTest = new BatchPerformanceTest();
await batchTest.runTest('css-test', testFunction, 5);
await batchTest.runTest('styled-test', testFunction, 5);
const comparison = batchTest.compareResults('css-test', 'styled-test');
```

## 📋 测试结果解读

### 典型性能差异

1. **传统 CSS 优势**:
   - 更快的初始渲染（10-30ms vs 20-50ms）
   - 更低的内存使用（15-20MB vs 20-28MB）
   - 无运行时开销
   - 更好的浏览器缓存支持

2. **CSS-in-JS 开销**:
   - 运行时样式生成
   - 额外的 JavaScript 执行
   - 动态样式注入
   - 更高的内存占用

### 性能优化建议

#### 选择传统 CSS 当：
- 性能是首要考虑因素
- 构建大型、高流量应用
- 样式相对静态
- 团队熟悉传统 CSS 工作流

#### 选择 CSS-in-JS 当：
- 需要动态样式计算
- 开发组件库
- 需要严格的样式隔离
- 团队更注重开发效率

## 🛠️ 自定义测试

### 添加新的测试场景

1. 在 `src/pages/` 目录下创建新的测试页面
2. 确保使用相同的数据结构和 DOM 层次
3. 使用 `useAdvancedPerformance` Hook 进行性能测量
4. 在布局中添加导航链接

### 修改测试数据

在测试页面中修改以下参数：
- 列表项数量（当前为 1000）
- 组件复杂度
- 样式复杂度
- 交互元素数量

## 📊 基准测试数据

基于 Chrome 浏览器的测试结果（仅供参考）：

| 指标 | 传统 CSS | CSS-in-JS | 差异 |
|------|----------|-----------|------|
| 渲染时间 | ~20ms | ~35ms | CSS 快 43% |
| 内存使用 | ~17MB | ~24MB | CSS 节省 29% |
| 包大小影响 | 无 | +13KB | CSS 更小 |

*实际性能会因设备、浏览器、数据量等因素而有所不同*

## 🔍 调试和监控

### 使用浏览器开发者工具

1. **Performance 面板**: 录制页面加载和交互
2. **Memory 面板**: 监控内存使用和泄漏
3. **Network 面板**: 检查资源加载时间
4. **Elements 面板**: 查看生成的样式

### 性能监控

项目集成了自动性能监控，访问测试页面时会自动收集性能数据并显示在页面上。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 确保新增测试覆盖相同的 DOM 结构
4. 提交 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

如有问题或建议，请创建 Issue 或 PR。 