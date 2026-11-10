# OpenGL

[brief]
OpenGL 是一套跨平台的 3D 图形绘图接口，电脑版 Minecraft 就是用它在屏幕上画方块世界的。不同的显卡、系统各自实现 OpenGL。
[/brief]

[detail]
## 它是什么

OpenGL（Open Graphics Library）由 Khronos Group 维护，是一套"告诉显卡怎么画图"的标准接口。程序调用 OpenGL，显卡驱动负责真正绘制。

## 版本与场景

- 电脑桌面用完整的 OpenGL（如 4.6）；
- 手机用精简版 **OpenGL ES**；
- 两者不完全兼容，所以手机跑 Java 版需要图形转化层。

## 现状

OpenGL 已进入维护状态，Khronos 主推 Vulkan。Minecraft 26.2 也提供了实验性的 Vulkan 渲染后端。
[/detail]
