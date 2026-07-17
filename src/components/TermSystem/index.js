import React, { useState, useCallback } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { marked } from 'marked';
import styles from './styles.module.css';

// 全局缓存：path -> md原始文本
const mdCache = new Map();

// ========== 弹窗 ==========
function TermModal({ html, loading, error, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
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

// ========== 术语链接 ==========
export function TermLink({ path, color, children }) {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || '/';

  const [isOpen, setIsOpen] = useState(false);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 确保颜色带 # 前缀
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

        // marked 解析 Markdown → HTML
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
