# OpenGL ES

[brief]
OpenGL ES 是 OpenGL 的"手机精简版"，安卓设备普遍支持。它和电脑桌面版 OpenGL 不完全兼容，所以要把电脑版 Minecraft 的画面翻译成 OpenGL ES 才能在手机上显示。
[/brief]

[detail]
## 它是什么

OpenGL ES（OpenGL for Embedded Systems）是面向手机、平板、嵌入式设备的图形接口，比桌面 OpenGL 功能少、更省电。

## 常见转换方式

- **GL4ES**：OpenGL → OpenGL ES；
- **ANGLE**：OpenGL ES → Vulkan；
- **VirGL / Zink**：经 Vulkan 或虚拟 GPU 实现。

## 相关

- **GLES** 是 OpenGL ES 的常用缩写；
- **EGL** 负责把绘制结果送到 Android 的 Surface。
[/detail]
