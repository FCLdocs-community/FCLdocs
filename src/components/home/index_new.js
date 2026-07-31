import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FontAwesomeIcon, faRocket, faCheck, faBolt, faBookOpen, faGithub, Link } from './shared';
import { StackedImageCycler, QQIcon } from './shared';
import {
  IMG_APP, IMG_1, IMG_VERSION, IMG_MODLOADER, IMG_SHADER,
  IMG_DYNAMIC1, IMG_DYNAMIC2, IMG_DYNAMIC3, IMG_DYNAMIC4,
  IMG_JAVA, IMG_VIRTUALKEY, IMG_THEME,
  IMG_PLUGIN1, IMG_PLUGIN2,
  IMG_FCLGITHUB, IMG_QQ,
  GITHUB_URL, QQ_GROUP_URL,
} from './shared';
import styles from './index_new.module.css';
import sharedStyles from './shared.module.css';

/* =========================================================================
 *  Hook：全局滚动进度
 *  修复 P1-2：以滚动容器顶部为基准计算 progress，排除 Hero 高度干扰
 * ========================================================================= */
function useScrollProgress(spacerRef) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      rafRef.current = requestAnimationFrame(() => {
        const el = spacerRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const containerTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop);
          const containerHeight = rect.height;
          const windowHeight = window.innerHeight;
          const scrollableDistance = containerHeight - windowHeight;

          if (scrollableDistance <= 0) {
            setProgress(0);
          } else {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const relativeScroll = scrollTop - containerTop;
            const ratio = Math.min(Math.max(relativeScroll / scrollableDistance, 0), 1);
            setProgress(ratio);
          }
        } else {
          // 回退：使用文档总高度计算
          const doc = document.documentElement;
          const scrollTop = window.pageYOffset || doc.scrollTop;
          const total = doc.scrollHeight - window.innerHeight;
          const ratio = total > 0 ? Math.min(Math.max(scrollTop / total, 0), 1) : 0;
          setProgress(ratio);
        }
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spacerRef]);

  return progress;
}

/* =========================================================================
 *  场景过渡重叠量
 *  场景边界处前后场景同时渲染，实现交叉淡入淡出
 * ========================================================================= */
const SCENE_OVERLAP = 0;

function getSceneLifecycle(globalProgress, sceneStart, sceneEnd, isLastScene) {
  const sceneProgress = Math.min(Math.max((globalProgress - sceneStart) / (sceneEnd - sceneStart), 0), 1);
  const dwellProgress = Math.min(Math.max((sceneProgress - 0.12) / 0.76, 0), 1);

  const enterStart = sceneStart;
  const enterEnd = sceneStart + (sceneEnd - sceneStart) * 0.15;
  const rawEnter = Math.min(Math.max((globalProgress - enterStart) / (enterEnd - enterStart), 0), 1);
  const enterProgress = sceneStart === 0 && globalProgress <= sceneStart ? 1 : rawEnter;

  const exitStart = sceneStart + (sceneEnd - sceneStart) * 0.80;
  const exitEnd = sceneStart + (sceneEnd - sceneStart) * 0.92;
  const rawExit = isLastScene ? 0 : Math.min(Math.max((globalProgress - exitStart) / (exitEnd - exitStart), 0), 1);
  const exitProgress = Math.pow(rawExit, 1.5);

  const isActive = enterProgress > 0 && exitProgress < 1;

  return { sceneProgress, enterProgress, dwellProgress, exitProgress, isActive };
}

/* =========================================================================
 *  工具：Item 过渡
 * ========================================================================= */
function getItemTransition(dwellProgress, itemCount) {
  if (itemCount <= 1) {
    return { currentIndex: 0, nextIndex: 0, transitionRatio: 0 };
  }

  const itemSpan = 1 / itemCount;
  const rawIndex = dwellProgress / itemSpan;
  const currentIndex = Math.min(Math.floor(rawIndex), itemCount - 1);
  const nextIndex = Math.min(currentIndex + 1, itemCount - 1);

  const transitionZone = 0.4;
  const localProgress = (dwellProgress - currentIndex * itemSpan) / itemSpan;
  const transitionRatio = localProgress > (1 - transitionZone)
    ? (localProgress - (1 - transitionZone)) / transitionZone
    : 0;

  return {
    currentIndex,
    nextIndex,
    transitionRatio: Math.min(Math.max(transitionRatio, 0), 1),
  };
}

