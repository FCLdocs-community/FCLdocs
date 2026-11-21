# Bukkit（Bukkit API）

[brief]
Bukkit 是 Minecraft 服务端的插件接口（API）。插件靠它给服务器加功能（领地、经济、传送、防作弊等）。Spigot、Paper、Purpur 等服务端核心都实现这套 API。
[/brief]

[detail]
## 它是什么

Bukkit 定义了"服务端插件"的标准接口。服务器装了插件后，玩家进入就自动生效，无需安装客户端。

## 和模组的区别

| | 插件（Bukkit） | 模组（Forge/Fabric） |
|---|---|---|
| 装在哪 | 服务端 | 客户端（也可能两端） |
| 能改什么 | 服务器规则 | 游戏底层内容 |

## 常见的"支持 Bukkit 插件"指什么

服务端核心（如 Paper、Purpur、Sponge 兼容层）能运行 Bukkit 插件即被称作"支持插件"。

## 相关

- **Spigot / Paper**：实现 Bukkit API 的服务端核心。
[/detail]