import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from '@docusaurus/Link';
import styles from './StartGuideModal.module.css';

export default function StartGuideModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-guide-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="关闭"
        >
          ×
        </button>

        <h2 id="start-guide-title" className={styles.title}>先看哪个教程？</h2>
        <p className={styles.subtitle}>
          第一次用 FCL，建议从新手文档开始；已经会基础操作，可以直接看进阶文档。
        </p>

        <div className={styles.options}>
          <Link className={styles.option} to="/docs" onClick={onClose}>
            <span className={styles.icon} aria-hidden="true">📘</span>
            <span className={styles.optionText}>
              <strong>FCL 新手文档</strong>
              <small>下载安装、首次使用和基础操作</small>
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>

          <Link className={styles.option} to="/SuperDocs/" onClick={onClose}>
            <span className={styles.icon} aria-hidden="true">🚀</span>
            <span className={styles.optionText}>
              <strong>FCL 进阶文档</strong>
              <small>启动器原理、游戏设置和开服</small>
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
