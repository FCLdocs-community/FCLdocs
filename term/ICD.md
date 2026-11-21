# ICD（Vulkan 驱动接口）

[brief]
ICD（Installable Client Driver）是 Vulkan 用来加载不同显卡驱动的机制/描述文件。手机上的 Turnip、panvk 等驱动都以 ICD 形式提供，切换驱动时本质是在换 ICD。
[/brief]

[detail]
## 它是什么

Vulkan 允许系统里存在多个驱动实现，通过 ICD 描述文件告诉加载器"有哪些驱动、库在哪"。

## 在 FCL 里

- Turnip 的 ICD 库名是 `libvulkan_freedreno.so`；
- panvk 的 ICD 库名是 `libvulkan_panfrost.so`；
- 安装驱动插件后，启动器通过 ICD 让 Vulkan 使用新驱动。

## 相关

- **Vulkan**：图形接口；
- **驱动插件**：FCL 中安装/切换 ICD 的入口。
[/detail]
