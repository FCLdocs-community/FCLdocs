# Blaze3D

[brief]
Blaze3D 是 Minecraft Java 版自 1.17 起使用的底层渲染引擎，负责把方块、实体、界面画到屏幕上。它长期基于 OpenGL。
[/brief]

[detail]
## 它是什么

Blaze3D 是 Mojang 为 Minecraft 重写的渲染引擎，替代了旧版较混乱的渲染代码，提升了跨版本、跨平台的渲染能力。

## 特点

- 1.17 引入，重写大量渲染逻辑；
- 长期基于 OpenGL 与 GLSL 着色器；
- 26.2 起开始提供实验性的 Vulkan 渲染后端。

## 相关

- **GLSL**：Blaze3D 使用的着色器语言；
- **光影**：通过替换/扩展 Blaze3D 的渲染流程实现。
[/detail]
