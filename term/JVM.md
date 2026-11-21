# JVM（Java 虚拟机）

[brief]
JVM 是「运行 Java 程序的环境」，负责把 Java 代码翻译成手机/电脑能执行的动作。Minecraft Java 版必须先启动 JVM 才能跑起来。
[/brief]

[detail]
## JVM 是什么

JVM（Java Virtual Machine，Java 虚拟机）是执行 Java 程序的「引擎」。Java 程序不是直接跑在硬件上，而是交给 JVM，由它翻译执行。

## 为什么要懂一点

- 「游戏内存」调的就是 **JVM 的内存（堆内存）**。
- 很多报错来自 JVM：`OutOfMemoryError`（内存不足）、`UnsupportedClassVersionError`（Java 版本不符）。
- FCL 启动游戏时，会在启动器进程里拉起 JVM。

:::note
安卓系统本身用的是另一套运行时（ART），不认标准 Java 字节码，所以 FCL 必须自带一套能在安卓上跑的 JVM。
:::
[/detail]
