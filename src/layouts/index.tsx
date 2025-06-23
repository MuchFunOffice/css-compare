import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>导航菜单</h2>
        </div>
        <ul>
          <li>
            <Link to='/'>首页</Link>
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
            <Link to='/BEM'>BEM</Link>
          </li>
          <li>
            <Link to='/tailwind'>Tailwind</Link>
          </li>
          <li>
            <Link to='/css-module'>CSS Module</Link>
          </li>
        </ul>
      </div>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}
