# MSPT（每刻毫秒数）

[brief]
MSPT 是 Minecraft 服务端"每刻耗时"的毫秒数。理想值不超过 50ms；超过 50ms 就会掉 TPS，服务端开始卡。
[/brief]

[detail]
## 它是什么

MSPT（Milliseconds Per Tick）表示服务端处理一"刻"逻辑花的时间。Minecraft 每秒要跑 20 刻，所以每刻最多只有 50ms。

## 怎么看

- MSPT < 50：能维持 20 TPS；
- MSPT = 50：刚好 20 TPS；
- MSPT > 50：TPS 开始下降。

## 相关

- **TPS**：每秒刻数；
- **服务器核心**：不同核心的 MSPT 表现不同。
[/detail]
