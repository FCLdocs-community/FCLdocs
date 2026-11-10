# OpenJDK

[brief]
OpenJDK 是 Java 的开源实现，也是 Minecraft 官方启动器使用的 JVM 来源。手机启动器正是把 OpenJDK 移植到 Android，才有了能跑 Java 版的 JVM。
[/brief]

[detail]
## 它是什么

OpenJDK 是 Oracle 主导的开源 Java 实现，采用 GPL 协议，任何人都能修改和再发布。

## 为什么用它

- 开源可改：能针对 Android/Bionic 重新编译；
- 与官方环境一致：兼容性最好。

## 在 FCL 里

FCL 内置的 jre8/17/21/25 都源自 OpenJDK 系的移植成果（Pojav/Amethyst 团队打底，FCL-Team 自建构建流水线）。

## 相关

- **JVM**：运行时；
- **JDK/JRE**：开发包/运行环境。
[/detail]
