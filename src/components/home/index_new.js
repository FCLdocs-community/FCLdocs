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
 *  场景过渡生命周期
 * ========================================================================= */
function getSceneLifecycle(globalProgress, sceneStart, sceneEnd, isLastScene) {
  const sceneProgress = Math.min(Math.max((globalProgress - sceneStart) / (sceneEnd - sceneStart), 0), 1);
  const dwellProgress = Math.min(Math.max((sceneProgress - 0.12) / 0.76, 0), 1);

  const enterStart = sceneStart;
  const enterEnd = sceneStart + (sceneEnd - sceneStart) * 0.15;
  const rawEnter = Math.min(Math.max((globalProgress - enterStart) / (enterEnd - enterStart), 0), 1);
  const enterProgress = sceneStart === 0 ? 1 : rawEnter;

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
    return { currentIndex: 0, nextIndex: 0 };
  }

  const itemSpan = 1 / itemCount;
  const rawIndex = dwellProgress / itemSpan;
  const currentIndex = Math.min(Math.floor(rawIndex), itemCount - 1);
  const nextIndex = Math.min(currentIndex + 1, itemCount - 1);

  return { currentIndex, nextIndex };
}

/* =========================================================================
 *  组件：滚动驱动场景
 *  修复 P1-4：StackedImageCycler 不再用 key 变化重建（key 固定为 images[0]）
 *  修复 P2-2：首场景首图使用 loading="eager"
 *  修复 P2-5：移除 willChange，仅活跃场景保留
 *  修复 P2-7：静态样式迁移到 CSS 类，仅动态值保留 inline style
 * ========================================================================= */
