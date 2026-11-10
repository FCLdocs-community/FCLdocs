# AWT（Abstract Window Toolkit）

[brief]
AWT 是 Java 自带的桌面图形界面工具包，用来画窗口、按钮、菜单。早期 Minecraft（1.12.2 及更早）用它绘制部分界面，手机上没有这套桌面环境，需要额外桥接。
[/brief]

[detail]
## 它是什么

AWT 是 Java 最基础的 GUI（图形界面）库，属于 JDK 标准库的一部分。更高级的 Swing 也建立在它之上。

## 为什么手机要特殊处理

AWT 面向桌面窗口系统（Windows/X11），Android 没有这些环境。因此 FCL 通过 **Caciocavallo** 桥，把 AWT 的绘制结果映射到 Android 的 Surface 上，老版本 Minecraft 的界面才能显示。

## 和新版本的关系

较新的 Minecraft 已改用 LWJGL/GLFW 自绘界面，对 AWT 的依赖大幅减少。
[/detail]