function getTransitionGap(ratio) {
  const gapHalf = 0.25;
  const dist = Math.abs(ratio - 0.5);
  if (dist >= gapHalf) return 1;
  return dist / gapHalf;
}

/* =========================================================================
 *  组件：滚动驱动场景
 *  修复 P1-4：StackedImageCycler 不再用 key 变化重建（key 固定为 images[0]）
 *  修复 P2-2：首场景首图使用 loading="eager"
 *  修复 P2-5：移除 willChange，仅活跃场景保留
 *  修复 P2-7：静态样式迁移到 CSS 类，仅动态值保留 inline style
 * ========================================================================= */
function ScrollScene({ title, items, progress, start, end, isLastScene, isFirstScene }) {
  const { enterProgress, dwellProgress, exitProgress, isActive } = getSceneLifecycle(progress, start, end, isLastScene);

  const sceneOpacity = enterProgress * (1 - exitProgress);
  const sceneTranslateY = (1 - enterProgress) * 60 - exitProgress * 60;

  const { currentIndex, nextIndex, transitionRatio } = getItemTransition(dwellProgress, items.length);
  const currentItem = items[currentIndex];
  const nextItem = items[nextIndex];

  const currentScale = 1 - transitionRatio * 0.12;
  const currentTranslateX = -transitionRatio * 40;

  const nextScale = 0.88 + transitionRatio * 0.12;
  const nextTranslateX = (1 - transitionRatio) * 40;

  const gapMultiplier = getTransitionGap(transitionRatio);
  const currentOpacity = (1 - transitionRatio) * gapMultiplier;
  const nextOpacity = transitionRatio * gapMultiplier;

  if (!isActive && sceneOpacity <= 0) return null;

  const eagerFirst = isFirstScene;

  return (
    <div
      className={styles.sceneContainer}
      style={{
        opacity: sceneOpacity,
        transform: `translateY(${sceneTranslateY}px)`,
        willChange: isActive ? 'transform, opacity' : 'auto',
        pointerEvents: sceneOpacity > 0.5 ? 'auto' : 'none',
      }}
    >
      <div className={styles.scrollSceneInner}>
        <div className={styles.scrollSceneLeft}>
          <div className={styles.stickyImageWrap}>
            <div
              className={styles.sceneImageLayer}
              style={{
                opacity: currentOpacity,
                transform: `scale(${currentScale}) translateX(${currentTranslateX}px)`,
                zIndex: 2,
              }}
            >
              {currentItem.images ? (
                <StackedImageCycler
                  images={currentItem.images}
                  interval={currentItem.interval}
                  pauseDuration={currentItem.pause}
                  alt={currentItem.title}
                  eagerFirst={eagerFirst}
                />
              ) : (
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className={styles.sceneImage}
                  loading={eagerFirst ? 'eager' : 'lazy'}
                />
              )}
            </div>

            {transitionRatio > 0 && (
              <div
                className={styles.sceneImageLayer}
                style={{
                  opacity: nextOpacity,
                  transform: `scale(${nextScale}) translateX(${nextTranslateX}px)`,
                  zIndex: 1,
                }}
              >
                {nextItem.images ? (
                  <StackedImageCycler
                    images={nextItem.images}
                    interval={nextItem.interval}
                    pauseDuration={nextItem.pause}
                    alt={nextItem.title}
                  />
                ) : (
                  <img
                    src={nextItem.image}
                    alt={nextItem.title}
                    className={styles.sceneImage}
                    loading="lazy"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.scrollSceneRight}>
          {title && (
            <h2 className={styles.sceneTitle}>
              <FontAwesomeIcon icon={faRocket} className={sharedStyles.icon} />
              {title}
            </h2>
          )}
          {items.map((item, i) => {
            const itemSpan = 1 / items.length;
            const itemEnd = (i + 1) * itemSpan;

            const isCurrent = i === currentIndex;
            const isPast = dwellProgress > itemEnd;

            let opacity, translateX, scale;
            if (isCurrent) {
              opacity = 1;
              translateX = 0;
              scale = 1;
            } else if (isPast) {
              opacity = 0.3;
              translateX = -20;
              scale = 0.97;
            } else {
              opacity = 0.5;
              translateX = 20;
              scale = 0.97;
            }

            return (
              <div
                key={i}
                className={styles.scrollItem}
                style={{
                  opacity,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  borderBottom: i < items.length - 1 ? '1px dashed var(--ifm-color-emphasis-300)' : 'none',
                }}
              >
                <span
                  className={styles.scrollMarker}
                  style={{ opacity: isCurrent ? 1 : 0 }}
                >
                  {isCurrent ? '▶' : ''}
                </span>
                <div className={styles.scrollItemContent}>
                  <h3 style={{ color: isCurrent ? 'var(--ifm-color-primary)' : 'var(--ifm-heading-color)' }}>
                    <FontAwesomeIcon icon={faCheck} className={sharedStyles.checkIcon} />
                    {item.title}
                  </h3>
                  {item.desc && <p>{item.desc}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
 *  组件：链接场景
 * ========================================================================= */
function LinkScene({ icon, iconAlt, title, desc, link, linkText, image, external, progress, start, end, isLastScene }) {
  const { enterProgress, exitProgress, isActive } = getSceneLifecycle(progress, start, end, isLastScene);
  const sceneOpacity = enterProgress * (1 - exitProgress);
  const sceneTranslateY = (1 - enterProgress) * 80 - exitProgress * 80;

  if (!isActive && sceneOpacity <= 0) return null;

  const isQQ = title === 'QQ 群';

  return (
    <div
      className={styles.sceneContainer}
      style={{
        opacity: sceneOpacity,
        transform: `translateY(${sceneTranslateY}px)`,
        willChange: isActive ? 'transform, opacity' : 'auto',
        pointerEvents: sceneOpacity > 0.5 ? 'auto' : 'none',
      }}
    >
      <div
        className={styles.linkSceneInner}
        style={isQQ ? { flexDirection: 'column', alignItems: 'center', gap: 0, justifyContent: 'center' } : {}}
      >
        {isQQ ? (
          <div className={styles.qqSceneCard}>
            <img src={image} alt={title} loading="lazy" className={styles.qqSceneImage} />
            <div className={styles.qqSceneContent}>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a
                href={link}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={sharedStyles.linkBtn}
              >
                {iconAlt}
                <span>{linkText}</span>
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.linkSceneRight}>
              <img src={image} alt={title} loading="lazy" />
            </div>
            <div className={styles.linkSceneLeft}>
              <div className={sharedStyles.linkCard}>
                <div className={sharedStyles.linkIconWrap}>{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <a
                  href={link}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={sharedStyles.linkBtn}
                >
                  {iconAlt}
                  <span>{linkText}</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
 *  组件：彩蛋场景
 * ========================================================================= */
function EasterEggScene({ progress, start, end, isLastScene }) {
  const { enterProgress, exitProgress, isActive } = getSceneLifecycle(progress, start, end, isLastScene);
  const sceneOpacity = enterProgress * (1 - exitProgress);
  const sceneScale = 0.92 + enterProgress * 0.08 - exitProgress * 0.08;

  if (!isActive && sceneOpacity <= 0) return null;

  return (
    <div
      className={styles.sceneContainer}
      style={{
        opacity: sceneOpacity,
        transform: `scale(${sceneScale})`,
        willChange: isActive ? 'transform, opacity' : 'auto',
        pointerEvents: sceneOpacity > 0.5 ? 'auto' : 'none',
      }}
    >
      <div className={sharedStyles.easterEggInner}>
        <div className={sharedStyles.easterEggBadge}>
          <FontAwesomeIcon icon={faBolt} />
          彩蛋
        </div>
        <p className={sharedStyles.easterEggText}>
          你说得对，但是「FoldCraft Launcher」是由FCL-Team基于HMCL的核心功能，使用PojavLauncher后端开发的Minecraft
          Java版启动器。启动器运行在一个被称作「安卓」的系统，在这里，被系统选中的人将被授予「JVM」，导引Java之力。你将扮演一位名为「小白」的神秘用户，在自由的使用中安装不同版本、各有千秋独特的模组，和它们一起运行，找出崩溃闪退的原因，同时逐步发掘「xxException:」的真相。
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
 *  组件：开始场景（最后一个，不淡出）
 * ========================================================================= */
function StartScene({ progress, start, end, isLastScene }) {
  const { enterProgress, isActive } = getSceneLifecycle(progress, start, end, isLastScene);
  const sceneOpacity = enterProgress;
  const sceneTranslateY = (1 - enterProgress) * 50;

  if (!isActive && sceneOpacity <= 0) return null;

  return (
    <div
      className={styles.sceneContainer}
      style={{
        opacity: sceneOpacity,
        transform: `translateY(${sceneTranslateY}px)`,
        willChange: isActive ? 'transform, opacity' : 'auto',
        pointerEvents: sceneOpacity > 0.5 ? 'auto' : 'none',
      }}
    >
      <div className={sharedStyles.startSceneInner}>
        <h2 className={sharedStyles.startSceneTitle}>准备好了吗？</h2>
        <p className={sharedStyles.startSceneDesc}>从零开始，在 Android 手机上畅玩 Minecraft Java 版</p>
        <Link className={sharedStyles.startBtn} to="/docs">
          <FontAwesomeIcon icon={faBookOpen} />
          开始看教程
        </Link>
      </div>
    </div>
  );
}

/* =========================================================================
 *  场景数据
 *  修复 P1-1：重新分配进度区间，后段场景获得更多滚动距离
 * ========================================================================= */
const SCENES = [
  {
    type: 'scroll',
    start: 0.00,
    end: 0.14,
    title: '什么是 FCL？',
    items: [
      { title: 'Fold Craft Launcher（FCL）', desc: '是由 FCL-Team 开发的 Android 平台 Minecraft: Java Edition 启动器。', image: IMG_APP },
      { title: '基于 HMCL 核心 + PojavLauncher 后端', desc: '基于HMCL的核心功能，使用PojavLauncher后端，让您能在移动设备上畅玩Java版MC，支持模组加载与全版本运行。', image: IMG_1 },
    ],
  },
  {
    type: 'scroll',
    start: 0.14,
    end: 0.36,
    title: '核心特性',
    items: [
      { title: '原生支持 Minecraft 全版本', desc: '包括最新快照，让你始终走在版本最前沿。', image: IMG_VERSION },
      { title: '支持各种模组加载器', desc: 'Forge / NeoForge / Fabric / Quilt / LiteLoader / OptiFine 一应俱全。', image: IMG_MODLOADER },
      { title: '光影支持', desc: '需 Zink / MG 渲染器，让画面更加绚丽。', image: IMG_SHADER },
      { title: '动态资源管理', desc: '模组 / 整合包 / 材质 / 光影 / 存档，一站式管理。', images: [IMG_DYNAMIC1, IMG_DYNAMIC2, IMG_DYNAMIC3, IMG_DYNAMIC4], interval: 600, pause: 3000 },
    ],
  },
  {
    type: 'scroll',
    start: 0.36,
    end: 0.47,
    title: '核心特性',
    items: [
      { title: '内置多版本 Java 运行时', desc: 'Java 8 / 17 / 21 / 25 全版本内置，同时支持导入自定义 Java。', image: IMG_JAVA },
    ],
  },
  {
    type: 'scroll',
    start: 0.47,
    end: 0.62,
    title: '核心特性',
    items: [
      { title: '虚拟鼠标与自定义按键映射', desc: '在手机上也能拥有 PC 级的操作体验。', image: IMG_VIRTUALKEY },
      { title: '个性化主题定制', desc: '背景 / 颜色方案自由搭配，打造专属启动器。', image: IMG_THEME },
      { title: '支持渲染器插件化', desc: '通过插件扩展渲染器，解锁更多可能。', images: [IMG_PLUGIN1, IMG_PLUGIN2], interval: 1000, pause: 3000 },
    ],
  },
  {
    type: 'link',
    start: 0.62,
    end: 0.73,
    icon: <FontAwesomeIcon icon={faGithub} className={sharedStyles.linkIcon} />,
    iconAlt: <FontAwesomeIcon icon={faGithub} />,
    title: 'GitHub',
    desc: '在 GitHub 上查看 FCL 启动器源代码、提交 Issue、参与项目贡献。',
    link: GITHUB_URL,
    linkText: '访问 GitHub 仓库',
    image: IMG_FCLGITHUB,
    external: true,
  },
  {
    type: 'link',
    start: 0.73,
    end: 0.83,
    icon: <QQIcon className={sharedStyles.qqIcon} />,
    iconAlt: <QQIcon className={sharedStyles.qqIcon} />,
    title: 'QQ 群',
    desc: '加入 QQ 群，与其他玩家交流使用心得。',
    link: QQ_GROUP_URL,
    linkText: '加入 QQ 群',
    image: IMG_QQ,
    external: true,
  },
  {
    type: 'easter',
    start: 0.83,
    end: 0.92,
  },
  {
    type: 'start',
    start: 0.92,
    end: 1.00,
  },
];

/* =========================================================================
 *  主页面：滚动驱动版
 *  修复 P0-2：渲染所有 opacity > 0 的场景，实现交叉淡入淡出
 *  修复 P1-2：使用 ref 精确定位滚动容器
 * ========================================================================= */
function ScrollDrivenHome() {
  const scrollSpacerRef = useRef(null);
  const progress = useScrollProgress(scrollSpacerRef);

  // 计算所有可见场景（opacity > 0），实现边界交叉淡入淡出
  const visibleScenes = useMemo(() => {
    const result = [];
    for (let i = 0; i < SCENES.length; i++) {
      const isLastScene = i === SCENES.length - 1;
      const lifecycle = getSceneLifecycle(progress, SCENES[i].start, SCENES[i].end, isLastScene);
      const opacity = lifecycle.enterProgress * (1 - lifecycle.exitProgress);
      if (opacity > 0.001) {
        result.push({ scene: SCENES[i], index: i, isLastScene, opacity });
      }
    }
    return result;
  }, [progress]);

  const renderScene = (scene, index, isLastScene) => {
    const commonProps = {
      progress,
      start: scene.start,
      end: scene.end,
      isLastScene,
    };

    if (scene.type === 'scroll') {
      return <ScrollScene key={index} {...commonProps} title={scene.title} items={scene.items} isFirstScene={index === 0} />;
    }
    if (scene.type === 'link') {
      return (
        <LinkScene
          key={index}
          {...commonProps}
          icon={scene.icon}
          iconAlt={scene.iconAlt}
          title={scene.title}
          desc={scene.desc}
          link={scene.link}
          linkText={scene.linkText}
          image={scene.image}
          external={scene.external}
        />
      );
    }
    if (scene.type === 'easter') {
      return <EasterEggScene key={index} {...commonProps} />;
    }
    if (scene.type === 'start') {
      return <StartScene key={index} {...commonProps} />;
    }
    return null;
  };

  return (
    <div className={styles.scrollDrivenContainer}>
      <div ref={scrollSpacerRef} style={{ height: '600vh' }}>
        <div className={styles.stickyViewport}>
          {visibleScenes.map(({ scene, index, isLastScene }) =>
            renderScene(scene, index, isLastScene)
          )}
        </div>
      </div>
    </div>
  );
}

export default ScrollDrivenHome;
