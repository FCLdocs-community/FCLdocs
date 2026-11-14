# Mesa

[brief]
Mesa 是开源的图形驱动/图形库大集合，Linux、Android 上的很多 OpenGL、Vulkan 实现都来自它。Turnip、Zink、panvk 都是 Mesa 家族的成员。
[/brief]

[detail]
## 它是什么

Mesa 提供 OpenGL、Vulkan 等图形 API 的开源实现，是开源图形栈的核心项目。

## 常见成员

- **Turnip**：Adreno GPU 的开源 Vulkan 驱动；
- **panvk**：Mali GPU 的开源 Vulkan 驱动；
- **Zink**：基于 Vulkan 实现 OpenGL；
- **NIR**：Mesa 内部的着色器中间表示。

## 在 FCL 里

FCL 通过「驱动插件」按需安装 Turnip/panvk 等 Vulkan 驱动，用来改善 Vulkan 渲染（如 Zink、MC 26.2+ 的 Vulkan 后端）。
[/detail]
