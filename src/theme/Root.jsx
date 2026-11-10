// src/theme/Root.jsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

// ========== 浏览器兼容性配置 ==========
const REQUIRED_APIS = [
  () => typeof String.prototype.at === 'function',
  () => typeof Array.prototype.at === 'function',
];

// ========== 浏览器兼容性提示横幅 ==========
function BrowserCompatBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('compat-banner-dismissed')) return;
    const allSupported = REQUIRED_APIS.every((check) => {
      try { return check(); } catch { return false; }
    });
    if (!allSupported) setVisible(true);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('compat-banner-dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.compatBanner}>
      <div className={styles.compatContent}>
        <strong>⚠️ 当前浏览器可能无法完整显示本站内容</strong>
        <p>为获得最佳体验，建议使用以下浏览器：</p>
        <div className={styles.compatSection}>
          <span className={styles.compatLabel}>📱 手机端</span>
          <ul className={styles.compatList}>
            <li>Chrome for Android / iOS</li>
            <li>Safari 15+（iPhone / iPad）</li>
            <li>Edge Mobile</li>
          </ul>
        </div>
        <div className={styles.compatSection}>
          <span className={styles.compatLabel}>💻 电脑端</span>
          <ul className={styles.compatList}>
            <li>Chrome 92+ / Edge 92+</li>
            <li>Firefox 90+</li>
            <li>Safari 15.4+</li>
          </ul>
        </div>
        <button className={styles.compatBtn} onClick={handleDismiss} aria-label="关闭兼容性提示">
          我知道了
        </button>
      </div>
    </div>
  );
}

// ========== 根组件 ==========
export default function Root({ children }) {
  return (
    <>
      {children}
      <BrowserCompatBanner />
    </>
  );
}
