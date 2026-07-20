| 设置项 | 含义 | 默认值 | 推荐值 |
|------|------|------|------|
| **accepts-transfers** | 是否接受其他服务器传来的文件，在集群服务器中使用 | false | false |
| **allow-flight** | 检测到生存玩家飞行(在爬脚手架等场景会误报)时不踢出玩家 | false | 按需设置 |
| **allow-nether** | 	是否允许玩家进入下界 | true | true |
| **broadcast-console-to-ops** | 是否向 OP 玩家广播控制台消息 | true | true |
| **broadcast-rcon-to-ops** | 是否向 OP 玩家广播 RCON 消息 | true | true |
| **debug** | 是否启用调试模式 | false | false |
| **bug-report-link** | 默认不在文件中，用于设置菜单中汇报服务器bug的URL | NULL | URL |
| **difficulty** | 游戏难度（peaceful/easy/normal/hard） | easy | 按需设置 |
| **enable-command-block** | 是否启用命令方块 | false | true |
| **enable-jmx-monitoring** | 是否启用 JMX 监控（用于性能监控） | false | false（普通服务器无需） |
| **enable-query** | 是否启用GameSpy4游戏查询（可显示服务器状态） | false | false（若不需要状态监控） |
| **enable-rcon** | 是否启用 RCON 远程控制 | false | true（需要远程管理时） |
| **enable-status** | 在服务器列表中显示服务器状态(在线情况、人数等) | true | true |
| **enforce-secure-profile** | 是否强制使用Mojang 签名公钥安全的玩家档案 |true | true |
| **enforce-whitelist** | 是否强制启用白名单 | false | false(按需设置) |
| **entity-broadcast-range-percentage** | 实体广播范围百分比（影响性能和视距） | 100 | 100 |
| **force-gamemode** | 是否强制玩家在进入世界时切换到默认的游戏模式 | false | false |
| **function-permission-level** | 命令执行权限等级（1 到 4） | 2 | 按需设置 |
| **gamemode** | 默认游戏模式（survival/creative/adventure/spectator） | survival | 按需设置 |
| **generate-structures** | 是否生成村庄、神庙等结构 | true | true |
| **generator-settings** | 自定义世界生成设置(仅影响单群系和超平坦) | {} | {}(按需设置) |
| **hardcore** | 是否启用极限模式 | false | false |
| **hide-online-players** | 是否隐藏在线玩家信息 | false | false(按需设置) |
| **initial-disabled-packs** | 初始禁用的资源包，用逗号分割 | NULL | 按需设置 |
| **initial-enabled-packs** | 初始启用的资源包，用逗号分隔 | vanilla | vanilla |
| **level-name** | 世界名称（存档文件夹名称） | world | 按需设置 |
| **level-seed** | 世界种子值(留空为随机生成) | NULL | 按需设置 |
| **level-type** | 世界类型（normal/flat/amplified/customized/large_biomes） | minecraft:normal | 按需设置 |
| **log-ips** | 是否记录玩家 IP 地址 | true | true |
| **max-chained-neighbor-updates** | 最大邻近方块更新链数量 | 1000000 | 1000000 |
| **max-players** | 最大玩家数量 | 20 | 按需设置 |
| **max-world-size** | 最大世界大小（以块为单位） | 29999984 | 29999984 |
| **motd** | 服务器的欢迎信息 | A Minecraft Server | 按需设置 |
| **network-compression-threshold** | 网络压缩阈值（字节数） | 256 | 按实际/需求设置 |
| **online-mode** | 是否启用正版验证 | true | false |
| **op-permission-level** | OP 玩家的默认权限等级（1 到 4） | 4 | 4 |
| **player-idle-timeout** | 玩家闲置踢出时间（分钟，0 表示禁用） | 0 | 30 |
| **prevent-proxy-connections** | 是否防止代理连接 | false | true |
| **pvp** | 是否启用玩家对战 | true | true |
| **query.port** | 查询协议的端口号 | 25565 | 25565 |
| **rate-limit** | 每秒接受的最大数据包数量（0 表示无限制） | 0 | 0 |
| **rcon.password** | RCON 远程控制的密码 | NULL | 按需设置 |
| **rcon.port** | RCON 远程控制的端口号 | 25575 | 25575 |
| **region-file-compression** | 区块文件的压缩方式 | deflate | deflate |
| **require-resource-pack** | 是否强制玩家使用服务器资源包 | false | false |
| **resource-pack** | 服务器资源包的 URL | NULL | 按需设置 |
| **resource-pack-id** | 资源包的 ID（用于校验） | NULL | 按需设置 |
| **resource-pack-prompt** | 向玩家显示的资源包提示 | NULL | 按需设置 |
| **resource-pack-sha1** | 资源包的 SHA1 哈希值 | NULL | 按需设置 |
| **server-ip** | 服务器绑定的 IP 地址 | NULL | 单网卡一般不需要设置 |
| **server-port** | 服务器端口号 | 25565 | 25565 |
| **simulation-distance** | 模拟距离（影响加载区块范围） | 10 | 按需设置 |
| **spawn-animals** | 是否生成动物 | true | true |
| **spawn-monsters** | 是否生成怪物 | true | true |
| **spawn-npcs** | 是否生成 NPC | true | true |
| **spawn-protection** | 重生点保护范围（以方块为单位） | 16 | 16 |
| **sync-chunk-writes** | 是否同步写入区块数据 | true | true |
| **text-filtering-config** | 聊天过滤器的配置文件 | NULL | NULL(按需设置) |
| **use-native-transport** | 是否使用本地传输优化 | true | true |
| **view-distance** | 视距（客户端加载的区块范围） | 10 | 32!(按需设置) |
| **white-list** | 是否启用白名单 | false | false(按需设置) |