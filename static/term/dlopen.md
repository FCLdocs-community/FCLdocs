# dlopen

[brief]
dlopen 是程序在运行时"临时打开并加载一个 `.so` 库"的函数。它让程序不必一开始就把所有库装进来，而是用到时再加载。
[/brief]

[detail]
## 它做什么

`dlopen("libxxx.so")` 会把指定的动态库加载进当前进程，之后就能调用其中的函数。

## 为什么要用它

- 节省启动时间与内存；
- 可以按需选择加载哪个库（比如选不同渲染器）。

## 在 FCL 里的体现

FCL 启动游戏时，会先把 JVM 依赖的 `libjli.so`、`libjvm.so` 等用 dlopen 加载进进程，游戏日志里成段的 `DLOPEN` 记录就来自这里。

:::note
Android 限制直接加载数据目录里的 `.so`，所以启动器要通过 native 层中转，这也是日志里出现大量 dlopen 的原因之一。
:::
[/detail]
