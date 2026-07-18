---
sidebar_position: 3
title: 通过 QQ 下载
description: 用大白话讲清楚 QQ 下载的 APK 在哪、为什么要重命名后缀、怎么改后缀名装上。
---

:::tip 专有名词
本文涉及到的专有名词：[后缀名](window:/term/后缀名) 、 [SAF](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/data%E6%96%87%E4%BB%B6%E5%A4%B9%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6#%E6%96%B9%E6%B3%95-1%E7%94%A8%E7%B3%BB%E7%BB%9F%E8%87%AA%E5%B8%A6%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86%E5%99%A8%E6%9C%80%E7%AE%80%E5%8D%95)
:::

# 通过 QQ 下载

## QQ 下载的文件在哪？

QQ 下载的文件默认存在手机内部存储的：

```
Android/data/com.tencent.mobileqq/Tencent/QQfile_recv/
```

这个路径在 `Android/data` 文件夹下，**[Android 11 之后普通文件管理器打不开](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/data%E6%96%87%E4%BB%B6%E5%A4%B9%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6)**。所以很多人下载完找不到文件。

:::note 路径拆解
- `Android/data/`：所有 App 数据的根目录
- `com.tencent.mobileqq/`：QQ 的包名
- `Tencent/QQfile_recv/`：QQ 自己定义的接收文件目录
:::

## 怎么找到 QQ 下载的文件？

有几种办法：

### 方法 1：QQ 自带的「我的文件」入口（最简单）

1. 打开 QQ。
2. 点头像 → 「**我的文件**」→「**最近文件**」或「**已下载**」。
3. 长按文件，选「**保存到手机**」或「**用其他应用打开**」。

QQ 会把文件复制到 `Download/QQ/` 或 `Documents/QQ/`，这些路径**不受 Android 11 限制**，普通文件管理器能直接打开。

### 方法 2：用支持 SAF 的文件管理器

用 MT 管理器、Cx 文件管理器等支持 SAF 的工具，按路径 `Android/data/com.tencent.mobileqq/Tencent/QQfile_recv/` 进去。第一次会弹 SAF 授权窗，授权后能访问。

### 方法 3：电脑 USB 访问（最方便）

手机连电脑，选「文件传输」模式，电脑上直接进 `此电脑\手机内部存储\Android\data\com.tencent.mobileqq\Tencent\QQfile_recv\`，自由复制。

## 为什么 QQ 下载的 APK 装不上？

很多人从 QQ 收到 `.apk` 文件，下载后**点安装没反应**，或者**显示「无法打开」**。原因有几个：

### 原因 1：后缀名被改了

QQ 为了安全，**会把 `.apk` 文件重命名**，加个后缀让它不能直接装。常见改名：

- `游戏.apk` → `游戏.apk.1`
- `游戏.apk` → `游戏.apk.rename`
- `游戏.apk` → `游戏.apk.bak`

**解决办法**：把后缀名改回 `.apk`。

### 原因 2：没有「安装未知来源」权限

Android 8.0 起，**每个 App 都要单独开「安装未知应用」权限**。QQ 下载的 APK，要给 QQ 开这个权限才能装。

**解决办法**：

1. 点安装时系统会弹窗「**为了您的安全，您的手机不允许安装来自此来源的应用**」。
2. 点「**设置**」→「**允许来自此来源的应用**」打开开关。
3. 回到 QQ 重新点安装。

### 原因 3：Android 11+ 的 `Android/data` 限制

QQ 下载的 APK 在 `Android/data` 里，**系统的安装器可能读不到**。

**解决办法**：先把 APK 复制到 `Download/` 或 `Documents/`，再点安装。

## 怎么改后缀名？

### 在手机上改

1. 用 MT 管理器或系统文件管理器找到文件。
2. 长按文件 → 「**重命名**」。
3. 把 `游戏.apk.1` 改成 `游戏.apk`（删掉 `.1`）。
4. 确认，点文件安装。

### 在电脑上改

1. 文件夹选项里**取消勾选「隐藏已知文件类型的扩展名」**（重要！否则改不了后缀）。
2. 找到文件，右键 → 重命名。
3. 把 `游戏.apk.1` 改成 `游戏.apk`。
4. 复制回手机，点安装。

:::warning 注意
Windows 默认隐藏后缀名，你看到的「游戏.apk」其实可能是「游戏.apk.1」。**先去文件夹选项里开显示后缀**，再改。
:::

## 完整流程：从 QQ 下载到装上

1. **接收文件**：在 QQ 里点接收，文件下载到 `Android/data/com.tencent.mobileqq/Tencent/QQfile_recv/`。
2. **找到文件**：用 QQ 自带的「我的文件」入口，或 MT 管理器，或电脑 USB。
3. **改后缀名**：如果文件是 `.apk.1` / `.apk.rename`，改成 `.apk`。
4. **复制到不受限目录**：把 APK 复制到 `Download/` 或 `Documents/`（避免 Android 11 限制）。
5. **开安装权限**：给 QQ 或文件管理器开「安装未知应用」权限。
6. **点安装**：点 APK 文件，按提示装。

## 小结

- QQ 下载的文件在 `Android/data/com.tencent.mobileqq/Tencent/QQfile_recv/`。
- Android 11+ 打不开这个路径，用 QQ 自带入口、SAF 文件管理器、或电脑 USB。
- QQ 会把 `.apk` 改成 `.apk.1` 等，**要改回 `.apk` 才能装**。
- 还要给 QQ 开「安装未知应用」权限。
- 推荐复制到 `Download/` 再装，避免路径限制。