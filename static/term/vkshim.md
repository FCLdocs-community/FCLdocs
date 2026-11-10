# vkshim（Vulkan 适配层）

[brief]
vkshim 是 FCL 里的 Vulkan 兼容适配层，用来在设备缺少某些 Vulkan 扩展/特性时进行模拟或补齐，让 MC 26.2+ 的 Vulkan 后端更容易跑起来。
[/brief]

[detail]
## 它解决什么问题

Minecraft 26.2 的 Vulkan 后端依赖一些较新的扩展与特性。部分手机驱动不完整，vkshim 可以合成或模拟其中一部分，降低门槛。

## 能力范围

- 可合成 `VK_EXT_vertex_attribute_divisor` 等；
- 可模拟 `fillModeNonSolid` 等特性（主要走系统 Vulkan 加载器路径）；
- 不能凭空补出所有缺失能力。

## 相关

- **Vulkan**：图形接口；
- **Turnip / panvk**：可替换的 Vulkan 驱动。
[/detail]
