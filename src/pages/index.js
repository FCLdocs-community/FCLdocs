import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const features = [
  { title: '首页', desc: '本文档的开始', link: '/docs/intro', icon: '📦' },
  { title: '手机小白必看', desc: '学习一部分计算机知识', link: '/docs/手机小白必看/intro', icon: '📱' },
  { title: 'FCL 下载与安装', desc: '解决下载上的难题', link: '/docs/FCL 的下载与安装/intro', icon: '⬇️' },
  { title: 'FCL 基础教程', desc: '教会新手使用FCL启动器', link: '/docs/FCL 基础教程/首次使用', icon: '🚀' },
];

export default function Home() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Layout title="FCL 新手教程" description="Fold Craft Launcher 新手小白易看懂的教程">
      {/* Hero 区域 */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>🎮 FCL 启动器新手教程</h1>
          <p>从零开始，在 Android 手机上畅玩 Minecraft Java 版</p>
          <Link className={styles.startBtn} to="/docs/intro">
            📖 开始看教程
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        {/* FCL 介绍（可折叠） */}
        <section className={styles.introSection}>
          <button
            className={styles.introToggle}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span>📋 什么是 FCL 启动器？</span>
            <span className={styles.arrow}>{expanded ? '▲' : '▼'}</span>
          </button>

          <div className={`${styles.introContent} ${expanded ? styles.expanded : ''}`}>
            <div className={styles.introInner}>
              <p>
                <strong>Fold Craft Launcher（FCL）</strong> 是由 FCL-Team 开发的 Android 平台
                Minecraft: Java Edition 启动器。基于 HMCL 的核心功能，使用 PojavLauncher 后端，
                让你能在移动设备上畅玩 Java 版 MC。
              </p>

              <h4>🚀 核心特性</h4>
              <ul>
                <li>✅ 原生支持 Minecraft 全版本（包括最新快照）</li>
                <li>✅ 模组加载器支持：Forge / NeoForge / Fabric / Quilt / LiteLoader / OptiFine</li>
                <li>✅ 内置多版本 Java 运行时（Java 8/17/21/25），支持导入自定义 Java</li>
                <li>✅ 虚拟鼠标与自定义按键映射</li>
                <li>✅ 光影支持（需 VirGL / Zink / MG 渲染器）</li>
                <li>✅ 动态资源管理（模组 / 整合包 / 材质 / 光影 / 存档）</li>
                <li>✅ 个性化主题定制（背景 / 颜色方案）</li>
                <li>✅ 渲染器插件化支持</li>
              </ul>

              <div className={styles.introLinks}>
                <a href="https://github.com/FCL-Team/FoldCraftLauncher" target="_blank" rel="noopener noreferrer">
                  🐙 GitHub 仓库
                </a>
                <a href="https://fcl-team.github.io/" target="_blank" rel="noopener noreferrer">
                  🌐 官方网站
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 快速导航 */}
        <section className={styles.featuresSection}>
          <h2>📦 快速导航</h2>
          <div className={styles.grid}>
            {features.map(f => (
              <Link key={f.title} to={f.link} className={styles.card}>
                <div className={styles.cardIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 底部信息 */}
        <section className={styles.footerInfo}>
          <div className={styles.versionBadge}>
            ⚡ 最新版本：FCL 1.2.1.8
          </div>
          <div className={styles.footerLinks}>
            <a href="https://foldcraftlauncher.cn/" target="_blank" rel="noopener noreferrer">
              📥 下载
            </a>
            <span className={styles.divider}>|</span>
            <a href="https://qun.qq.com/universal-share/share?ac=1&authKey=Nf%2BO4R9xCZGYRasFG4kpxeX2w3MsH0KN125sccK5Wrs6PPOEn29E9lnJI0%2FLqsXf&busi_data=eyJncm91cENvZGUiOiI3NDM0NjAwNzEiLCJ0b2tlbiI6ImZSQkxZYkg3MFhQbWN6ZDhoTTlzbWtRa3I0NUJnSW9rS1RMeFhoZ28wK3Y2NXZsdG1SRjRuT0ZwcnpmSnVnRmsiLCJ1aW4iOiIzNDQyMzU5NDA3In0%3D&data=-9vTq8DUGSTiaSIlbhF8Fon9KEV9k_kZ2WDPPxT1FZXrIK2O7AbaosXMoAkVPiJdPxxrBkTAYpjmshHY_8a69g&svctype=4&tempid=h5_group_info" target="_blank" rel="noopener noreferrer">
              💬 交流
            </a>
            <span className={styles.divider}>|</span>
            <a href="https://github.com/FCL-Team/FoldCraftLauncher/issues" target="_blank" rel="noopener noreferrer">
              🐛 反馈
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
