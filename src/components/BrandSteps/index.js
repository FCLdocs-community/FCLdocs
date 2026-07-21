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

export default function BrandSteps({ children }) {
  const [activeBrand, setActiveBrand] = useState('xiaomi');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && BRANDS.some(b => b.id === saved)) {
      setActiveBrand(saved);
    }
  }, []);

  const stepsMap = React.Children.toArray(children).reduce((acc, child) => {
    if (child.props?.brand) {
      acc[child.props.brand] = child;
    }
    return acc;
  }, {});

  const handleChange = (brandId) => {
    setActiveBrand(brandId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, brandId);
    }
  };

  // 避免 SSR 水合不匹配
  if (!mounted) {
    return <div className={styles.skeleton} />;
  }

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
        {stepsMap[activeBrand] || (
          <div className={styles.empty}>
            暂无该品牌的安装指南，请选择其他品牌。
          </div>
        )}
      </div>
    </div>
  );
}

export function BrandStep({ brand, children }) {
  return <div data-brand={brand}>{children}</div>;
}
