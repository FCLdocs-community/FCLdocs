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

function normalizeTermPath(rawPath) {
  let path = String(rawPath || '').trim();
  path = path.replace(/^window:/, '');
  path = path.split('#')[0];
  path = path.replace(/^\/+/, '');
  if (!path.startsWith('term/')) return null;
  if (!path.endsWith('.md')) path += '.md';
  return path;
}

async function loadTermHtml(rawPath, baseUrl) {
  const mdPath = normalizeTermPath(rawPath);
  if (!mdPath) throw new Error('无效的术语链接');

  const termId = mdPath.split('/').pop().replace(/\.md$/, '');
  let mdContent = mdCache.get(mdPath);

  if (!mdContent) {
    const cleanBase = baseUrl.replace(/\/$/, '');
    const res = await fetch(`${cleanBase}/${mdPath}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    mdContent = await res.text();
    mdCache.set(mdPath, mdContent);
  }

  return processTermMarkdown(mdContent, termId);
}

// ========== 弹窗 ==========
function TermModal({ html, loading, error, onClose, onBack, canGoBack, onTermNavigate }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => onClose(), ANIMATION_DURATION);
  }, [isClosing, onClose]);

  const handleContentClick = useCallback(
    (e) => {
      const anchor = e.target?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (!href.startsWith('window:')) return;
      e.preventDefault();
      onTermNavigate(href);
    },
    [onTermNavigate]
  );

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
        {canGoBack && (
          <div className={styles.modalHeader}>
            <button type="button" className={styles.backBtn} onClick={onBack}>← 返回</button>
          </div>
        )}
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
            onClick={handleContentClick}
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
  const hexColor = color.startsWith('#') ? color : `#${color}`;

  const [history, setHistory] = useState([]);
  const requestKeyRef = React.useRef(0);

  const openTerm = useCallback(
    async (rawPath, push) => {
      requestKeyRef.current += 1;
      const key = requestKeyRef.current;
      const entry = { key, html: '', loading: true, error: null };

      setHistory((prev) => (push ? [...prev, entry] : [entry]));

      try {
        const html = await loadTermHtml(rawPath, baseUrl);
        setHistory((prev) =>
          prev.map((item) => (item.key === key ? { ...item, html, loading: false } : item))
        );
      } catch (err) {
        setHistory((prev) =>
          prev.map((item) =>
            item.key === key ? { ...item, error: err.message, loading: false } : item
          )
        );
      }
    },
    [baseUrl]
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      if (history.length > 0) return;
      openTerm(path, false);
    },
    [history.length, openTerm, path]
  );

  const handleNavigate = useCallback(
    (href) => {
      openTerm(href, true);
    },
    [openTerm]
  );

  const handleBack = useCallback(() => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const handleClose = useCallback(() => {
    setHistory([]);
  }, []);

  const current = history[history.length - 1];

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
      {current && (
        <TermModal
          html={current.html}
          loading={current.loading}
          error={current.error}
          onClose={handleClose}
          onBack={handleBack}
          canGoBack={history.length > 1}
          onTermNavigate={handleNavigate}
        />
      )}
    </>
  );
}
