# Bionic libc

[brief]
Bionic 是 Android 自带的 C 标准库（也叫 Bionic libc）。手机上的程序靠它完成读写文件、申请内存等基础操作。它和电脑 Linux 常用的 glibc 不是同一套，所以为电脑编译的 `.so` 不能直接拿到 Android 上用。
[/brief]

[detail]
## libc 是什么

libc（C 标准库）是程序最底层的"工具箱"，提供读写文件、申请内存、字符串处理等基础函数。每个操作系统都有自己的 libc。

## 为什么 Android 要单独一套

- 电脑 Linux 普遍用 **glibc**（GNU C Library）；
- Android 为了体积小、启动快，自己实现了 **Bionic**；
- 两者接口不完全一样，行为也有差异。

## 对玩 Minecraft 的意义

Minecraft 的 JVM、LWJGL 等库原本是按 glibc 写的。要放到 Android 上运行，必须改用 Bionic 重新编译，这就是"Java 移植""LWJGL 移植"里反复出现 Bionic 的原因。

:::note
看到日志里 `libc.so` 相关报错，多半是某个库没有针对 Android 的 Bionic 正确编译或适配。
:::
[/detail]
