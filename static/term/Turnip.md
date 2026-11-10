# Turnip

[brief]
Turnip 是 Mesa 为高通 Adreno GPU 开发的开源 Vulkan 驱动。它常以"驱动插件"形式安装到 FCL，用来改善 Vulkan 渲染（如 Zink、MC 26.2+ 的 Vulkan 后端）。
[/brief]

[detail]
## 它是什么

Turnip 是 Adreno GPU 的开源 Vulkan 驱动，属于 Mesa 项目，ICD 库名为 `libvulkan_freedreno.so`。

## 在 FCL 里

- 不内置，通过「驱动插件」按需安装；
- 可替代厂商自带驱动，部分场景兼容性/性能更好；
- 驱动不匹配设备会加载失败，回退系统驱动。

## 相关

- **panvk**：Mali GPU 的对应开源 Vulkan 驱动；
- **ICD**：Vulkan 驱动的加载描述文件。
[/detail]
