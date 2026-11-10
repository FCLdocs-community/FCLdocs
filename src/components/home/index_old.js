import React, { useState } from 'react';
import {
  FontAwesomeIcon, faRocket, faCheck, faBolt, faGithub, faBookOpen, QQIcon, Link,
} from './shared';
import { SCENES, EASTER_EGG_TEXT } from './scenes';
import styles from './index_old.module.css';

/* =========================================================================
 *  从共享场景数据派生静态页所需内容，避免与新版重复维护文案/图片
 * ========================================================================= */
const scrollScenes = SCENES.filter((scene) => scene.type === 'scroll');
const linkScenes = SCENES.filter((scene) => scene.type === 'link');
const startScene = SCENES.find((scene) => scene.type === 'start');

const introItems = scrollScenes[0]?.items ?? [];
const featureItems = scrollScenes.slice(1).flatMap((scene) => scene.items);

const LINK_SECTION_META = {
  github: {
    title: '项目链接',
    icon: <FontAwesomeIcon icon={faGithub} className={styles.icon} />,
  },
  qq: {
    title: '加入我们',
    icon: <QQIcon className={styles.icon} />,
  },
};

/* =========================================================================
 *  单张特性卡片：多图条目点击可循环切换
 * ========================================================================= */
function FeatureCard({ item }) {
  const images = item.images ?? (item.image ? [item.image] : []);
  const multiple = images.length > 1;
  const [index, setIndex] = useState(0);

  const cycle = () => {
    if (multiple) setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className={styles.staticCard}
      onClick={cycle}
      style={multiple ? { cursor: 'pointer' } : undefined}
    >
      {multiple ? (
        <div className={styles.fallbackStacked}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${item.title} ${i + 1}`}
              loading="lazy"
              className={i === index ? styles.fallbackStackedActive : styles.fallbackStackedInactive}
              style={{ zIndex: i === index ? 2 : 1 }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.fallbackImageWrap}>
          <img
            src={images[0]}
            alt={item.title}
            loading="lazy"
            className={styles.fallbackImageActive}
          />
        </div>
      )}
      <h3>
        <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
        {item.title}
      </h3>
      {item.desc && <p>{item.desc}</p>}
    </div>
  );
}

function FallbackHome() {
  return (
    <div className={styles.staticContainer}>
      <section className={styles.staticSection}>
        <h2 className={styles.staticSectionTitle}>
          <FontAwesomeIcon icon={faRocket} className={styles.icon} />
          什么是 FCL？
        </h2>
        <div className={styles.staticGrid}>
          {introItems.map((item) => (
            <FeatureCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className={styles.staticSection}>
        <h2 className={styles.staticSectionTitle}>
          <FontAwesomeIcon icon={faRocket} className={styles.icon} />
          核心特性
        </h2>
        <div className={styles.staticGrid}>
          {featureItems.map((item) => (
            <FeatureCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      {linkScenes.map((scene) => {
        const meta = LINK_SECTION_META[scene.brand];
        return (
          <section className={styles.staticSection} key={scene.title}>
            <h2 className={styles.staticSectionTitle}>
              {meta?.icon}
              {meta?.title}
            </h2>
            <div className={styles.staticLinkRow}>
              <div className={styles.staticLinkCard}>
                <div className={styles.linkIconWrap}>{scene.icon}</div>
                <h3>{scene.title}</h3>
                <p>{scene.desc}</p>
                <a
                  href={scene.link}
                  target={scene.external ? '_blank' : undefined}
                  rel={scene.external ? 'noopener noreferrer' : undefined}
                  className={styles.linkBtn}
                >
                  {scene.iconAlt}
                  <span>{scene.linkText}</span>
                </a>
              </div>
              <div className={styles.staticLinkImage}>
                <img src={scene.image} alt={scene.title} loading="lazy" />
              </div>
            </div>
          </section>
        );
      })}

      <section className={`${styles.staticSection} ${styles.staticEasterEgg}`}>
        <div className={styles.easterEggBadge}>
          <FontAwesomeIcon icon={faBolt} />
          彩蛋
        </div>
        <p className={styles.easterEggText}>{EASTER_EGG_TEXT}</p>
      </section>

      {startScene && (
        <section className={`${styles.staticSection} ${styles.staticStart}`}>
          <h2 className={styles.startSceneTitle}>{startScene.title}</h2>
          <p className={styles.startSceneDesc}>{startScene.desc}</p>
          <Link className={styles.startBtn} to={startScene.to}>
            <FontAwesomeIcon icon={faBookOpen} />
            {startScene.linkText}
          </Link>
        </section>
      )}
    </div>
  );
}

export default FallbackHome;
