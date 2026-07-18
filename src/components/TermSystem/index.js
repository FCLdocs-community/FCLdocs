import React, { useState, useCallback, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { marked } from 'marked';
import styles from './styles.module.css';

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

  // 去掉代码块 title 属性，让 marked 正常解析
  md = md.replace(/```(\w+)\s+title="[^"]*"/g, '```$1');

  return md;
}

// 提取 [brief]...[/brief] 和 [detail]...[/detail]
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

// ========== 弹窗（不变）==========
function TermModal({ html, loading, error, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => onClose(), ANIMATION_DURATION);
  }, [isClosing, onClose]);

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

// ========== 术语链接（不变）==========
export function TermLink({ path, color, children }) {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || '/';
  const termId = path.split('/').pop().replace(/\.md$/, '');

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

        const processed = processTermMarkdown(mdContent, termId);
        setHtml(processed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [path, baseUrl, isOpen, termId]
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
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
      >
        {children}
      </span>
      {isOpen && (
        <TermModal html={html} loading={loading} error={error} onClose={handleClose} />
      )}
    </>
  );
}