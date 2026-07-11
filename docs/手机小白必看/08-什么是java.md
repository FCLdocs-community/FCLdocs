---
sidebar_position: 9
title: 什么是 Java？
description: 用大白话讲清楚 Java 是什么、它为什么能跨平台、JVM 是什么、为什么 Minecraft 要用 Java。
---

# 什么是 Java？

## Java 是什么？

**Java** 是一门**编程语言**，由美国 Sun 公司（后被 Oracle 收购）在 1995 年发布。它是世界上**最流行**的编程语言之一，广泛用于：

- 企业级后端开发（银行、电商、政府系统）
- Android 手机 App（虽然现在主推 Kotlin，但底层还是 Java）
- 大数据（Hadoop、Spark 都是 Java 写的）
- **Minecraft Java 版**（这就是你为什么要了解 Java）

编程语言是什么？打个比方：你想让电脑干活，得给它下指令。但电脑只懂 0 和 1（机器语言），人写 0 和 1 太累。所以人们发明了**编程语言**——一种人能看懂、写起来方便的语言，写完后用「**编译器**」翻译成电脑能懂的机器码。Java 就是其中一种。

## Java 的特点

### 1. 简单（相对于 C++）

Java 是从 [C++](https://baike.baidu.com/item/c%2B%2B/99272) 简化来的，去掉了 C++ 里容易出错的指针、多重继承等特性，**学起来比 C++ 容易**。

### 2. 面向对象

Java 是「**面向对象**」的语言。意思是把程序组织成一个个「**对象**」，每个对象有自己的数据和行为。比如「汽车」是一个对象，有颜色、速度（数据），能加速、刹车（行为）。这种组织方式接近人的思维，**适合写大型程序**。

### 3. 跨平台（最关键）

这是 Java 最大的卖点：**「Write Once, Run Anywhere」（一次编写，到处运行）**。

C++ 写的程序，在 Windows 上编译出来是 `.exe`，**只能 Windows 跑**；要给 Mac 用，得在 Mac 上重新编译。Java 不一样：**一份 Java 代码，编译成字节码后，能在 Windows、Mac、Linux 上跑**，前提是安装了 JRE（Java 运行环境）。

### 4. 自动内存管理（GC）

C++ 程序员要手动管理内存（new 出来的对象要手动 delete），忘了就**[内存泄漏](https://baike.baidu.com/item/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F/6181425)**。Java 有**垃圾回收（GC，Garbage Collection）**，自动回收不再使用的对象，**程序员不用管内存**，省心。

### 5. 生态强大

Java 有海量开源库（jar 包），要做什么功能基本都能找到现成的库，不用从零写。

## JVM 是什么？为什么能跨平台？

**JVM** 全称 **Java Virtual Machine**，中文「**Java 虚拟机**」。它是 Java 跨平台的关键。

打个比方：你写了一份中文演讲稿（Java 源代码），想让美国人、法国人、日本人都能听懂。一种办法是给每个国家单独翻译一份（C++ 的做法，每个平台单独编译）。另一种办法是：**写一份「中间语言」演讲稿（字节码），然后给每个国家配一个「翻译官」（JVM）**，翻译官把中间语言翻译成当地语言。Java 用的是第二种办法。

具体流程：

```
Java 源代码 (.java)
       ↓ 用 javac 编译
Java 字节码 (.class / .jar)
       ↓ JVM 解释执行（或 JIT 编译）
机器码（在 CPU 上跑）
```

- `.java`：源代码，人写的。
- `.class`：编译后的字节码，**不是机器码**，是 JVM 能懂的中间格式。
- `.jar`：Java Archive，把多个 `.class` 打包成一个文件，方便分发。
- **JVM**：负责把字节码翻译成机器码并执行。**每个平台有自己的 JVM**（Windows JVM、Mac JVM、Linux JVM），但它们都能跑同一份字节码。

:::note 名词解释
**字节码（Bytecode）**：Java 源代码编译后的中间格式，不是机器码，需要 JVM 翻译成机器码才能跑。
:::

## Java 的版本

Java 版本号有点乱，简单记：

- **JDK 8**（2014）：最经典，企业还在大量用，Minecraft 1.12–1.16.5 用这个
- **JDK 11**（2018）：长期支持版（LTS）
- **JDK 17**（2021）：LTS，Minecraft 1.18–1.20.4 要求
- **JDK 21**（2023）：LTS，Minecraft 1.20.5–1.21.11 要求
- **JDK 25**（2025）：当前最新 LTS，Minecraft 26.1+ 要求

**JDK** 全称 **Java Development Kit**，Java 开发工具包，包含 JVM、编译器、标准库。**JRE** 全称 **Java Runtime Environment**，Java 运行环境，只包含 JVM 和标准库，**只跑 Java 程序不开发的话装 JRE 就够**。但 JDK 11 起 Oracle 不再单独提供 JRE，所以现在都装 JDK。

## 为什么 Minecraft 要用 Java？

Minecraft Java 版是 Notch（Markus Persson）2009 年用 Java 写的，原因：

1. **跨平台**：Notch 想让 Windows、Mac、Linux 玩家都能玩，Java 跨平台正好。
2. **开发快**：Java 生态好，能快速开发。
3. **当时 Notch 熟 Java**：个人开发者用熟悉的语言。

但 Java 也有缺点：

- **启动慢**：JVM 要预热。
- **占内存**：JVM 本身要几百 MB。
- **GC 卡顿**：垃圾回收时可能卡一下。

所以 Minecraft Java 版**吃内存、启动慢、偶尔卡**，这些是 Java 的特性决定的。基岩版（C++ 写的）就没这些问题，但 Java 版**mod 生态丰富**，玩家还是爱玩 Java 版。

## Java 和 JavaScript 是一回事吗？

**不是！完全不是！**

- **Java**：Sun/Oracle 的编程语言，用于后端、Android、Minecraft。
- **JavaScript（JS）**：网景公司搞的，用于网页交互，和 Java 没关系。

名字像是因为 1995 年网景公司**蹭 Java 的热度**，把 LiveScript 改名 JavaScript。**两者语法、用途、运行环境都不同**，别搞混。

## 小结

- **Java = 1995 年 Sun 发布的面向对象编程语言**。
- 特点：简单、面向对象、**跨平台**、自动内存管理、生态强。
- **跨平台靠 JVM**：源码 → 字节码 → JVM 翻译 → 机器码。
- `.java` 是源码，`.class` 是字节码，`.jar` 是打包的字节码。
- Minecraft Java 版用 Java 写，所以吃内存、启动慢，但 mod 多。
- **Java 和 JavaScript 完全不是一回事**。