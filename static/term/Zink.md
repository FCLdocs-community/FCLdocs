# Zink

[brief]
Zink 是 Mesa 提供的"用 Vulkan 实现 OpenGL"的驱动。它把游戏的 OpenGL 指令转到 Vulkan 上执行，适合搭配 Turnip 等 Vulkan 驱动使用。
[/brief]

[detail]
## 它做什么

Zink 是一层 OpenGL-on-Vulkan 实现：游戏仍调用 OpenGL，Zink 把这些调用翻译成 Vulkan，交给底层 Vulkan 驱动。

## 优点与代价

- 优点：在 Vulkan 驱动较好的设备上，兼容性和性能不错；
- 代价：多了一层翻译，对驱动质量依赖高。

## 在 FCL 里

Zink 常用于高版本、需要较新图形能力的场景。它依赖 Vulkan 驱动，可与 Turnip（Adreno）或系统 Vulkan 驱动配合。
[/detail]
