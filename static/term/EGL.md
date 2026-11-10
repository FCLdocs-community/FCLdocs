# EGL

[brief]
EGL 是连接 OpenGL ES（或 OpenGL）与手机原生窗口（Surface）的"中间接口"，负责创建绘图上下文、把渲染结果送到屏幕上。
[/brief]

[detail]
## 它解决什么问题

OpenGL ES 只管"怎么画"，不管"画到哪"。EGL 负责管理绘制表面、上下文，并把画面显示到 Android 的 Surface 上。

## 在启动器里的作用

启动命令里常见 `-Dorg.lwjgl.egl.libname=...`，就是告诉 LWJGL 从哪个库加载 EGL。不同渲染器（如 Zink、MobileGlues）会提供自己的 EGL 实现。

## 相关

- **GLES**：OpenGL ES 的缩写；
- **GLFW**：桌面端负责创建窗口和上下文的库，Android 上被替换实现。
[/detail]
