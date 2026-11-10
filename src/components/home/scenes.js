import React from 'react';
import {
  FontAwesomeIcon, faGithub, QQIcon,
  IMG_APP, IMG_1, IMG_VERSION, IMG_MODLOADER, IMG_SHADER,
  IMG_DYNAMIC1, IMG_DYNAMIC2, IMG_DYNAMIC3, IMG_DYNAMIC4,
  IMG_JAVA, IMG_VIRTUALKEY, IMG_THEME,
  IMG_PLUGIN1, IMG_PLUGIN2,
  IMG_FCLGITHUB, IMG_QQ,
  GITHUB_URL, QQ_GROUP_URL,
} from './shared';
import sharedStyles from './shared.module.css';

/* =========================================================================
 *  首页内容数据（新版滚动场景与静态回退页共用，避免文案/图片重复维护）
 * ========================================================================= */

export const EASTER_EGG_TEXT = '你说得对，但是「FoldCraft Launcher」是由FCL-Team基于HMCL的核心功能，使用PojavLauncher后端开发的Minecraft Java版启动器。启动器运行在一个被称作「安卓」的系统，在这里，被系统选中的人将被授予「JVM」，导引Java之力。你将扮演一位名为「小白」的神秘用户，在自由的使用中安装不同版本、各有千秋独特的模组，和它们一起运行，找出崩溃闪退的原因，同时逐步发掘「xxException:」的真相。';

export const SCENES = [
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
    brand: 'github',
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
    brand: 'qq',
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
    title: '准备好了吗？',
    desc: '从零开始，在 Android 手机上畅玩 Minecraft Java 版',
    linkText: '开始看教程',
    to: '/docs',
  },
];
