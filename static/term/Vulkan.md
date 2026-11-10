# Vulkan

[brief]
Vulkan 是新一代跨平台图形接口，比 OpenGL 更底层、CPU 开销更低。Minecraft 26.2 起提供了实验性的 Vulkan 渲染后端；手机上跑 Vulkan 很依赖驱动质量。
[/brief]

[detail]
## 它是什么

Vulkan 由 Khronos Group 于 2016 年发布，是 OpenGL 的继任者。它把更多控制权交给开发者，能更好地利用多核 CPU。

## 在 Minecraft 里

- 26.2 版本提供了针对 Vulkan 的渲染适配（**Vulkan 渲染后端**，实验性）；
- 可在图形设置里选择默认 / 优先使用 Vulkan / 优先使用 OpenGL；
- 需要设备支持 **Vulkan 1.2 及以上**，不满足会回退 OpenGL。

## 手机上要注意

- 厂商驱动质量参差，可用 **Turnip** 等开源驱动插件改善；
- 不同设备的扩展支持不同，具体报错见「Vulkan 报错」页。
[/detail]
