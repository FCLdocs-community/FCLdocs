# VirGL（VirGLRenderer）

[brief]
VirGL 是一种图形转换方案，把 OpenGL 指令转换后交给手机的 Vulkan 或 OpenGL ES 执行，常用于部分启动器和渲染场景。
[/brief]

[detail]
## 它是什么

VirGL 源自虚拟化场景的虚拟 GPU 方案，在手机启动器里被用作图形转化层/渲染后端。

## 在 FCL 里

- 属于可选渲染后端之一；
- 依赖 `libvirgl_test_server.so`、`gallium_virgl` 等组件；
- 常与 VGPU 方案一起出现。

## 注意

不同设备的兼容性和性能差异较大，遇到黑屏/花屏可换其他渲染器对比。
[/detail]
