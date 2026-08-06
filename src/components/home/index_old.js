import React, { useState } from 'react';
import { FontAwesomeIcon, faRocket, faCheck, faBolt, faGithub, faBookOpen, QQIcon, IMG_APP, IMG_1, IMG_VERSION, IMG_MODLOADER, IMG_SHADER, IMG_DYNAMIC1, IMG_DYNAMIC2, IMG_DYNAMIC3, IMG_DYNAMIC4, IMG_JAVA, IMG_VIRTUALKEY, IMG_THEME, IMG_PLUGIN1, IMG_PLUGIN2, IMG_FCLGITHUB, IMG_QQ, GITHUB_URL, QQ_GROUP_URL, Link } from './shared';
import styles from './index_old.module.css';

function FallbackHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dynamicIndex, setDynamicIndex] = useState(0);
  const [pluginIndex, setPluginIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleDynamicClick = () => {
    setActiveIndex(4);
    setDynamicIndex((prev) => (prev + 1) % 4);
  };

  const handlePluginClick = () => {
    setActiveIndex(6);
    setPluginIndex((prev) => (prev + 1) % 2);
  };

  return (
    <div className={styles.staticContainer}>
      <section className={styles.staticSection}>
        <h2 className={styles.staticSectionTitle}>
          <FontAwesomeIcon icon={faRocket} className={styles.icon} />
          什么是 FCL？
        </h2>
        <div className={styles.staticGrid}>
          <div className={styles.staticCard} onClick={() => handleClick(0)}>
            <div className={styles.fallbackImageWrap}>
              <img src={IMG_APP} alt="FCL App" loading="lazy" className={activeIndex === 0 ? styles.fallbackImageActive : styles.fallbackImageInactive} />
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />Fold Craft Launcher（FCL）</h3>
            <p>是由 FCL-Team 开发的 Android 平台 Minecraft: Java Edition 启动器。</p>
          </div>
          <div className={styles.staticCard} onClick={() => handleClick(1)}>
            <div className={styles.fallbackImageWrap}>
              <img src={IMG_1} alt="FCL 架构" loading="lazy" className={activeIndex === 1 ? styles.fallbackImageActive : styles.fallbackImageInactive} />
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />基于 HMCL 核心 + PojavLauncher 后端</h3>
            <p>基于HMCL的核心功能，使用PojavLauncher后端，让您能在移动设备上畅玩Java版MC，支持模组加载与全版本运行。</p>
          </div>
        </div>
      </section>

      <section className={styles.staticSection}>
        <h2 className={styles.staticSectionTitle}>
          <FontAwesomeIcon icon={faRocket} className={styles.icon} />
          核心特性
        </h2>
        <div className={styles.staticGrid}>
          <div className={styles.staticCard} onClick={() => handleClick(2)}>
            <div className={styles.fallbackImageWrap}>
              <img src={IMG_VERSION} alt="版本下载" loading="lazy" className={activeIndex === 2 ? styles.fallbackImageActive : styles.fallbackImageInactive} />
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />原生支持 Minecraft 全版本</h3>
            <p>包括最新快照，让你始终走在版本最前沿。</p>
          </div>
          <div className={styles.staticCard} onClick={() => handleClick(3)}>
            <div className={styles.fallbackImageWrap}>
              <img src={IMG_MODLOADER} alt="模组加载器" loading="lazy" className={activeIndex === 3 ? styles.fallbackImageActive : styles.fallbackImageInactive} />
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />支持各种模组加载器</h3>
            <p>Forge / NeoForge / Fabric / Quilt / LiteLoader / OptiFine 一应俱全。</p>
          </div>
          <div className={styles.staticCard} onClick={() => handleClick(4)}>
            <div className={styles.fallbackImageWrap}>
              <img src={IMG_SHADER} alt="光影" loading="lazy" className={activeIndex === 4 ? styles.fallbackImageActive : styles.fallbackImageInactive} />
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />光影支持</h3>
            <p>需 Zink / MG 渲染器，让画面更加绚丽。</p>
          </div>
          <div className={styles.staticCard} onClick={handleDynamicClick}>
            <div className={styles.fallbackImageWrap}>
              <div className={styles.fallbackStacked}>
                {[IMG_DYNAMIC1, IMG_DYNAMIC2, IMG_DYNAMIC3, IMG_DYNAMIC4].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`动态资源管理 ${i + 1}`}
                    loading="lazy"
                    className={i === dynamicIndex ? styles.fallbackStackedActive : styles.fallbackStackedInactive}
                    style={{ zIndex: i === dynamicIndex ? 2 : 1 }}
                  />
                ))}
              </div>
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />动态资源管理</h3>
            <p>模组 / 整合包 / 材质 / 光影 / 存档，一站式管理。</p>
          </div>
          <div className={styles.staticCard} onClick={() => handleClick(6)}>
            <div className={styles.fallbackImageWrap}>
              <img src={IMG_JAVA} alt="Java 运行时" loading="lazy" className={activeIndex === 6 ? styles.fallbackImageActive : styles.fallbackImageInactive} />
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />内置多版本 Java 运行时</h3>
            <p>Java 8 / 17 / 21 / 25 全版本内置，同时支持导入自定义 Java。</p>
          </div>
          <div className={styles.staticCard} onClick={() => handleClick(7)}>
            <div className={styles.fallbackImageWrap}>
              <img src={IMG_VIRTUALKEY} alt="虚拟按键" loading="lazy" className={activeIndex === 7 ? styles.fallbackImageActive : styles.fallbackImageInactive} />
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />虚拟鼠标与自定义按键映射</h3>
            <p>在手机上也能拥有 PC 级的操作体验。</p>
          </div>
          <div className={styles.staticCard} onClick={() => handleClick(8)}>
            <div className={styles.fallbackImageWrap}>
              <img src={IMG_THEME} alt="主题定制" loading="lazy" className={activeIndex === 8 ? styles.fallbackImageActive : styles.fallbackImageInactive} />
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />个性化主题定制</h3>
            <p>背景 / 颜色方案自由搭配，打造专属启动器。</p>
          </div>
          <div className={styles.staticCard} onClick={handlePluginClick}>
            <div className={styles.fallbackImageWrap}>
              <div className={styles.fallbackStacked}>
                {[IMG_PLUGIN1, IMG_PLUGIN2].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`渲染器插件 ${i + 1}`}
                    loading="lazy"
                    className={i === pluginIndex ? styles.fallbackStackedActive : styles.fallbackStackedInactive}
                    style={{ zIndex: i === pluginIndex ? 2 : 1 }}
                  />
                ))}
              </div>
            </div>
            <h3><FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />支持渲染器插件化</h3>
            <p>通过插件扩展渲染器，解锁更多可能。</p>
          </div>
        </div>
      </section>

      <section className={styles.staticSection}>
        <h2 className={styles.staticSectionTitle}>
          <FontAwesomeIcon icon={faGithub} className={styles.icon} />
          项目链接
        </h2>
        <div className={styles.staticLinkRow}>
          <div className={styles.staticLinkCard}>
            <div className={styles.linkIconWrap}><FontAwesomeIcon icon={faGithub} className={styles.linkIcon} /></div>
            <h3>GitHub</h3>
            <p>在 GitHub 上查看源码、提交 Issue、参与项目贡献。</p>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <FontAwesomeIcon icon={faGithub} /><span>访问 GitHub 仓库</span>
            </a>
          </div>
          <div className={styles.staticLinkImage}><img src={IMG_FCLGITHUB} alt="FCL GitHub" loading="lazy" /></div>
        </div>
      </section>

      <section className={styles.staticSection}>
        <h2 className={styles.staticSectionTitle}>
          <QQIcon className={styles.icon} />
          加入我们
        </h2>
        <div className={styles.staticLinkRow}>
          <div className={styles.staticLinkCard}>
            <div className={styles.linkIconWrap}><QQIcon className={styles.qqIcon} /></div>
            <h3>QQ 群</h3>
            <p>加入 QQ 群，与开发者和其他玩家交流使用心得。</p>
            <a href={QQ_GROUP_URL} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <QQIcon /><span>加入 QQ 群</span>
            </a>
          </div>
          <div className={styles.staticLinkImage}><img src={IMG_QQ} alt="QQ 群" loading="lazy" /></div>
        </div>
      </section>

      <section className={`${styles.staticSection} ${styles.staticEasterEgg}`}>
        <div className={styles.easterEggBadge}><FontAwesomeIcon icon={faBolt} />彩蛋</div>
        <p className={styles.easterEggText}>
          你说得对，但是「FoldCraft Launcher」是由FCL-Team基于HMCL的核心功能，使用PojavLauncher后端开发的Minecraft
          Java版启动器。启动器运行在一个被称作「安卓」的系统，在这里，被系统选中的人将被授予「JVM」，导引Java之力。你将扮演一位名为「小白」的神秘用户，在自由的使用中安装不同版本、各有千秋独特的模组，和它们一起运行，找出崩溃闪退的原因，同时逐步发掘「xxException:」的真相。
        </p>
      </section>

      <section className={`${styles.staticSection} ${styles.staticStart}`}>
        <h2 className={styles.startSceneTitle}>准备好了吗？</h2>
        <p className={styles.startSceneDesc}>从零开始，在 Android 手机上畅玩 Minecraft Java 版</p>
        <Link className={styles.startBtn} to="/docs">
          <FontAwesomeIcon icon={faBookOpen} />开始看教程
        </Link>
      </section>
    </div>
  );
}

export default FallbackHome;
