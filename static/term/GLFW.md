# GLFW

[brief]
GLFW 是一个跨平台的窗口与输入库，负责创建游戏窗口、管理 OpenGL 上下文、读取键盘鼠标和手柄。Minecraft 长期用它，手机上由启动器替换其内部实现。
[/brief]

[detail]
## 它是什么

GLFW 是 C 语言库，桌面上依赖 X11/Wayland/Win32 等系统来创建窗口。

## 在手机上怎么用

Android 没有桌面窗口系统，Pojav 系启动器保持 GLFW 的 Java 接口不变，把内部实现换成 Android 的 Surface 与事件管道，让游戏以为还在桌面上。

## 相关

- **SDL3**：26.3 起 Minecraft 改用 SDL3 替代 GLFW；
- **LWJGL**：把 GLFW 包装成 Java 接口的顶层库。
[/detail]
