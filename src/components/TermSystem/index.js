import React, { useState, useCallback, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { marked } from 'marked';
import styles from './styles.module.css';

const mdCache = new Map();
const ANIMATION_DURATION = 200; // 和 CSS 动画时长保持一致

// ========== 弹窗（带关闭动画）==========
function TermModal({ html, loading, error, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  // 统一关闭入口：先播动画，再真正卸载
  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  }, [isClosing, onClose]);

  // ESC 键关闭
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

  const overlayClass = `${styles.overlay} ${isClosing ? styles.closing : ''}`;
  const modalClass = `${styles.modal} ${isClosing ? styles.closing : ''}`;

  return (
    <div className={overlayClass} onClick={handleClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="关闭"
        >
          ×
        </button>

        {loading && <div className={styles.loading}>加载中...</div>}

        {error && (
          <div className={styles.error}>
            <strong>加载失败</strong>
            <p>{error}</p>
          </div>
        )}

        {html && !loading && !error && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}

// ========== 术语链接（不变）==========
export function TermLink({ path, color, children }) {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || '/';

  const [isOpen, setIsOpen] = useState(false);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hexColor = color.startsWith('#') ? color : `#${color}`;

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();
      if (isOpen) return;

      setIsOpen(true);
      setLoading(true);
      setError(null);

      try {
        let mdContent = mdCache.get(path);

        if (!mdContent) {
          const cleanBase = baseUrl.replace(/\/$/, '');
          const fullPath = `${cleanBase}${path}`;

          const res = await fetch(fullPath);
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          mdContent = await res.text();
          mdCache.set(path, mdContent);
        }

        const parsed = marked.parse(mdContent);
        setHtml(parsed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [path, baseUrl, isOpen]
  );

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
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClick(e);
        }}
      >
        {children}
      </span>
      {isOpen && (
        <TermModal
          html={html}
          loading={loading}
          error={error}
          onClose={handleClose}
        />
      )}
    </>
  );
}
