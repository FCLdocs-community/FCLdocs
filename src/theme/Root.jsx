// src/theme/Root.jsx
import React, { useState, useCallback, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { marked } from 'marked';
import styles from './styles.module.css';

// ========== 浏览器兼容性配置 ==========
const REQUIRED_APIS = [
  () => typeof String.prototype.at === 'function',
  () => typeof Array.prototype.at === 'function',
];

// ========== 术语解析与弹窗逻辑（保持原有功能） ==========
const mdCache = new Map();
const ANIMATION_DURATION = 200;

function preprocessDocusaurus(md) {
  if (!md) return md;
  md = md.replace(
    /^:::(\w+)(?:\s+([^\n]*))?\n([\s\S]*?)\n^:::/gm,
    (match, type, title, content) => {
      const displayTitle = title ? title.trim() : type.charAt(0).toUpperCase() + type.slice(1);
      const admonitionClass = `admonition${type.charAt(0).toUpperCase() + type.slice(1)}`;
      const parsedContent = marked.parse(content);
      return `<div class="${styles.admonition} ${styles[admonitionClass]}">
        <div class="${styles.admonitionHeading}">${displayTitle}</div>
        <div class="${styles.admonitionContent}">${parsedContent}</div>
      </div>`;
    }
  );
  md = md.replace(/```(\w+)\s+title="[^"]*"/g, '```$1');
  return md;
}

function processTermMarkdown(mdContent, termId) {
  const briefMatch = mdContent.match(/\[brief\]([\s\S]*?)\[\/brief\]/);
  const detailMatch = mdContent.match(/\[detail\]([\s\S]*?)\[\/detail\]/);
  let mainContent = mdContent;
  let briefHtml = '';
  let detailHtml = '';

  if (briefMatch) {
    briefHtml = marked.parse(preprocessDocusaurus(briefMatch[1].trim()));
    mainContent = mainContent.replace(briefMatch[0], '');
  }
  if (detailMatch) {
    detailHtml = marked.parse(preprocessDocusaurus(detailMatch[1].trim()));
    mainContent = mainContent.replace(detailMatch[0], '');
  }

  const prefixHtml = marked.parse(preprocessDocusaurus(mainContent.trim()));
  if (briefHtml || detailHtml) {
    const switcherHtml = `
      <div class="${styles.segContainer}">
        <input type="radio" name="seg-${termId}" class="${styles.segInput}" id="seg-${termId}-1" checked>
        <div class="${styles.segPanel}">${briefHtml}</div>
        <input type="radio" name="seg-${termId}" class="${styles.segInput}" id="seg-${termId}-2">
        <div class="${styles.segPanel}">${detailHtml}</div>
        <div class="${styles.segControl}">
          <label for="seg-${termId}-1" class="${styles.segLabel}">简略</label>
          <label for="seg-${termId}-2" class="${styles.segLabel}">详细</label>
          <div class="${styles.segSlider}"></div>
        </div>
      </div>
    `;
    return prefixHtml + switcherHtml;
  }
  return prefixHtml;
}

function TermModal({ html, loading, error, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => onClose(), ANIMATION_DURATION);
  }, [isClosing, onClose]);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

  const overlayClass = `${styles.overlay} ${isClosing ? styles.closing : ''}`;
  const modalClass = `${styles.modal} ${isClosing ? styles.closing : ''}`;

  return (
    <div className={overlayClass} onClick={handleClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="关闭">×</button>
        {loading && <div className={styles.loading}>加载中...</div>}
        {error && (
          <div className={styles.error}>
            <strong>加载失败</strong>
            <p>{error}</p>
          </div>
        )}
        {html && !loading && !error && (
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  );
}

export function TermLink({ path, color, children }) {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || '/';
  const termId = path.split('/').pop().replace(/\.md$/, '');
  const [isOpen, setIsOpen] = useState(false);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hexColor = color.startsWith('#') ? color : `#${color}`;

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    if (isOpen) return;
    setIsOpen(true);
    setLoading(true);
    setError(null);
    try {
      const mdPath = path.endsWith('.md') ? path : `${path}.md`;
      let mdContent = mdCache.get(mdPath);
      if (!mdContent) {
        const cleanBase = baseUrl.replace(/\/$/, '');
        const fullPath = `${cleanBase}${mdPath}`;
        const res = await fetch(fullPath);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        mdContent = await res.text();
        mdCache.set(mdPath, mdContent);
      }
      setHtml(processTermMarkdown(mdContent, termId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path, baseUrl, isOpen, termId]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setHtml('');
    setError(null);
  }, []);

  return (
    <>
      <span
        className={styles.termLink}
        style={{ color: hexColor }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      >
        {children}
      </span>
      {isOpen && <TermModal html={html} loading={loading} error={error} onClose={handleClose} />}
    </>
  );
}

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
