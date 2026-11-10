# SDL3

[brief]
SDL3 是一套跨平台的窗口、输入、音频基础库。Minecraft 从 26.3 起改用 SDL3 处理窗口与输入，FCL 也相应集成了 SDL3 绑定。
[/brief]

[detail]
## 它是什么

SDL（Simple DirectMedia Layer）是游戏常用的底层库，负责创建窗口、读取键鼠/手柄、播放声音等。

## 和 GLFW 的关系

早期 Minecraft 用 **GLFW** 管理窗口；26.3 起改用 **SDL3**。FCL 为此加入了 SDL3 支持（参考 ZalithLauncher2 的实现），以兼容 26.3+。

## 相关

- **GLFW**：旧版窗口/输入库；
- **OpenAL**：音频接口。
[/detail]
