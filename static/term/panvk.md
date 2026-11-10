# panvk

[brief]
panvk 是 Mesa 为 ARM Mali GPU 开发的开源 Vulkan 驱动，作用和 Adreno 上的 Turnip 类似，可通过驱动插件安装到 FCL。
[/brief]

[detail]
## 它是什么

panvk 是 Panfrost 项目里的 Vulkan 驱动，面向 Mali GPU，ICD 库名为 `libvulkan_panfrost.so`。

## 在 FCL 里

- 与 Turnip 一样，通过「驱动插件」安装；
- 用于改善 Mali 设备的 Vulkan 兼容性与性能；
- 设备/驱动不匹配时可能加载失败。

## 相关

- **Turnip**：Adreno 的开源 Vulkan 驱动。
[/detail]
