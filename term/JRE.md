# JRE（Java 运行环境）

[brief]
JRE 是运行 Java 程序所需的环境，包含 JVM 和标准类库，但不含编译器。只想玩 Minecraft 的话，有 JRE 就够了；开发才需要 JDK。
[/brief]

[detail]
## 它是什么

JRE（Java Runtime Environment）= JVM + 标准类库。它负责把你的 Java 程序跑起来。

## 和 JDK 的区别

| | 包含内容 | 用途 |
|---|---|---|
| JRE | JVM + 类库 | 只运行 |
| JDK | JRE + 编译器/工具 | 开发 + 运行 |

自 JDK 11 起 Oracle 不再单独发布 JRE，所以现在常直接装 JDK。

## 在 FCL 里

FCL 内置多个 JRE（jre8/17/21/25），按 Minecraft 版本自动选用。
[/detail]
