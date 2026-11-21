import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import commitData from '../../../static/data/contributor-commits.json';
import styles from './styles.module.css';

const REPO = commitData.repo || 'FCLdocs-community/FCLdocs';
const COMMITS_BY_AUTHOR = commitData.contributors || {};

function isEmpty(value) {
  return value === 0 || value === '0' || value === '' || value == null;
}

function avatarUrl(url, size) {
  if (!url) return '';
  return `${url}${url.includes('?') ? '&' : '?'}s=${size}`;
}

function commitsUrl(name) {
  return `https://github.com/${REPO}/commits?author=${encodeURIComponent(name)}`;
}

function formatDate(value) {
  if (!value) return '';
  return value.slice(0, 10);
}

const DATA_DATE = formatDate(commitData.generatedAt);

function ContributorModal({ contributor, onClose }) {
  const { name, avatar, qq, bilibili, contributions } = contributor;
  const commits = COMMITS_BY_AUTHOR[name] || [];
  const closeRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contributor-modal-title"
        onClick={(e) => e.stopPropagation()}
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

        <div className={styles.modalHeader}>
          {!isEmpty(avatar) && (
            <img className={styles.modalAvatar} src={avatarUrl(avatar, 160)} alt={`${name} 的头像`} />
          )}
          <div>
            <h2 id="contributor-modal-title" className={styles.modalName}>{name}</h2>
            <a className={styles.githubLink} href={`https://github.com/${name}`} target="_blank" rel="noreferrer">
              GitHub 主页 ↗
            </a>
          </div>
        </div>

        {!isEmpty(contributions) && <p className={styles.contributions}>{contributions}</p>}

        {(!isEmpty(qq) || !isEmpty(bilibili)) && (
          <div className={styles.social}>
            {!isEmpty(qq) && (
              <a
                className={`${styles.socialLink} ${styles.qqLink}`}
                href={`https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`}
                target="_blank"
                rel="noreferrer"
              >
                QQ 联系
              </a>
            )}
            {!isEmpty(bilibili) && (
              <a className={`${styles.socialLink} ${styles.bilibiliLink}`} href={bilibili} target="_blank" rel="noreferrer">
                B站主页
              </a>
            )}
          </div>
        )}

        <div className={styles.commits}>
          <div className={styles.commitsHeader}>
            <h3>最近提交</h3>
            <a href={commitsUrl(name)} target="_blank" rel="noreferrer">查看全部 ↗</a>
          </div>

          {commits.length === 0 && (
            <p className={styles.commitState}>暂无公开提交记录，可能通过其他方式参与了文档建设。</p>
          )}
          {commits.length > 0 && (
            <>
              <ul className={styles.commitList}>
                {commits.map((commit) => {
                  const message = commit.message || '';
                  const sha = commit.sha || '';
                  return (
                    <li key={sha} className={styles.commitItem}>
                      <a className={styles.commitMessage} href={`https://github.com/${REPO}/commit/${sha}`} target="_blank" rel="noreferrer">
                        {message || '(无提交说明)'}
                      </a>
                      <span className={styles.commitMeta}>
                        <span className={styles.commitSha}>{sha.slice(0, 7)}</span>
                        <span>{formatDate(commit.date)}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className={styles.commitNote}>提交数据于 {DATA_DATE} 同步，最新记录请以 GitHub 为准。</p>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function ContributorList({ contributors = [] }) {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.avatarList}>
        {contributors.map((contributor) => (
          <li key={contributor.name}>
            <button
              type="button"
              className={styles.avatarButton}
              title={contributor.name}
              aria-label={`查看 ${contributor.name} 的贡献`}
              onClick={() => setSelected(contributor)}
            >
              <img
                src={avatarUrl(contributor.avatar, 96)}
                alt={contributor.name}
                loading="lazy"
                width="48"
                height="48"
              />
            </button>
          </li>
        ))}
      </ul>

      {selected && <ContributorModal contributor={selected} onClose={close} />}
    </div>
  );
}
