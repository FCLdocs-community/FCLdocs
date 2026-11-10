# DXVK

[brief]
DXVK 是一个把 DirectX（主要是 D3D9/10/11）调用转换成 Vulkan 的兼容层，常与 Wine 搭配，让 Windows 游戏在 Linux/Steam Deck 上运行。
[/brief]

[detail]
## 它是什么

DXVK（DirectX Vulkan）把 Windows 游戏的 Direct3D 调用翻译成 Vulkan。

## 常见搭配

- **Wine / Proton**：提供 Windows 环境；
- **DXVK**：负责图形转换。

## 和手机启动器的区别

手机跑 Minecraft Java 版用的是 JVM + LWJGL 移植，不是 Wine/DXVK。DXVK 多出现在电脑 Linux/Steam Deck 场景。
[/detail]
