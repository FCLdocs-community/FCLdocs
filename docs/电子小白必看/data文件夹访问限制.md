---
sidebar_position: 4
title: data 文件夹访问限制
description: 用大白话讲清楚 Android 11 之后为什么 Android/data 文件夹打不开了，以及怎么访问。
---

:::tip 专有名词
本文涉及到的专有名词：[包名](window:/term/安卓软件包名) 、 [Android](window:/term/Android)
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

- 以前任何 App 申请了「存储权限」就能读所有 App 存放在外部存储的数据，**这样的权限管理过于宽松**。
- Google 觉得这太危险，所以从 Android 11 起，**每个 App 默认只能访问自己的 `Android/data/<自己的包名>/` 文件夹**，不能访问别人的，并且细化收紧了对于其他文件访问权限的申请。

具体表现：

- 用第三方文件管理器（比如 ES 文件浏览器、[MT 管理器](https://mt2.cn/)）打开 `Android/data`，会显示「**无法访问**」「**需要授权**」「**空文件夹**」。(MT 管理器会尝试绕过此限制，仅对部分系统有效，所以有人可能完全没遇到本文所述问题）
- 系统自带的「文件管理」可以访问，但只能用系统提供的界面，不能像以前那样自由操作。

## 怎么访问 `Android/data`？

虽然限制变严了，但还是有办法访问。下面列几种常用方法，从简单到复杂：

### 方法 1：用系统自带文件管理器（最简单）

每个手机厂商自带的文件管理器都支持访问 `Android/data`，但操作受限：

1. 打开「文件管理」App。
2. 找到「**Android**」→「**data**」。
3. 就能看到各 App 的数据文件夹了。

### 方法 2：让文件管理器APP提权后访问（最优雅）

使用Shizuku授予文件管理器APP（需适配Shizuku，如 MT 管理器）adb权限，就可以访问 Android/data 了，或者已 Root 用户也可直接授予 Root 权限。

### 方法 3：用电脑通过 USB 访问

把手机连到电脑，用电脑的文件管理器访问 `Android/data`，**没有这个限制**（因为电脑走的是 [MTP 协议](window:/term/MTP协议)，不走 Android 的权限系统）。

1. 手机连电脑，选「**文件传输（MTP）**」模式。
2. 电脑打开「此电脑」→「手机内部存储」→「Android」→「data」。
3. 自由复制、修改、删除。

这是操作最方便的方法。

### 方法 4：用 ADB 命令（高级）

通过 ADB（Android Debug Bridge，安卓调试桥）命令行访问，**没有限制**，但需要电脑和命令行操作：

```bash
adb shell
cd /sdcard/Android/data
ls
```

ADB 后面会专门讲。

### 方法 5：双向配合访问

以上所述方法都是文件管理器单方面尝试访问文件，但是安卓系统还允许 APP 主动对外提供文件，也就是 SAF 框架。部分 APP （如 FCL ZL2 Termux ）就提供了这个接口，支持 SAF 的文件管理器可以直接向用户请求访问以上 APP 提供的文件。而且这种方式是 APP 主动提供文件，甚至可以用来访问（一般情况下）绝对私有外部无法访问的文件。

:::note 名词解释
**SAF**：Storage Access Framework，存储访问框架。
:::

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
- 访问方法：系统自带文件管理器、电脑 USB、ADB、Root。

## 拓展：/storage /sdcard是什么东西

/storage/emulated/0 和 /sdcard 都是（二者等价）安卓内部存储的路径，也就是一般访问“手机存储”实际访问的路径，上面说的“Android/data”实际上是“/storage/emulated/0/Android/data”或“/sdcard/Android/data”。