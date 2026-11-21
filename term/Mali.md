# Mali

[brief]
Mali 是 ARM 设计的 GPU，用在很多非高通芯片（联发科、麒麟、Exynos 等）的 SoC 里。对应的开源 Vulkan 驱动是 panvk。
[/brief]

[detail]
## 它是谁

Mali GPU 市场份额很大，但不同机型的驱动实现差异也大。

## 和玩 MC 的关系

- 渲染器/驱动兼容性因机型而异；
- FCL 可用 **panvk**（Mali 的开源 Vulkan 驱动）改善部分 Vulkan 场景；
- 遇到黑屏、花屏时先换渲染器排查。

## 相关

- **Adreno**：高通 GPU；
- **panvk**：Mali 的开源 Vulkan 驱动。
[/detail]