---
sidebar_position: 11
title: 什么是图形 API？
description: 用大白话讲清楚什么是图形 API、主流的 OpenGL、Vulkan、DirectX、Metal 各有什么特点。
---

:::tip 专有名词
本文涉及到的专有名词：[SoC](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E6%89%8B%E6%9C%BA%E9%85%8D%E7%BD%AE%E8%AE%B2%E8%A7%A3/soc%E4%BB%8B%E7%BB%8D) 、[GPU](/docs/%E6%89%8B%E6%9C%BA%E5%B0%8F%E7%99%BD%E5%BF%85%E7%9C%8B/%E6%89%8B%E6%9C%BA%E9%85%8D%E7%BD%AE%E8%AE%B2%E8%A7%A3/cpu) 、[Android](window:/term/Android) 、[Windows](window:/term/Windows) 、[Linux](window:/term/Linux)
:::

# 什么是图形 API？

## 图形 API 是什么？

**图形 API**（Graphics API）是**程序和显卡（GPU）之间的「翻译官」**。它定义了一套**标准化的命令**，让程序能用统一的方式让 GPU 画图。

打个比方：你（程序）想让工厂（GPU）生产一批零件（画图），但你不会开机器。于是你写了一份**操作手册**（图形 API），手册里规定了「**按这个按钮机器就这么动**」。你只要按手册操作，工厂就能生产。不同工厂（不同 GPU）都遵守同一份手册，所以你不用管具体工厂细节。

更具体的比喻：

- **没有图形 API**：每个程序都要直接和每种显卡打交道，写一遍 NVIDIA 的代码、再写一遍 AMD 的代码、再写一遍 Intel 的代码……累死。
- **有图形 API**：程序只对 API 说话（「画一个三角形」），API 翻译给 GPU 听，不管 GPU 是哪家产的。**一次编写，所有 GPU 都能跑**。

:::note 名词解释
**API**：Application Programming Interface，应用程序编程接口。简单说就是「**程序之间对话的标准**」。图形 API 就是「程序和 GPU 对话的标准」。
:::

## 主流图形 API 有哪些？

世界上主流的图形 API 有四个，分别属于不同平台：

| 图形 API | 由谁开发 | 用在哪 | 特点 |
|----------|----------|--------|------|
| **OpenGL** | SGI → Khronos | 跨平台（电脑、手机、嵌入式） | 老牌，跨平台，但已停止更新 |
| **Vulkan** | Khronos | 跨平台（电脑、手机） | 现代，性能强，但难写 |
| **DirectX (Direct3D)** | 微软 | Windows、Xbox | Windows 专用，性能强 |
| **Metal** | 苹果 | iOS、macOS | 苹果专用，性能强 |
| **OpenGL ES** | Khronos | 手机、嵌入式 | OpenGL 的移动版 |

下面分别讲。

## 一、OpenGL

**OpenGL**（Open Graphics Library）是 1992 年 SGI 公司发布的图形 API，现在由 **Khronos Group** 维护。它是**最老牌、最通用**的图形 API。

特点：

- **跨平台**：Windows、Mac、Linux、手机（通过 OpenGL ES）都能用。
- **状态机模型**：OpenGL 是「状态机」，你设置好状态（颜色、纹理），然后画图，状态一直保持。打个比方：状态机就像**洗衣机**——你选好「标准洗、水温 40 度」，然后按开始，机器就按这个设定一直运行，直到你手动改设置。
- **简单易用**：API 设计直观，初学者好上手。
- **已停止更新**：Khronos 不再添加新功能，主推 Vulkan。但 OpenGL 4.6 仍然够用。

Minecraft Java 版用的就是 OpenGL（通过 LWJGL 库）。这也是为什么 Minecraft Java 版跨平台——OpenGL 在 Windows、Mac、Linux 都有实现。

:::note 名词解释
**Khronos Group**：一个开放标准联盟，由多家公司（Apple、Intel、NVIDIA、AMD、Google 等）组成，维护 OpenGL、Vulkan、OpenCL 等开放标准。
:::

## 二、Vulkan

**Vulkan** 是 Khronos 2016 年发布的**现代图形 API**，是 OpenGL 的继任者。

特点：

- **跨平台**：Windows、Linux、Android 都能用（Mac 通过 MoltenVK 转 Metal）。MoltenVK 就是一个「翻译官」，把 Vulkan 的指令翻译成 Mac 能听懂的 Metal 指令，让 Mac 也能跑 Vulkan 程序。
- **性能强**：比 OpenGL 快 20%–50%，因为**降低 CPU 开销**。CPU 开销 = CPU 干活的时间和精力。开销越低，CPU 越轻松，游戏越流畅。
- **多线程友好**：能利用多核 CPU 并行提交渲染命令。**多线程** = 多个任务同时跑，就像食堂多个窗口同时打饭，比只有一个窗口快。**渲染命令** = 让 GPU 画什么的指令，比如「画个三角形、涂成红色」。
- **显式控制**：程序员要管内存、管同步、管管线，**更复杂但更高效**。显式控制就像**手动挡汽车**：离合、换挡、油门都得自己操作，比自动挡麻烦，但老司机能开得更快更省油。这里的「内存」是显存（GPU 的临时仓库），「同步」是协调 GPU 和 CPU 别抢活，「管线」是 GPU 画图的流水线工序。
- **难写**：API 底层、显式，初学者难上手。

Vulkan 适合追求性能的 **AAA 游戏**、**引擎**（DOOM、Quake、Id Tech 引擎都用 Vulkan）。

