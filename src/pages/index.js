import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import { FontAwesomeIcon, faBookOpen, IMG_FCL_ICON } from '../components/home/shared';
import sharedStyles from '../components/home/shared.module.css';
import ScrollDrivenHome from '../components/home/index_new';
import FallbackHome from '../components/home/index_old';
import StartGuideModal from '../components/home/StartGuideModal';

/* =========================================================================
 *  API 检测：检测浏览器是否支持滚动驱动动画所需的 API
 *  任何一项不通过 → 切换到静态回退页面
 * ========================================================================= */
function useScrollAnimationSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    let ok = true;
    try {
      if (typeof window === 'undefined') ok = false;
      else {
        // 1. requestAnimationFrame
        if (typeof requestAnimationFrame === 'undefined') ok = false;
        // 2. 滚动位置读取
        if (typeof window.pageYOffset === 'undefined' && typeof document.documentElement.scrollTop === 'undefined') ok = false;
        // 3. position: sticky 支持
        const testEl = document.createElement('div');
        testEl.style.cssText = 'position:sticky;position:-webkit-sticky;';
        if (!testEl.style.position.includes('sticky')) ok = false;
      }
    } catch (e) {
      ok = false;
    }
    setSupported(ok);
  }, []);

  return supported;
}

/* =========================================================================
 *  用户偏好检测：是否希望减少动态效果
 *  命中时改用静态回退页，避免强制滚动驱动动画
 * ========================================================================= */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return reduced;
}

/* =========================================================================
 *  主组件：入口
 *  根据 API 检测结果与用户偏好条件渲染 ScrollDrivenHome 或 FallbackHome
 * ========================================================================= */
export default function Home() {
  const scrollSupported = useScrollAnimationSupport();
  const prefersReducedMotion = usePrefersReducedMotion();
  const useAnimatedHome = scrollSupported && !prefersReducedMotion;
  const [guideOpen, setGuideOpen] = useState(false);
  const openGuide = useCallback(() => setGuideOpen(true), []);
  const closeGuide = useCallback(() => setGuideOpen(false), []);

  return (
    <Layout title="FCL 新手教程" description="Fold Craft Launcher 新手小白易看懂的教程">
      <div className={sharedStyles.homePage}>
        <div className={sharedStyles.homeOverlay}>
          <header className={sharedStyles.hero}>
            <div className="container">
              <img src={IMG_FCL_ICON} alt="FCL 图标" className={sharedStyles.heroLogo} />
              <h1>FCL 启动器新手教程</h1>
              <p>从零开始，在 Android 手机上畅玩 Minecraft Java 版</p>
              <button type="button" className={sharedStyles.startBtn} onClick={openGuide}>
                <FontAwesomeIcon icon={faBookOpen} />开始看教程
              </button>
            </div>
          </header>

          {useAnimatedHome ? <ScrollDrivenHome onStart={openGuide} /> : <FallbackHome onStart={openGuide} />}
        </div>
      </div>

      <StartGuideModal open={guideOpen} onClose={closeGuide} />
    </Layout>
  );
}
