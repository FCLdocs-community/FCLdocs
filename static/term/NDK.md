# NDK（Android Native Development Kit）

[brief]
NDK 是 Google 提供的 Android 原生开发工具包，专门用来把 C/C++ 代码交叉编译成 Android 能用的 `.so`。移植 JVM、LWJGL 这类原生库时离不开它。
[/brief]

[detail]
## 它是什么

NDK（Android Native Development Kit）包含针对各 CPU 架构的编译器、头文件和库，让你在电脑上生成 Android 原生的 `.so`。

## 和 SDK 的区别

- SDK：开发普通 Android App（Java/Kotlin）；
- NDK：开发 App 里的 C/C++ 原生部分。

## 在移植中的角色

OpenJDK、LWJGL 等原生库要针对 arm/arm64/x86/x86_64 分别用 NDK 编译，才能在不同手机上加载。
[/detail]
