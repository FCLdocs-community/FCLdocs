import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const BRANDS = [
  { id: 'xiaomi', label: '小米' },
  { id: 'vivo', label: 'vivo' },
  { id: 'oppo', label: 'OPPO' },
  { id: 'oneplus', label: '一加' },
  { id: 'realme', label: 'realme' },
  { id: 'huawei', label: '华为' },
  { id: 'honor', label: '荣耀' },
  { id: 'samsung', label: '三星' },
  { id: 'meizu', label: '魅族' },
];

const STORAGE_KEY = 'docs-preferred-brand';

/** 当前 URL hash 对应的品牌；TOC 锚点落在某个 BrandStep 内时返回该品牌 */
function brandFromHash() {
  if (typeof window === 'undefined') return null;
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  if (!id) return null;
  const target = document.getElementById(id);
  const step = target?.closest('[data-brand]');
  return step?.getAttribute('data-brand') || null;
}

function scrollToHash() {
  if (typeof window === 'undefined') return;
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  if (!id) return;
  // 等品牌切换完成、目标内容显示后再滚动
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 0);
}

export default function BrandSteps({ children }) {
  const [activeBrand, setActiveBrand] = useState('xiaomi');

  useEffect(() => {
    const fromHash = brandFromHash();
    if (fromHash && BRANDS.some(b => b.id === fromHash)) {
      setActiveBrand(fromHash);
      scrollToHash();
    } else {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && BRANDS.some(b => b.id === saved)) {
        setActiveBrand(saved);
      }
    }

    const onHashChange = () => {
      const brand = brandFromHash();
      if (brand && BRANDS.some(b => b.id === brand)) {
        setActiveBrand(brand);
        scrollToHash();
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleChange = (brandId) => {
    setActiveBrand(brandId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, brandId);
    }
  };

  return (
    <div className={styles.brandSteps}>
      <div className={styles.scrollContainer}>
        <div className={styles.brandList} role="tablist">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleChange(brand.id)}
              className={`${styles.brandButton} ${
                activeBrand === brand.id ? styles.active : ''
              }`}
              role="tab"
              aria-selected={activeBrand === brand.id}
            >
              {brand.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        {React.Children.map(children, (child) => {
          const brand = child?.props?.brand;
          if (!brand) return null;
          return (
            <div key={brand} hidden={brand !== activeBrand}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BrandStep({ brand, children }) {
  return <div data-brand={brand}>{children}</div>;
}
