# MoltenVK

[brief]
MoltenVK 是在苹果系统（macOS/iOS）上把 Vulkan 调用转换成 Metal 的兼容层。因为苹果不原生支持 Vulkan，所以需要用它在 Mac 上跑 Vulkan 程序。
[/brief]

[detail]
## 它是什么

MoltenVK 是 Khronos 生态里的开源项目，把 Vulkan API 映射到苹果的 Metal 图形接口。

## 用在哪

- macOS / iOS 上运行 Vulkan 应用；
- Minecraft 26.2 的 Vulkan 渲染后端在 macOS 上就经 MoltenVK 转换。

## 注意

这是苹果平台的事，和安卓手机启动器无关；手机上的 Vulkan 一般直接由驱动支持。
[/detail]