function ScrollScene({ title, items, progress, start, end, isLastScene, isFirstScene, overrideOpacity, scrollDir, sceneStatusRef }) {
  const { enterProgress, dwellProgress, exitProgress } = getSceneLifecycle(progress, start, end, isLastScene);
  const isActive = overrideOpacity !== undefined || (enterProgress > 0 && exitProgress < 1);

  const sceneOpacity = overrideOpacity !== undefined ? overrideOpacity : enterProgress * (1 - exitProgress);
  const sceneTranslateY = overrideOpacity !== undefined ? 0 : (1 - enterProgress) * 60 - exitProgress * 60;

  const { currentIndex, nextIndex } = getItemTransition(dwellProgress, items.length);
  const itemSpan = 1 / items.length;

  // 单步切换（入场锚点 + 位置追赶）：
  // - 向下进入场景：从第 0 项开始，锚点从 0 起（入场进度计入第一次前进，与首载一致）
  // - 向上进入场景：从当前位置开始，锚点 = 挂载位置
  // - 前进必须超过「上次前进位置 + 1 个 item 跨度」，滑动一下 = 进入下一项
  // - 退出区：打断动画，定时逐项追赶（不跳项）；父组件等待追赶完成再切换场景
  const initialItem = scrollDir > 0 ? 0 : currentIndex;
  const [displayItem, setDisplayItem] = useState(() => initialItem);
  const displayItemRef = useRef(initialItem);
  const lastAdvanceDwellRef = useRef(scrollDir > 0 ? 0 : dwellProgress);
  const firstRunRef = useRef(true);
  const [anim, setAnim] = useState({ phase: 0, to: 0 });
  const lockRef = useRef(false);
  const animTimersRef = useRef([]);
  const catchUpTimerRef = useRef(null);
  const itemStateRef = useRef({ currentIndex, nextIndex, dwellProgress });

  useEffect(() => {
    itemStateRef.current = { currentIndex, nextIndex, dwellProgress };
  }, [currentIndex, nextIndex, dwellProgress]);

  // 向父组件报告追赶状态（场景切换时等待追赶完成，避免尾项被跳过）
  const updateStatus = () => {
    if (!sceneStatusRef) return;
    const c = itemStateRef.current.currentIndex;
    const remaining = Math.max(0, c - displayItemRef.current);
    sceneStatusRef.current = { done: remaining === 0, pendingMs: remaining * 120 };
  };

  useEffect(() => {
    const clearAnimTimers = () => {
      animTimersRef.current.forEach(clearTimeout);
      animTimersRef.current = [];
    };

    const stopCatchUp = () => {
      clearTimeout(catchUpTimerRef.current);
      catchUpTimerRef.current = null;
    };

    const runCatchUp = () => {
      const { currentIndex: c, dwellProgress: d } = itemStateRef.current;
      if (d < 0.89 || c <= displayItemRef.current) {
        stopCatchUp();
        updateStatus();
        return;
      }
      // 退出区快速追赶：每次只前进一项，直接提交（无动画、不跳项）
      const to = displayItemRef.current + 1;
      displayItemRef.current = to;
      setDisplayItem(to);
      setAnim({ phase: 0, to: 0 });
      updateStatus();
      if (c > to) {
        catchUpTimerRef.current = setTimeout(runCatchUp, 180);
      } else {
        catchUpTimerRef.current = null;
      }
    };

    // 中间区域追赶：位置严重超前时（差 ≥ 2），逐项追赶，不跳项
    const runMiddleCatchUp = () => {
      const { currentIndex: c } = itemStateRef.current;
      if (c <= displayItemRef.current) {
        catchUpTimerRef.current = null;
        updateStatus();
        return;
      }
      const to = displayItemRef.current + 1;
      displayItemRef.current = to;
      setDisplayItem(to);
      setAnim({ phase: 0, to: 0 });
      updateStatus();
      if (c > to) {
        catchUpTimerRef.current = setTimeout(runMiddleCatchUp, 200);
      } else {
        catchUpTimerRef.current = null;
      }
    };

    const advance = (to) => {
      lockRef.current = true;
      setAnim({ phase: 0, to });
      clearAnimTimers();
      const t70 = setTimeout(() => {
        displayItemRef.current = to;
        setDisplayItem(to);
        setAnim({ phase: 2, to });
        updateStatus();
      }, 70);
      const t80 = setTimeout(() => { lockRef.current = false; }, 80);
      animTimersRef.current = [t70, t80];
    };

    const { currentIndex: cur, nextIndex: next, dwellProgress: dwell } = itemStateRef.current;

    // 挂载后首次运行：只建立基线，不做前进/追赶（入场手势的尾巴不触发切换）
    if (firstRunRef.current) {
      firstRunRef.current = false;
      updateStatus();
      return;
    }

    // 反向 / 位置退回：打断一切动画与追赶，直接跟随滚动位置
    if (cur < displayItemRef.current) {
      stopCatchUp();
      clearAnimTimers();
      displayItemRef.current = cur;
      setDisplayItem(cur);
      setAnim({ phase: 0, to: 0 });
      lockRef.current = false;
      lastAdvanceDwellRef.current = dwell;
      updateStatus();
      return;
    }

    // 场景退出区：打断进行中的动画，定时逐项追赶
    if (dwell >= 0.89) {
      clearAnimTimers();
      setAnim({ phase: 0, to: 0 });
      lockRef.current = false;
      if (cur > displayItemRef.current && !catchUpTimerRef.current) {
        runCatchUp();
      } else if (cur <= displayItemRef.current) {
        stopCatchUp();
      }
      updateStatus();
      return;
    }

    stopCatchUp();

    // 位置超前 2 项以上：启动中间区域追赶（不等 dwell gate，逐项追赶）
    if (cur - displayItemRef.current >= 2 && !lockRef.current && !catchUpTimerRef.current) {
      runMiddleCatchUp();
      return;
    }

    // 位置超前且距上次前进足够远：前进一步（滑动一下 = 进入下一项）
    if (cur > displayItemRef.current && !lockRef.current
        && dwell - lastAdvanceDwellRef.current >= itemSpan * 0.85) {
      lastAdvanceDwellRef.current = dwell;
      advance(Math.min(next, displayItemRef.current + 1));
    }
    updateStatus();
  }, [currentIndex, nextIndex, dwellProgress, itemSpan]);

  useEffect(() => {
    return () => {
      animTimersRef.current.forEach(clearTimeout);
      clearTimeout(catchUpTimerRef.current);
    };
  }, []);

  const displayItemObj = items[displayItem];
  const animToObj = items[anim.to];

  const currentOpacity = anim.phase === 0 ? 1 : 0;
  const nextOpacity = anim.phase === 2 ? 1 : 0;

  // 文字高亮与图片动画同步：动画完成切到下一项时，文字也切到下一项
  const displayIndex = anim.phase === 2 ? anim.to : displayItem;

  if (overrideOpacity === undefined && !isActive && sceneOpacity <= 0) return null;

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
                transform: 'scale(1)',
                zIndex: 2,
              }}
            >
              {displayItemObj.images ? (
                <StackedImageCycler
                  images={displayItemObj.images}
                  interval={displayItemObj.interval}
                  pauseDuration={displayItemObj.pause}
                  alt={displayItemObj.title}
                  eagerFirst={eagerFirst}
                />
              ) : (
                <img
                  src={displayItemObj.image}
                  alt={displayItemObj.title}
                  className={styles.sceneImage}
                  loading={eagerFirst ? 'eager' : 'lazy'}
                />
              )}
            </div>

            {anim.phase === 2 && (
              <div
                className={styles.sceneImageLayer}
                style={{
                  opacity: nextOpacity,
                  transform: 'scale(1)',
                  zIndex: 1,
                }}
              >
                {animToObj.images ? (
                  <StackedImageCycler
                    images={animToObj.images}
                    interval={animToObj.interval}
                    pauseDuration={animToObj.pause}
                    alt={animToObj.title}
                  />
                ) : (
                  <img
                    src={animToObj.image}
                    alt={animToObj.title}
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
            const isCurrent = i === displayIndex;
            const isPast = i < displayIndex;

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
                    {!isFirstScene && <FontAwesomeIcon icon={faCheck} className={sharedStyles.checkIcon} />}
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
function LinkScene({ icon, iconAlt, title, desc, link, linkText, image, external, progress, start, end, isLastScene, overrideOpacity }) {
  const { enterProgress, exitProgress } = getSceneLifecycle(progress, start, end, isLastScene);
  const isActive = overrideOpacity !== undefined || (enterProgress > 0 && exitProgress < 1);
  const sceneOpacity = overrideOpacity !== undefined ? overrideOpacity : enterProgress * (1 - exitProgress);
  const sceneTranslateY = overrideOpacity !== undefined ? 0 : (1 - enterProgress) * 80 - exitProgress * 80;

  if (overrideOpacity === undefined && !isActive && sceneOpacity <= 0) return null;

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
function EasterEggScene({ progress, start, end, isLastScene, overrideOpacity }) {
  const { enterProgress, exitProgress } = getSceneLifecycle(progress, start, end, isLastScene);
  const isActive = overrideOpacity !== undefined || (enterProgress > 0 && exitProgress < 1);
  const sceneOpacity = overrideOpacity !== undefined ? overrideOpacity : enterProgress * (1 - exitProgress);
  const sceneScale = overrideOpacity !== undefined ? 1 : 0.92 + enterProgress * 0.08 - exitProgress * 0.08;

  if (overrideOpacity === undefined && !isActive && sceneOpacity <= 0) return null;

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
function StartScene({ progress, start, end, isLastScene, overrideOpacity }) {
  const { enterProgress } = getSceneLifecycle(progress, start, end, isLastScene);
  const isActive = overrideOpacity !== undefined || enterProgress > 0;
  const sceneOpacity = overrideOpacity !== undefined ? overrideOpacity : enterProgress;
  const sceneTranslateY = overrideOpacity !== undefined ? 0 : (1 - enterProgress) * 50;

  if (overrideOpacity === undefined && !isActive && sceneOpacity <= 0) return null;

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
 *  场景切换：滚动越过场景边界时触发 300ms 时间动画（150ms 淡出 → 150ms 淡入），
 *  一次滚动即完成切换，不随滚动距离拉长
 * ========================================================================= */
function ScrollDrivenHome() {
  const scrollSpacerRef = useRef(null);
  const progress = useScrollProgress(scrollSpacerRef);

  // 当前进度所属场景（唯一激活场景）
  const activeIndex = useMemo(() => {
    for (let i = 0; i < SCENES.length; i++) {
      if (progress >= SCENES[i].start && progress < SCENES[i].end) return i;
    }
    return SCENES.length - 1;
  }, [progress]);

  const [displayIndex, setDisplayIndex] = useState(0);
  const displayIndexRef = useRef(0);
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const mountDirRef = useRef(1);
  const sceneStatusRef = useRef({ done: true, pendingMs: 0 });

  // 场景边界触发切换：淡出 150ms → 等待当前场景 item 追赶完成 → 换场景 → 淡入 150ms
  // mountDir 记录本次切换方向（决定场景内 item 初始显示）
  useEffect(() => {
    if (activeIndex === displayIndexRef.current) {
      setSceneOpacity(1);
      return undefined;
    }
    mountDirRef.current = activeIndex > displayIndexRef.current ? 1 : -1;
    sceneStatusRef.current = { done: true, pendingMs: 0 };
    setSceneOpacity(0);

    let cancelled = false;
    let timer = null;
    let waited = 0;
    const doSwitch = () => {
      if (cancelled) return;
      displayIndexRef.current = activeIndex;
      setDisplayIndex(activeIndex);
      requestAnimationFrame(() => requestAnimationFrame(() => setSceneOpacity(1)));
    };
    const wait = (ms) => {
      timer = setTimeout(() => {
        if (cancelled) return;
        waited += ms;
        const st = sceneStatusRef.current;
        // 场景内 item 仍在追赶：继续等待（最多约 800ms）
        if (waited < 800 && st && !st.done) {
          wait(Math.max(80, Math.min(st.pendingMs || 120, 200)));
          return;
        }
        doSwitch();
      }, ms);
    };
    wait(150);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [activeIndex]);

  const renderScene = (scene, index, isLastScene, overrideOpacity) => {
    const commonProps = {
      progress,
      start: scene.start,
      end: scene.end,
      isLastScene,
      overrideOpacity,
      scrollDir: mountDirRef.current,
      sceneStatusRef,
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
      <div ref={scrollSpacerRef} style={{ height: '350vh' }}>
        <div className={styles.stickyViewport}>
          {renderScene(
            SCENES[displayIndex],
            displayIndex,
            displayIndex === SCENES.length - 1,
            sceneOpacity
          )}
        </div>
      </div>
    </div>
  );
}

export default ScrollDrivenHome;
