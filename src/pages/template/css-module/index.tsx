import React from 'react';
import styles from './index.less';

const CSSModulePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>CSS Module</h1>
        <p className={styles.subtitle}>模块化 CSS 解决方案</p>
      </header>

      <div className={styles.content}>
        {/* 什么是 CSS Module */}
        <section className={styles.section}>
          <h2>什么是 CSS Module？</h2>
          <p>
            CSS Module 是一种流行的 CSS 解决方案，它通过构建工具将 CSS 类名转换为局部作用域的唯一标识符， 从而解决了传统 CSS
            中类名冲突和全局污染的问题。
          </p>
          <p>
            在 CSS Module 中，每个 CSS 文件都被视为一个独立的模块，其中的类名会被自动转换为唯一的哈希值，
            确保样式的封装性和可维护性。
          </p>

          <div className={styles.demoBox}>
            <h4>这是一个使用 CSS Module 样式的演示区域</h4>
            <p>注意：这个区域的样式完全隔离，不会影响其他组件</p>
          </div>
        </section>

        {/* 工作原理 */}
        <section className={styles.section}>
          <h2>工作原理</h2>
          <h3>1. 编写阶段</h3>
          <div className={styles.codeBlock}>
            <pre>{`/* styles.module.css */
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.primary {
  background-color: #28a745;
}`}</pre>
          </div>

          <h3>2. 构建转换</h3>
          <p>构建工具会将类名转换为唯一标识符：</p>
          <div className={styles.codeBlock}>
            <pre>{`/* 转换后 */
.button_a1b2c3 {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.primary_d4e5f6 {
  background-color: #28a745;
}`}</pre>
          </div>

          <h3>3. JavaScript 中使用</h3>
          <div className={styles.codeBlock}>
            <pre>{`import styles from './styles.module.css';

function Button() {
  return (
    <button className={styles.button}>
      普通按钮
    </button>
  );
}`}</pre>
          </div>
        </section>

        {/* 优势 */}
        <section className={`${styles.section} ${styles.advantages}`}>
          <h2>优势</h2>

          <div className={styles.advantageItem}>
            <strong>局部作用域：</strong>
            CSS 类名自动转换为唯一标识符，避免了全局命名冲突，每个组件的样式完全隔离。
          </div>

          <div className={styles.advantageItem}>
            <strong>明确的依赖关系：</strong>
            通过 import 语句明确声明样式依赖，使得样式和组件的关系更加清晰，便于维护。
          </div>

          <div className={styles.advantageItem}>
            <strong>自动删除未使用样式：</strong>
            配合构建工具，可以自动识别和删除未使用的 CSS 规则，减少最终打包文件的大小。
          </div>

          <div className={styles.advantageItem}>
            <strong>CSS 预处理器支持：</strong>
            完美支持 Sass、Less、Stylus 等预处理器，可以享受变量、嵌套、混入等高级特性。
          </div>

          <div className={styles.advantageItem}>
            <strong>类型安全：</strong>
            配合 TypeScript，可以为 CSS 类名提供类型检查，减少拼写错误。
          </div>
        </section>

        {/* 劣势 */}
        <section className={`${styles.section} ${styles.disadvantages}`}>
          <h2>劣势</h2>

          <div className={styles.disadvantageItem}>
            <strong>学习成本：</strong>
            需要了解 CSS Module 的工作机制和配置方法，对新手来说有一定的学习曲线。
          </div>

          <div className={styles.disadvantageItem}>
            <strong>构建工具依赖：</strong>
            必须依赖 Webpack、Vite 等构建工具的支持，无法在纯静态环境中直接使用。
          </div>

          <div className={styles.disadvantageItem}>
            <strong>调试困难：</strong>
            生成的类名是哈希值，在浏览器开发者工具中调试时不够直观，需要额外的配置。
          </div>

          <div className={styles.disadvantageItem}>
            <strong>动态类名处理复杂：</strong>
            处理动态生成的类名时比较麻烦，需要使用 classnames 等工具库辅助。
          </div>

          <div className={styles.disadvantageItem}>
            <strong>第三方库集成问题：</strong>
            与一些第三方 UI 库集成时可能出现样式覆盖困难的问题，需要特殊处理。(例如antd需要:global)
          </div>
        </section>

        {/* 总结 */}
        <section className={styles.section}>
          <h2>总结</h2>
          <p>
            CSS Module 是一个强大的样式封装解决方案，特别适合大型项目和团队开发。 它在保持 CSS
            原有语法的基础上，解决了样式冲突和维护性问题。
          </p>
          <p>
            虽然有一定的学习成本和工具依赖，但其带来的好处远大于付出的代价。 对于现代前端开发，CSS Module 是一个值得推荐的选择。
          </p>
          <p>
            <strong>适用场景：</strong> 中大型 React/Vue 项目、需要样式隔离的组件库、多人协作的前端项目。
          </p>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>Built with ❤️ using CSS Module</p>
      </footer>
    </div>
  );
};

export default CSSModulePage;
