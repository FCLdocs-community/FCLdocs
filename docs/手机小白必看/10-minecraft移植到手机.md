---
sidebar_position: 11
title: Minecraft Java版 如何被移植在手机上的？
description: 用大白话讲清楚 PojavLauncher 等启动器是怎么把电脑版 Minecraft Java 版搬到手机上的，重点讲 so 文件的作用。
---

:::tip 专有名词
本文涉及到的专有名词：[图形 API](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E4%BB%80%E4%B9%88%E6%98%AF%E5%9B%BE%E5%BD%A2api) 、 [ARM和x86架构](https://blog.csdn.net/qq_39543984/article/details/155394684) 、 [Linux](https://baike.baidu.com/item/Linux/27050) 、 [图形转化层](https://zhuanlan.zhihu.com/p/584578172) 、 [mod]() 、 [光影]() 、 [区块]()
:::

# Minecraft Java版 如何被移植在手机上的？

## 问题：Minecraft Java 版能在手机上跑吗？

**直接跑：不能**。原因：

1. **Minecraft Java 版需要 Java 虚拟机（JVM）**，手机系统没有自带这个环境。
2. **Minecraft Java 版用电脑图形接口**（OpenGL），手机用的是 OpenGL ES / Vulkan，两者不一样。
3. **Minecraft Java 版的运行库是给电脑芯片（x86）编译的**，手机是 ARM 芯片，CPU 根本看不懂。

**间接跑：能！** 用 **PojavLauncher（已停更） / Amethyst / Fold Craft Launcher / Zalith Launcher** 等启动器，可以把电脑 Java 版「移植」到手机。下面讲清楚原理。

## 关键概念：什么是 `.so` 文件？

**`.so` 文件**全称 **Shared Object**，中文「**共享库**」或「**动态链接库**」。它是 **Linux/Android** 系统上的可执行代码库，相当于 **Windows 上的 `.dll`** 文件。

打个比方：你写了个程序，要用到「**计算器**」功能。一种办法是把计算器代码复制到你程序里（文件会变大）。另一种办法是**单独写一个计算器库（`.so` 文件），你的程序运行时去调用它**（文件小，多个程序能共用一个库）。

`.so` 文件的特点：

- 是**编译后的机器码**，CPU 能直接执行。
- **芯片相关**：给 x86 芯片编译的 `.so` 不能在 ARM 芯片上跑，反之亦然。
- 多个程序能**共享**同一个 `.so`，省存储空间。
- Linux/Android 系统的核心库都是 `.so`，比如 `libc.so`（C 标准库）、`libGL.so`（OpenGL 库）。

:::note 名词解释
**动态链接库**：程序运行时才加载的代码库，不是编译时打包进去的。好处是省空间、能共享、能单独更新。
:::

## 关键概念：Android 和 Linux 是什么关系？

**Android 的底层是 Linux 内核**。虽然 Android 用户看不到 Linux 命令行，但底层确实是 Linux。不过要注意：

- Android 的**表面规矩**（用户空间）用的是 **Bionic libc**，和标准 Linux 的 **glibc** 不一样。
- 所以**电脑 Linux 上的 `.so` 不能直接复制到 Android 上用**，必须针对 Android 重新编译。
- Android 的 `/system/lib/`、`/system/lib64/` 里全是 `.so` 文件。
- Android 的 App（APK）里也能带 `.so` 文件，放在 `lib/` 目录下。

## Minecraft Java 版在电脑上怎么跑？

电脑上跑 Minecraft Java 版的流程：

```
1. 启动器（Launcher）启动
       ↓
2. 启动 JVM（Java 虚拟机）
       ↓
3. JVM 加载 Minecraft 的 .jar 文件（字节码）
       ↓
4. JVM 把字节码翻译成 x86 机器码，在 CPU 上跑
       ↓
5. Minecraft 调用电脑的 OpenGL 库（libGL.so / opengl32.dll）画图
       ↓
6. 画面显示在屏幕上
```

关键点：

- **JVM 是关键**：没有 JVM，字节码跑不起来。
- **OpenGL 库是关键**：没有图形库，画面画不出来。
- **CPU 芯片是关键**：JVM 翻译出的机器码要和 CPU 芯片匹配。

## 手机上跑 Minecraft Java 版的难点

把上面流程搬到手机上，遇到三个问题：

### 难点 1：手机没有 Java 虚拟机

Oracle 没有给 Android 出官方 Java 虚拟机。怎么办？

**解决办法**：用**开源的 OpenJDK**。PojavLauncher 团队（以及后来的继任项目）把 OpenJDK 移植到 Android，编译成 ARM 芯片的 `.so` 文件，打包进 APK。

> 在 PojavLauncher 团队的基础上，国内开发者以 **Tungstend** 为代表的 **FCL-Team** 和 **墨北 MovTery** 分别推出了 **Fold Craft Launcher** 和 **Zalith Launcher** 等改进版本。他们在 PojavLauncher 的底层移植工作之上，自行移植了部分 `.so` 文件，优化了界面、控制方案和渲染器支持。

### 难点 2：手机图形接口不同

电脑 Minecraft 用 **OpenGL**（桌面版），手机用 **OpenGL ES**（移动版，功能少一些）或 **Vulkan**。两者**不兼容**。

**解决办法**：用**图形接口转换层**。手机 Java 启动器用了几个库：

- **LWJGL**（Lightweight Java Game Library）：Minecraft 用的图形库，PojavLauncher 把它移植到 Android。
- **GL4ES**：把 OpenGL 调用**翻译**成 OpenGL ES 调用，让 OpenGL 程序能在 OpenGL ES 设备上跑。Minecraft 1.16.5- 用的基本是这个后端
- **ANGLE**：Google 开发的图形转译层，把 OpenGL 调用转成 Vulkan 或 OpenGL ES。Minecraft 1.17+ 版本的后端基本用的就是这个，兼容性和性能都不错。
- **VirglRenderer**：把 OpenGL 调用翻译成 Vulkan 或 OpenGL ES，性能更好。

简单说：**Minecraft 调 OpenGL → 转换层翻译成 OpenGL ES / Vulkan → 手机 GPU 画图**。

### 难点 3：CPU 芯片不同

电脑是 x86 芯片（Intel/AMD），手机是 ARM 芯片。Java 字节码虽然跨平台，但 JVM 翻译出的机器码要匹配 CPU。

**解决办法**：用 **ARM 芯片的 Java 虚拟机**。OpenJDK 本身支持 ARM 版，但标准版是为电脑 Linux 的 glibc 编译的。PojavLauncher 团队需要把它**针对 Android 的 Bionic libc 重新编译**，JVM 才能把字节码翻译成 ARM 机器码，手机 CPU 才能跑。

## PojavLauncher 是怎么做到的？

**PojavLauncher** 是一个开源项目，把 Minecraft Java 版搬到 Android 手机上。它的核心组成：

| PojavLauncher APK |
|---|
| 1. 启动器界面（Java 写的） |
| 2. ARM 版 JVM（libjvm.so） |
| 3. LWJGL 移植版（liblwjgl.so） |
| 4. GL4ES / Virgl / ANGLE（图形转换层） |
| 5. Minecraft .jar 文件（用户下载） |

启动流程：

1. 用户打开 PojavLauncher，登录 Minecraft 账号。
2. 启动器下载 Minecraft Java 版的 `.jar` 文件（从 Mojang 官方服务器）。
3. 启动器启动 **ARM 版 JVM**（`libjvm.so`）。
4. JVM 加载 Minecraft 的 `.jar`，把字节码翻译成 ARM 机器码。
5. Minecraft 调用 OpenGL 画图 → **GL4ES / Virgl / ANGLE 翻译成 OpenGL ES / Vulkan** → 手机 GPU 渲染。
6. 画面显示在手机屏幕上。

**关键就是那几个 `.so` 文件**：`libjvm.so`（Java 虚拟机）、`liblwjgl.so`（图形库）、`libgl4es.so`（图形转换）。这些 `.so` 都是**给 Android 重新编译的共享库**（针对 ARM 芯片 + Android 的 Bionic libc），所以能在 Android 上跑。

具体来说：

1. **电脑上的 Java 环境不能直接搬到手机上用**。PojavLauncher 团队只能自己动手，给手机专门做一套能跑的 Java 运行环境。

2. **Android 和电脑 Linux 虽然底层有渊源，但表面的规矩不一样**。电脑上的程序文件直接复制到手机里，根本打不开，必须针对手机重新做。

3. 所以 PojavLauncher 里带了一个**专门为手机定制的 Java 虚拟机**，手机才能跑 Minecraft 这样的 Java 程序。

4. **游戏画面也是专门适配过的**：渲染库是给手机重新编译的版本；GL4ES、ANGLE 这类**翻译官**，把电脑显卡的画面指令翻译成手机显卡能听懂的，这样手机才能正常显示游戏画面。

> 电脑上的东西不能简单复制到手机，PojavLauncher 团队相当于给手机**重新造了一套** Java 环境和画面渲染系统，还让一个「翻译官」负责让手机听懂电脑画面的意思。

## 类似的启动器

除了 PojavLauncher，还有：

- **Amethyst**（安卓 / iOS）：PojavLauncher 团队的官方续作，目前还在维护。PojavLauncher 已于 2025 年 9 月停更，Amethyst 接过了接力棒。
- **HMCL PE**（安卓）：老牌，但停更。
- **Fold Craft Launcher**（安卓）：国产，优化好。
- **Zalith Launcher**（安卓）：基于 PojavLauncher 二改的启动器，拥有更好的 UI 和更多的功能。

## 性能怎么样？

## 性能怎么样？

手机跑 Minecraft Java 版，**帧率因芯片档次差距极大**，但有几个共同瓶颈：

- **JVM 翻译有损耗**：字节码 → ARM 机器码，比电脑原生运行多一层转换。
- **图形接口转换有损耗**：OpenGL → OpenGL ES / Vulkan，翻译要时间。
- **散热限制**：手机体积小，玩久了发热降频，帧率会从峰值掉下来。
- **电池续航**：高帧率下耗电快，插电源玩才能维持峰值性能。

以下是部分实测参考（原版 = 不加任何优化模组，版本参考1.21，区块为8）：

| 芯片档次 | 测试芯片 | 原版帧率/fps | 加优化模组后/fps | 体验 |
|---------|---------|---------|-------------|------|
| **顶级旗舰** | 骁龙 8 Elite | 350–500 | 420–900+ | 非常流畅，甚至过剩 |
| **高端** | 骁龙 8s Gen3 | 110~310 | 260–500 | 流畅，玩 mod 完全没问题 |
| **中高端** | 骁龙 7 系（新款） | 130–300 | 170–540 | 日常流畅，大部分场景稳 60+ |
| **中端老旗舰** | 骁龙 865 / 870 | 90–180 | 100–320 | 能玩，复杂场景会掉帧 |
| **中低端** | 骁龙 6 系、天玑 800 系 | 30–60 | 40–100 | 凑合能玩，别开太高画质 |
| **入门** | 骁龙 4 系、天玑 700 | 10–30 | 20-70 | 必须加优化整合包才能玩 |

**几点说明：**

- **优化模组是什么？** 优化模组能让游玩帧率提升，手机 Java 启动器基本都支持安装优化模组。
- **帧率看场景**：上面数字是**正常地形/正常分辨率**下的峰值，复杂地形、大量方块、开光影时会掉很多。
- **发热降频**：手机玩久了会发热，芯片会自动降频，帧率会从峰值掉下来。所以「能跑 900 帧」不等于「一直稳 900 帧」。
- **重度 mod**（如 RLCraft、大型整合包）：即使旗舰机也可能掉到 50–120 帧，中低端机直接卡成 PPT。

## 小结

- Minecraft Java 版**不能直接在手机跑**，因为没 Java 虚拟机、图形接口不同、CPU 芯片不同。
- **PojavLauncher** 用三个关键 `.so` 解决：
  - `libjvm.so`：ARM 版 Java 虚拟机，让字节码能跑。
  - `liblwjgl.so`：LWJGL 移植版，提供图形库。
  - `libgl4es.so`：把 OpenGL 翻译成 OpenGL ES / Vulkan。
- 性能不如电脑，但中高端手机能流畅玩。
