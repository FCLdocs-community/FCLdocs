# GLSL（OpenGL 着色器语言）

[brief]
GLSL 是用来编写"着色器"的编程语言。着色器是跑在显卡上的小程序，决定每个像素/顶点怎么上色，光影和画面效果都靠它。
[/brief]

[detail]
## 它是什么

GLSL（OpenGL Shading Language）是 OpenGL 的着色器语言，语法类似 C。

## 两类常见着色器

- **顶点着色器**：处理顶点位置；
- **片元/像素着色器**：处理每个像素的颜色。

## 和 Vulkan 的关系

Vulkan 使用的是编译后的 **SPIR-V**，GLSL 通常要先经 glslang 等工具转换成 SPIR-V。

## 在 Minecraft 里

光影包本质上就是一套 GLSL 着色器，由 Iris/OptiFine 等加载。
[/detail]
