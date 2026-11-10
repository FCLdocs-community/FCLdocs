# glibc

[brief]
glibc（GNU C Library）是电脑 Linux 最常用的 C 标准库，相当于 Linux 程序的基础工具箱。Android 不用它，而是用自家的 Bionic，所以为电脑 Linux 编译的程序不能直接搬到手机上跑。
[/brief]

[detail]
## 它是什么

glibc 是 Linux 上事实标准的 C 库，几乎所有桌面/服务器 Linux 程序都依赖它。

## 和 Android 的关系

- 电脑 Linux：glibc
- Android：Bionic libc

两者虽然都叫"libc"，但实现和接口不同。一个按 glibc 编译的 `.so`，拿到 Android 上可能直接加载失败或崩溃。

## 所以移植要做什么

把源码里的系统调用、依赖接口改成 Bionic 提供的版本，再用 Android NDK 交叉编译，才能生成 Android 能用的 `.so`。
[/detail]
