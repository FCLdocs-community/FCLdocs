# libc（C 标准库）

[brief]
libc 是 C 语言的标准库，给程序提供读写文件、申请内存等最基础的能力。电脑 Linux 用 glibc，Android 用 Bionic，两者并不通用。
[/brief]

[detail]
## 它是什么

libc（C Library）是每个系统最底层的"工具箱"，几乎所有原生程序都依赖它。

## 两大实现

- **glibc**：电脑 Linux 常用；
- **Bionic**：Android 使用。

## 为什么重要

为 glibc 编译的 `.so` 不能直接在 Android 上跑，必须针对 Bionic 重新编译，这就是很多移植工作的核心。
[/detail]