:::note 名词解释
- **AAA 游戏** = 俗称「3A 大作」，就是投入大、画面好、规模大的顶级游戏（比如 GTA、赛博朋克）
- **引擎** = 游戏的「发动机」，一套现成的工具，开发者不用从零造轮子。
:::

从 Minecraft 26.2 版本开始，Mojang 往里面塞了图形 API 选项，可以自由切换成 Vulkan 选项，以提高帧率。

:::tip
目前只有以下移动端 SoC 内置的 GPU 部分可以运行 Vulkan 下的 Minecraft：

- Qualcomm 高通骁龙 Adreno
- 三星使用的 AMD RDNA 的 Xclipse
- Apple Silicon 苹果
- Imagination Technologies 的 PowerVR

其它移动端 SoC 内置的 GPU 部分缺少了一个 Vulkan 特性：**fillModeNonSolid**。简单说，这个功能就是能画「线框模式」和「点模式」（把实体模型变成只看骨架的线框）。即使 Vulkan API 版本满足要求，因为缺少这个特性，Minecraft 无法运行，会产生 "Device[GPU] does not have required feature[fillModeNonSolid]" 的报错，导致游戏崩溃。
:::

## 三、DirectX（Direct3D）

**DirectX** 是微软 1995 年推出的**多媒体 API** 集合，其中负责 3D 图形的部分叫 **Direct3D**（D3D）。多媒体 API = 不止管画图，还管声音、手柄、网络的一套工具箱。

特点：

- **Windows 专用**：只能在 Windows、Xbox 上用。
- **性能强**：和 Vulkan 同级，比 OpenGL 快。
- **生态成熟**：Windows 游戏基本都用 DirectX。
- **版本**：DirectX 9、10、11、12。**DirectX 12** 是最新，2015 年发布，类似 Vulkan 的底层 API。

主流 PC 游戏（赛博朋克 2077、原神 PC 版、GTA V）都用 DirectX。但 DirectX **不能在手机、Mac、Linux 上跑**（除非用**翻译层**，比如 Wine 的 DXVK 把 DirectX 翻译成 Vulkan）。

:::note 名词解释
- **翻译层** = 两个不同语言的人之间，负责实时翻译的中间人。
- **Wine** = 让 Linux/Mac 能跑 Windows 程序的兼容工具。
- **DXVK** = Wine 里的一个「翻译官」，把 DirectX 的画图指令翻译成 Vulkan。
:::

## 四、Metal

**Metal** 是苹果 2014 年推出的图形 API，**只用在苹果设备**（iPhone、iPad、Mac）。

特点：

- **苹果专用**：iOS、macOS 都用。
- **性能强**：和 Vulkan、DirectX 12 同级。
- **简单**：比 Vulkan 好写，比 OpenGL 快。
- **取代 OpenGL**：苹果已经停止更新 OpenGL，主推 Metal。

iPhone 上的游戏、Minecraft 基岩版 iOS 版都用 Metal。Mac 上的程序也用 Metal（OpenGL 在 Mac 上已废弃）。

## 五、OpenGL ES

**OpenGL ES**（Embedded Systems）是 OpenGL 的**移动版**，专为手机、**嵌入式设备**设计。嵌入式设备 = 功能简单、资源少的专用设备，比如智能手表、路由器、车载屏幕。

特点：

- **简化版**：去掉 OpenGL 一些复杂功能，适合资源受限的设备。
- **跨平台**：Android、iOS（被 Metal 取代前）、嵌入式设备都能用。
- **版本**：OpenGL ES 1.0（**固定管线**）、2.0（**可编程管线**）、3.0、3.2。
  - **固定管线** = GPU 画图的步骤是固定的，程序员只能调参数，不能改流程。就像**傻瓜相机**，按快门就行。
  - **可编程管线** = 程序员可以自己写代码控制每一步怎么画，就像**单反相机**，专业但灵活。
- **手机主流**：Android 手机基本都支持 OpenGL ES 3.2。

Android 手机上的 App、游戏大部分用 OpenGL ES 或 Vulkan。

## 各 API 对比

| API | 平台 | 性能 | 难度 | 状态 |
|-----|------|------|------|------|
| OpenGL | 跨平台 | 中 | 易 | 维护中（不更新） |
| OpenGL ES | 移动 | 中 | 易 | 维护中 |
| Vulkan | 跨平台 | 高 | 难 | 活跃 |
| DirectX 12 | Windows | 高 | 难 | 活跃 |
| Metal | 苹果 | 高 | 中 | 活跃 |

## 图形 API 和 Minecraft 的关系

- **Minecraft Java 版**：用 **OpenGL**（通过 LWJGL）和 **Vulkan**。
- **Minecraft 基岩版**：用 **DirectX**（Windows）、**Metal**（iOS/Mac）、**OpenGL ES / Vulkan**（Android）。
- **Zalith Launcher / Fold Craft Launcher**（手机跑 Java 版）：把 OpenGL 调用**翻译成 OpenGL ES / Vulkan**（用 GL4ES / ANGLE）或直接调用 **Vulkan**。

## 小结

- **图形 API = 程序和 GPU 之间的翻译官**，定义标准化的画图命令。
- 主流 API：
  - **OpenGL**：老牌跨平台，但在现代显卡上性能发挥有限。
  - **Vulkan**：现代跨平台，性能强但难写。
  - **DirectX**：Windows 专用，PC 游戏主流。
  - **Metal**：苹果专用。
  - **OpenGL ES**：移动版 OpenGL。
- API 让程序「一次编写，所有 GPU 都能跑」。