# ANGLE

[brief]
ANGLE 是 Google 开发的图形转换层，把 OpenGL ES 调用转换成 Vulkan（也可转其他后端）。它常作为第二层转换，用来提升兼容性与稳定性。
[/brief]

[detail]
## 它是什么

ANGLE（Almost Native Graphics Layer Engine）最初为 Chrome 的 WebGL 而生，负责把 OpenGL ES 翻译成平台更底层的图形 API。

## 在 FCL 里

- FCL 内置 `libEGL_angle.so`、`libGLESv2_angle.so`；
- 它一般不作独立渲染器，而是作为 MobileGlues 等的可选第二层；
- 可减少某些驱动的兼容问题。

## 相关

- 与 **GL4ES**（OpenGL→OpenGL ES）、**Zink**（OpenGL→Vulkan）同属图形转化层，只是方向不同。
[/detail]
