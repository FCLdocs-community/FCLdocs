---
sidebar_position: 4
title: 其它渠道（以ADB安装为例）
description: 用大白话讲清楚什么是 ADB、怎么用 ADB 装 APK
---
:::note Tip
- 本文档出现了大量专业术语，对后面教程文档的理解影响不大。
- 如果你看不懂这篇文档，可以直接跳到[下一篇](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/mt%E7%AE%A1%E7%90%86%E5%99%A8%E7%9A%84%E4%BD%BF%E7%94%A8/%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86%E5%B1%80%E9%99%90%E6%80%A7)。
:::

# 其它渠道（如 ADB 安装）

## 除了 QQ、商店、浏览器，还有什么渠道装 APK？

除了前面讲的三种，还有几种渠道：

1. **ADB 安装**：用电脑通过命令行装，本节重点讲。
2. **第三方安装器**：SAI（装拆分 APK）、APKPure 安装器等。
3. **Root 后用 Root Explorer 直接装**。
4. **Recovery 刷入**：把 APK 刷成系统应用（高级）。
5. **共享存储**：从电脑复制 APK 到手机，再点安装。

本节重点讲 **ADB 安装**，因为这是最常用的高级安装方式。

## 什么是 ADB？

**ADB** 全称 **Android Debug Bridge**，中文叫「**安卓调试桥**」。它是 Google 官方提供的一个**命令行工具**，让你**用电脑通过 USB 或 Wi-Fi 控制手机**。

打个比方：ADB 就像一根「**数据线 + 翻译**」——数据线连电脑和手机，翻译把电脑的命令翻译成手机能听懂的语言，让手机执行。它能干的事包括：

- 装 / 卸 App
- 推 / 拉文件（push / pull）
- 进 shell（命令行）
- 截屏、录屏
- 重启、进 Recovery
- 看日志、看权限

:::note 名词解释
**调试**：程序员找 bug、查问题的过程。ADB 叫「调试桥」，是因为它本来是给开发者调试 App 用的，但普通用户也能用来装 APK、备份文件等。
:::

## 怎么用 ADB 装 APK？

### 第 1 步：手机开「USB 调试」

1. 打开「**设置 → 关于手机**」。
2. 连续点「**版本号**」7 次，提示「**您已处于开发者模式**」。
3. 返回，找到「**设置 → 系统 → 开发者选项**」（不同厂商位置不同）。
4. 打开「**USB 调试**」开关。
5. 用 USB 线连电脑，手机会弹「**是否允许 USB 调试？**」，点「**允许**」。

### 第 2 步：电脑装 ADB 工具

Windows / Mac / Linux 都能装：

- **Windows**：从 [Android 开发者官网](https://developer.android.com/tools/releases/platform-tools) 下 `platform-tools`，解压。
- **Mac**：`brew install android-platform-tools`
- **Linux**：`sudo apt install adb` 或 `sudo dnf install adb`

### 第 3 步：验证连接

打开电脑命令行（Windows 用 cmd，Mac/Linux 用 Terminal），进到 platform-tools 目录，输入：

```bash
adb devices
```

如果看到：

```
List of devices attached
XXXXXXXX	device
```

说明连接成功。如果显示 `unauthorized`，检查手机上是否点了「允许 USB 调试」。

### 第 4 步：装 APK

把 APK 文件放在电脑上（比如 `D:\game.apk`），输入：

```bash
adb install D:\game.apk
```

看到 `Success` 就装好了。

## ADB 常用命令

| 命令 | 作用 |
|------|------|
| `adb devices` | 列出已连接设备 |
| `adb install <apk路径>` | 装 APK |
| `adb install -r <apk路径>` | 覆盖安装（保留数据） |
| `adb install -s <apk路径>` | 装到 SD 卡 |
| `adb uninstall <包名>` | 卸载 App（按包名） |
| `adb push <电脑文件> <手机路径>` | 推文件到手机 |
| `adb pull <手机文件> <电脑路径>` | 拉文件到电脑 |
| `adb shell` | 进手机 shell |
| `adb reboot` | 重启手机 |
| `adb reboot recovery` | 重启进 Recovery |
| `adb reboot bootloader` | 重启进 Bootloader |

## ADB 的好处

1. **不用开「安装未知应用」权限**：ADB 装的 APK 不走系统安装器，**绕过商店和权限限制**。
2. **能装系统应用**：能卸载预装 App（需要 root 或特定权限）。
3. **能批量操作**：写脚本一次装几十个 App。
4. **能远程操作**：通过 Wi-Fi ADB，不用插线。
5. **能调试**：开发者查日志、改设置、跑测试。

## ADB 的局限

1. **要电脑**：必须有电脑和 USB 线（除非用 Wi-Fi ADB）。
2. **要开 USB 调试**：开发者选项里开，普通用户找不到。
3. **要懂命令行**：不会打命令就用不了。
4. **有风险**：命令打错可能误删文件、误卸 App。

## 小结

- **ADB = Android Debug Bridge，安卓调试桥**，用电脑控制手机。
- 装 APK 流程：手机开 USB 调试 → 电脑装 ADB → `adb install <apk>`。
- 常用命令：`adb devices`、`adb install`、`adb push/pull`、`adb shell`。
- 好处：绕过权限、能装系统应用、能批量、能远程。
- 局限：要电脑、要开调试、要懂命令行。