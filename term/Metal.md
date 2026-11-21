# Metal

[brief]
Metal 是苹果的图形接口，只用于 iPhone、iPad、Mac。苹果已停止更新 OpenGL，主推 Metal。
[/brief]

[detail]
## 它是什么

Metal 是苹果 2014 年推出的低开销图形/计算接口，替代 OpenGL 成为苹果设备的主力。

## 平台

仅 iOS、macOS。

## 和 Vulkan 的关系

- 两者定位相似，都偏底层；
- 苹果不原生支持 Vulkan，需要 **MoltenVK** 把 Vulkan 转成 Metal。

## 在 Minecraft 里

基岩版 iOS/macOS 使用 Metal；Java 版在 macOS 上若走 Vulkan 后端，会经 MoltenVK 转换。
[/detail]
