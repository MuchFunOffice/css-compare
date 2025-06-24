import { Link, Outlet } from 'umi';
import styles from './index.less';
import { useState } from 'react';

export default function Layout() {
  const [navsListActive, setNavsListActive] = useState(false);
  return (
    <div className={styles.navs}>
      {/* 统一的切换按钮 */}
      <div className={styles.toggleButton} onClick={() => setNavsListActive(!navsListActive)}>
        {navsListActive ? '☰' : '×'}
      </div>

      <ul className={`${styles.navsList} ${navsListActive ? styles.navsListActive : ''}`}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/performance-comparison'>性能对比</Link>
        </li>
        <li>
          <Link to='/css-performance'>CSS测试</Link>
        </li>
        <li>
          <Link to='/styled-performance'>CSS-in-JS测试</Link>
        </li>
        <li>
          <Link to='/tailwind'>Tailwind</Link>
        </li>
        <li>
          <Link to='/BEM'>BEM</Link>
        </li>
        <li>
          <Link to='/css-module'>CSS Module</Link>
        </li>
        <li>
          <Link to='/tailwind+css'>Tailwind+CSS</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
