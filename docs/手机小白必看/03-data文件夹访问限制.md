---
sidebar_position: 4
title: data 文件夹访问限制
description: 用大白话讲清楚 Android 11 之后为什么 Android/data 文件夹打不开了，以及怎么访问。
---

:::tip 专有名词
本文涉及到的专有名词：[包名](https://zhuanlan.zhihu.com/p/415494152) 、 [Android](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E6%89%8B%E6%9C%BA%E9%85%8D%E7%BD%AE%E8%AE%B2%E8%A7%A3/%E5%AE%89%E5%8D%93%E7%89%88%E6%9C%AC)
:::

# data 文件夹访问限制

## 什么是 `Android/data` 文件夹？

`Android/data` 是手机内部存储里的一个特殊文件夹，**每个 App 的应用数据都存在这里**。比如：

- `Android/data/com.tencent.mm/` 存微信的数据
- `Android/data/com.miHoYo.Yuanshen/` 存原神的数据
- `Android/data/com.netease.cloudmusic/` 存网易云音乐下载的歌

每个 App 的数据文件夹名就是它的**包名**（package name），格式是 `Android/data/<包名>/`。

## 为什么从 Android 11 开始打不开了？

**Android 11（2020 年）开始，Google 引入了「Scoped Storage（分区存储）」机制**，普通文件管理器**不能再直接访问 `Android/data` 文件夹**了。

原因是**隐私和安全**：

- 以前任何 App 申请了「存储权限」就能读所有 App 的数据，**等于能偷看其他 App 的聊天记录、游戏存档、登录凭证**。
- Google 觉得这太危险，所以从 Android 11 起，**每个 App 只能访问自己的 `Android/data/<自己的包名>/` 文件夹**，不能访问别人的。

具体表现：

- 用第三方文件管理器（比如 ES 文件浏览器、RE 管理器）打开 `Android/data`，会显示「**无法访问**」「**需要授权**」「**空文件夹**」。
- 系统自带的「文件管理」可以访问，但只能用系统提供的界面，不能像以前那样自由操作。

## 怎么访问 `Android/data`？

虽然限制变严了，但还是有办法访问。下面列几种常用方法，从简单到复杂：

### 方法 1：用系统自带文件管理器（最简单）

每个手机厂商自带的文件管理器都支持访问 `Android/data`，但操作受限：

1. 打开「文件管理」App。
2. 找到「**Android**」→「**data**」。
3. 第一次进入会弹窗提示「需要授权」，点「确定」。
4. 系统会跳到一个特殊的「**SAF 选择器**」界面，让你确认授权。
5. 授权后就能看到各 App 的数据文件夹了。

:::note 名词解释
**SAF**：Storage Access Framework，存储访问框架。Android 11 之后访问 `Android/data` 必须走这个框架，由系统弹窗让你手动授权，App 不能自动获取。
:::

### 方法 2：用支持 SAF 的第三方文件管理器

有些第三方文件管理器支持 SAF，比如：

- **MT 管理器**（后面会专门讲）
- **Cx 文件管理器**
- **Material Files**

用这些 App 打开 `Android/data` 时，会弹 SAF 授权窗，授权后就能访问。但**只能访问你授权过的那个文件夹**，不能像以前那样自由跳转。

### 方法 3：用电脑通过 USB 访问（推荐）

把手机连到电脑，用电脑的文件管理器访问 `Android/data`，**没有这个限制**（因为电脑走的是 [MTP 协议](https://www.runoob.com/np/mtp-protocol.html)，不走 Android 的权限系统）。

1. 手机连电脑，选「**文件传输（MTP）**」模式。
2. 电脑打开「此电脑」→「手机内部存储」→「Android」→「data」。
3. 自由复制、修改、删除。

这是最方便的方法，**强烈推荐**。

### 方法 4：用 ADB 命令（高级）

通过 ADB（Android Debug Bridge，安卓调试桥）命令行访问，**没有限制**，但需要电脑和命令行操作：

```bash
adb shell
cd /sdcard/Android/data
ls
```

ADB 后面会专门讲。

### 方法 5：Root 之后用 RE 管理器（终极）

Root（获取最高权限）之后，用 RE 管理器（Root Explorer）能完全自由访问所有文件夹，包括 `Android/data`、`/system`、`/data` 等。但 Root 会失去保修、影响银行 App，**不推荐普通用户折腾**。

## 为什么 QQ 下载的文件在 `Android/data` 里？

QQ 下载的文件默认存在 `Android/data/com.tencent.mobileqq/Tencent/QQfile_recv/`。Android 11 之后，**普通文件管理器打不开这个路径**，所以很多人找不到 QQ 下载的文件。

解决办法：

1. 用电脑 USB 访问（最简单）。
2. 用支持 SAF 的文件管理器（MT 管理器等）。
3. QQ 自带的「文件管理」入口（在 QQ 里点「我的文件」）。
4. 把 QQ 下载路径改到 `Download/` 或 `Documents/`（这些文件夹不受限制）。

## Android 13/14 之后更严了

从 Android 13 起，连「读取所有文件」权限都基本取消了，App 要读照片、视频、音频得分别申请。Android 14 进一步加了「部分照片访问」。

所以**新版本 Android 的 `Android/data` 访问越来越麻烦**，但安全性也越来越高。这是 Google 在「方便」和「安全」之间的权衡。

## 小结

- `Android/data/<包名>/` 存每个 App 的数据。
- **Android 11 起引入「分区存储」**，普通文件管理器打不开 `Android/data`。
- 原因：防止 App 偷看其他 App 数据。
- 访问方法：系统自带文件管理器、支持 SAF 的第三方管理器、电脑 USB、ADB、Root。
- **最推荐：电脑 USB 访问**，没有限制。