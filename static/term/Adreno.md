# Adreno

[brief]
Adreno 是高通（骁龙芯片）自带 GPU 的品牌名。手机玩 Minecraft、跑 Vulkan 的体验很大程度取决于它的驱动质量；开源驱动 Turnip 就是专门为它做的。
[/brief]

[detail]
## 它是谁

Adreno 出现在骁龙、骁龙 8 Gen 系等 SoC 中，是主流手机 GPU 之一（另一大阵营是 ARM 的 Mali）。

## 和玩 MC 的关系

- 高端 Adreno 算力强，但不一定流畅——驱动与散热同样关键；
- FCL 里常用 **Turnip** 开源驱动来提升 Vulkan 兼容性/性能；
- Vulkan 报错、渲染器黑屏等问题常和 Adreno 驱动特性有关。

## 相关

- **Mali**：ARM GPU，主要用在联发科/麒麟等芯片；
- **Turnip / vkshim**：Adreno 相关驱动与适配层。
[/detail]