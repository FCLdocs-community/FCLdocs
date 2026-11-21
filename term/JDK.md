# JDK

[brief]
JDK 是「Java 开发工具包」，包含运行 Java 需要的 JVM 和标准库。运行游戏其实只需运行环境，但现在一般直接装 JDK。
[/brief]

[detail]
## JDK 是什么

JDK（Java Development Kit）是 Java 的完整工具包，里面包含：

- **JVM**：运行 Java 程序的引擎。
- **标准库**：Java 程序用到的基础功能。
- **开发工具**：编译器 `javac` 等（开发才用得到）。

## JDK 和 JRE

- **JRE**（Java Runtime Environment）：只有运行环境，够跑程序。
- **JDK**：JRE + 开发工具。
- 从 JDK 11 起官方不再单独发 JRE，所以现在通常直接说「装 JDK」。

## 在 FCL 中

FCL 内置的是运行环境（通常称 JRE），普通玩家不需要自己装 JDK。

:::tip
看到版本号 `JDK 17`、`JDK 21` 时，指的就是这一整套 Java 版本。游戏只需要其中的运行部分。
:::
[/detail]
